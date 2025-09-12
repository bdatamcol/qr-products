import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items, total, notes } = body as {
      customer: { name: string; email: string; phone?: string };
      items: Array<{ id: string; name: string; brandId: string; price: number; qty: number }>;
      total: number;
      notes?: string;
    };

    if (!pool) {
      // Sin DB, devolvemos OK para no bloquear
      return NextResponse.json({ ok: true, stored: false });
    }

    await ensureSchema();

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // buscar o crear cliente por email
      const cRes = await client.query(
        "select id from customers where email=$1",
        [customer.email]
      );
      let customerId: number;
      if (cRes.rowCount && cRes.rows[0]) {
        customerId = cRes.rows[0].id;
      } else {
        const ins = await client.query(
          "insert into customers(name,email,phone) values($1,$2,$3) returning id",
          [customer.name, customer.email, customer.phone ?? null]
        );
        customerId = ins.rows[0].id;
      }

      const oRes = await client.query(
        "insert into orders(customer_id, notes, total) values($1,$2,$3) returning id",
        [customerId, notes ?? null, total]
      );
      const orderId = oRes.rows[0].id as number;

      for (const it of items) {
        await client.query(
          "insert into order_items(order_id, product_id, product_name, brand_id, price, qty) values($1,$2,$3,$4,$5,$6)",
          [orderId, it.id, it.name, it.brandId, it.price, it.qty]
        );
      }

      await client.query("COMMIT");
      return NextResponse.json({ ok: true, stored: true, orderId });
    } catch (e) {
      await client.query("ROLLBACK");
      console.error(e);
      return NextResponse.json({ ok: false, error: "DB error" }, { status: 500 });
    } finally {
      client.release();
    }
  } catch (e: any) {
    console.error(e);
    const msg = typeof e?.message === "string" ? e.message : String(e);
    const looksLikeDbConn = /getaddrinfo|ECONN|ENOTFOUND|ssl|self-signed|certificate/i.test(msg);
    return NextResponse.json(
      { ok: false, error: looksLikeDbConn ? "Database connection error" : "Invalid payload" },
      { status: looksLikeDbConn ? 500 : 400 }
    );
  }
}