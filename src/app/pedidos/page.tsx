"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface OrderItem {
  product_id: string;
  product_name: string;
  brand_id: string;
  price: number;
  qty: number;
  subtotal: number;
  price_type: number;
}

interface Order {
  id: number;
  created_at: string;
  total: number;
  notes: string | null;
  items: OrderItem[];
}

interface Customer {
  id: number;
  name: string;
  business_name: string | null;
  email: string;
  phone: string | null;
  orders: Order[];
}

function toCsv(rows: string[][]): string {
  const esc = (s: string) => {
    if (s == null) return "";
    const needs = /[",\n]/.test(s);
    const v = String(s).replace(/"/g, '""');
    return needs ? `"${v}"` : v;
  };
  return rows.map((r) => r.map(esc).join(",")).join("\n");
}

function downloadFile(filename: string, content: string, mime = "text/csv;charset=utf-8;") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function downloadOrderPdf(customer: Customer, order: Order) {
  const { jsPDF } = await import("jspdf");
  const autoTable: any = (await import("jspdf-autotable")).default;
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Detalle de pedido", 14, 18);
  doc.setFontSize(11);
  doc.text(`Cliente: ${customer.name}`, 14, 26);
  doc.text(`Razón social: ${customer.business_name || "-"}`, 14, 32);
  doc.text(`Email: ${customer.email}`, 14, 38);
  doc.text(`Teléfono: ${customer.phone || "-"}`, 14, 44);
  doc.text(`Pedido #${order.id} · ${new Date(order.created_at).toLocaleString()}`, 14, 50);
  if (order.notes) doc.text(`Notas: ${order.notes}`, 14, 56);
  const startY = order.notes ? 62 : 56;
  const rows = order.items.map((it) => [
    it.product_id,
    it.product_name,
    String(it.qty),
    `$${it.price.toLocaleString()}`,
    `$${it.subtotal.toLocaleString()}`,
  ]);
  autoTable(doc, {
    startY,
    head: [["Ref.", "Producto", "Cant.", "Precio", "Subtotal"]],
    body: rows,
    styles: { fontSize: 10 },
  });
  const y = (doc as any).lastAutoTable?.finalY ?? startY;
  doc.setFontSize(12);
  doc.text(`Total: $${order.total.toLocaleString()}`, 14, y + 8);
  doc.save(`pedido_${order.id}.pdf`);
}

export default function PedidosPage() {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/pedidos", { cache: "no-store" });
        const json = await res.json();
        if (!json?.ok) throw new Error("Error al consultar pedidos");
        if (alive) setData(json.data);
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim() && !dateFrom && !dateTo) return data;
    const needle = q.toLowerCase();
    const from = dateFrom ? new Date(dateFrom + "T00:00:00") : null;
    const to = dateTo ? new Date(dateTo + "T23:59:59.999") : null;
    return data
      .map((c) => ({
        ...c,
        orders: c.orders.filter((o) => {
          const dateOk = (() => {
            const d = new Date(o.created_at);
            if (from && d < from) return false;
            if (to && d > to) return false;
            return true;
          })();
          const textOk = !needle || (
            o.items.some((it) => it.product_name.toLowerCase().includes(needle)) ||
            c.name.toLowerCase().includes(needle) ||
            (c.business_name ?? "").toLowerCase().includes(needle) ||
            c.email.toLowerCase().includes(needle)
          );
          return dateOk && textOk;
        }),
      }))
      .filter((c) => c.orders.length > 0);
  }, [data, q, dateFrom, dateTo]);

  const exportCsv = () => {
    const header = [
      "customer_id","customer_name","business_name","email","phone",
      "order_id","order_date","order_notes","order_total",
      "product_id","product_name","brand_id","price","qty","subtotal","price_type"
    ];
    const rows: string[][] = [header];
    for (const c of filtered) {
      for (const o of c.orders) {
        if (o.items.length === 0) {
          rows.push([
            String(c.id), c.name, c.business_name ?? "", c.email, c.phone ?? "",
            String(o.id), new Date(o.created_at).toISOString(), o.notes ?? "", String(o.total),
            "", "", "", "", "", "", ""
          ]);
        } else {
          for (const it of o.items) {
            rows.push([
              String(c.id), c.name, c.business_name ?? "", c.email, c.phone ?? "",
              String(o.id), new Date(o.created_at).toISOString(), o.notes ?? "", String(o.total),
              it.product_id, it.product_name, it.brand_id, String(it.price), String(it.qty), String(it.subtotal), String(it.price_type || 1)
            ]);
          }
        }
      }
    }
    const csv = toCsv(rows);
    downloadFile("pedidos.csv", csv);
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="q">Buscar</Label>
          <Input id="q" placeholder="Cliente, razón social o producto" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="from">Desde</Label>
            <Input id="from" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="to">Hasta</Label>
            <Input id="to" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
        </div>
        <div className="sm:col-span-2">
          <Button size="sm" onClick={exportCsv}>Exportar CSV (Excel)</Button>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground">Cargando pedidos...</div>
      ) : filtered.length === 0 ? (
        <div className="text-sm text-muted-foreground">Sin resultados.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((c) => (
            <Card key={c.id}>
              <CardHeader>
                <CardTitle className="text-base">
                  <span className="font-semibold">{c.name}</span>{" "}
                  {c.business_name ? <Badge variant="secondary">{c.business_name}</Badge> : null}
                  <span className="block text-xs text-muted-foreground">{c.email}{c.phone ? ` · ${c.phone}` : ""}</span>
                  <span className="block text-xs font-medium">Total cliente: ${c.orders.reduce((acc, o) => acc + (o.total || 0), 0).toLocaleString()}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {c.orders.map((o) => (
                    <div key={o.id} className="rounded-md border p-3">
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <div className="font-medium">Pedido #{o.id}</div>
                        <div className="flex items-center gap-2">
                          <div className="text-muted-foreground">{new Date(o.created_at).toLocaleString()}</div>
                          <Button size="sm" variant="secondary" onClick={() => downloadOrderPdf(c, o)}>PDF</Button>
                        </div>
                      </div>
                      {o.notes ? <div className="mt-1 text-xs italic text-muted-foreground">{o.notes}</div> : null}
                      <Separator className="my-2" />
                      <div className="space-y-1">
                        {o.items.map((it, idx) => (
                          <div key={`${it.product_id}-${idx}`} className="flex items-center justify-between text-sm">
                            <div className="truncate pr-2">
                              <div>
                                <span className="font-medium">{it.product_name}</span>{" "}
                                <span className="text-xs text-muted-foreground">({it.brand_id})</span>
                              </div>
                              <div className="text-[11px] text-muted-foreground">Ref: {it.product_id}</div>
                            </div>
                            <div className="whitespace-nowrap text-right text-xs">
                              x{it.qty} · ${it.price.toLocaleString()} = ${it.subtotal.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex items-center justify-end text-sm font-semibold">
                        Total: ${o.total.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}