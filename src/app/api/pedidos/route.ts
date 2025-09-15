import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, pool } from "@/lib/db";

export async function GET(_req: NextRequest) {
  try {
    if (!pool) {
      return NextResponse.json({ ok: true, data: [], info: "No database configured" });
    }

    await ensureSchema();

    const { rows } = await pool.query(
      `select 
         o.id as order_id,
         o.created_at as order_created_at,
         o.total as order_total,
         o.notes as order_notes,
         c.id as customer_id,
         c.name as customer_name,
         c.business_name as customer_business_name,
         c.email as customer_email,
         c.phone as customer_phone,
         oi.product_id,
         oi.product_name,
         oi.brand_id,
         oi.price,
         oi.qty
       from orders o
       join customers c on c.id = o.customer_id
       left join order_items oi on oi.order_id = o.id
       order by o.created_at desc, o.id desc, oi.id asc`
    );

    type Row = typeof rows[number];

    const customersMap = new Map<number, any>();

    for (const r of rows as Row[]) {
      let customer = customersMap.get(r.customer_id);
      if (!customer) {
        customer = {
          id: r.customer_id,
          name: r.customer_name,
          business_name: r.customer_business_name ?? null,
          email: r.customer_email,
          phone: r.customer_phone ?? null,
          orders: [] as any[],
        };
        customersMap.set(r.customer_id, customer);
      }

      let order = customer.orders.find((o: any) => o.id === r.order_id);
      if (!order) {
        order = {
          id: r.order_id,
          created_at: r.order_created_at,
          total: Number(r.order_total),
          notes: r.order_notes ?? null,
          items: [] as any[],
        };
        customer.orders.push(order);
      }

      if (r.product_id) {
        order.items.push({
          product_id: r.product_id,
          product_name: r.product_name,
          brand_id: r.brand_id,
          price: Number(r.price),
          qty: Number(r.qty),
          subtotal: Number(r.price) * Number(r.qty),
        });
      }
    }

    const data = Array.from(customersMap.values());
    return NextResponse.json({ ok: true, data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}