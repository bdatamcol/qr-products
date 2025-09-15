"use client";

import { useEffect, useMemo, useState } from "react";
import { brands, type Product } from "@/data/brands";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ShoppingCart, Download, Send, GripHorizontal, Check } from "lucide-react";
import { toast } from "sonner";

const BRAND_LOGOS: Record<string, string> = {
  samsung: "/SAMSUNG.png",
  mabe: "/MABE.png",
  lg: "/LG.png",
  oppo: "/OPPO.png",
  haceb: "/HACEB.png",
  challenger: "/CHALLENGER.png",
  midea: "/MIDEA.png",
  whirlpool: "/WHIRLPOOL.png",
  hq: "/HQ.png",
};

// Carrito en memoria simple
type CartItem = Product & { qty: number; brandId: string };

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeBrand, setActiveBrand] = useState(brands[0]?.id ?? "");
  const total = useMemo(() => cart.reduce((sum, it) => sum + it.price * it.qty, 0), [cart]);

  // Datos del cliente
  const [customer, setCustomer] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [showCustomerDialog, setShowCustomerDialog] = useState<null | "pdf" | "email">(null);
  const cartCount = useMemo(() => cart.reduce((s, it) => s + it.qty, 0), [cart]);
  const [cartOpen, setCartOpen] = useState(false);

  // Cargar carrito guardado al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart") || localStorage.getItem("products");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // validamos estructura mínima
          const restored = parsed
            .filter((x: any) => x && x.id && typeof x.qty === "number")
            .map((x: any) => ({ ...x }));
          if (restored.length > 0) setCart(restored);
        }
      }
    } catch (e) {
      console.error("No se pudo restaurar el carrito desde localStorage", e);
    }
  }, []);

  // Guardar carrito en cada cambio
  useEffect(() => {
    try {
      if (cart.length > 0) {
        const data = JSON.stringify(cart);
        localStorage.setItem("cart", data);
        // Compatibilidad con posibles lecturas previas
        localStorage.setItem("products", data);
      } else {
        localStorage.removeItem("cart");
        localStorage.removeItem("products");
      }
    } catch (e) {
      console.error("No se pudo guardar el carrito en localStorage", e);
    }
  }, [cart]);

  const addToCart = (brandId: string, p: Product) => {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { ...p, qty: 1, brandId }];
    });
    // setCartOpen(true); // Ya no abrimos el carrito automáticamente
    toast.success(`${p.name} agregado al carrito`);
  };

  const decQty = (id: string) => {
    setCart((prev) => {
      const next = prev
        .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0);
      return next;
    });
  };

  const updateQty = (id: string, qty: number) => {
    setCart((prev) => {
      const q = Number.isFinite(qty) ? Math.max(0, Math.floor(qty)) : 1;
      if (q <= 0) return prev.filter((x) => x.id !== id);
      return prev.map((x) => (x.id === id ? { ...x, qty: q } : x));
    });
  };

  const removeItem = (id: string) => setCart((prev) => prev.filter((x) => x.id !== id));
  const clearCart = () => setCart([]);

  const saveOrder = async () => {
    try {
      const customerPayload = {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        business_name: customer.businessName || null,
      };
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: customerPayload, items: cart.map(({ id, name, brandId, price, qty }) => ({ id, name, brandId, price, qty })), total, notes: customer.notes }),
      });
      if (!res.ok) throw new Error("fallo al guardar");
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const generatePDF = async () => {
    if (cart.length === 0) {
      toast.warning("Agrega productos al carrito primero.");
      return;
    }
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF();

    // Encabezado
    doc.setFontSize(16);
    doc.text("Resumen de Pedido", 14, 16);

    doc.setFontSize(11);
    doc.text(`Cliente: ${customer.name || "-"}`, 14, 26);
    doc.text(`Razón social: ${customer.businessName || "-"}`, 14, 32);
    doc.text(`Email: ${customer.email || "-"}`, 14, 38);
    doc.text(`Teléfono: ${customer.phone || "-"}`, 14, 44);

    // Tabla de productos
    const rows = cart.map((it) => [it.name, it.qty.toString(), `$${it.price.toLocaleString()}`, `$${(it.price * it.qty).toLocaleString()}`]);
    // @ts-ignore
    autoTable(doc, {
      startY: 50,
      head: [["Producto", "Cant.", "Precio", "Subtotal"]],
      body: rows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [33, 150, 243] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      theme: "striped",
    });

    // Total
    const finalY = (doc as any).lastAutoTable?.finalY || 44;
    doc.setFontSize(12);
    doc.text(`Total: $${total.toLocaleString()}`, 14, finalY + 10);

    // Notas
    if (customer.notes) {
      doc.setFontSize(11);
      doc.text("Notas:", 14, finalY + 20);
      const split = doc.splitTextToSize(customer.notes, 180);
      doc.text(split, 14, finalY + 26);
    }

    doc.save("pedido.pdf");
    await saveOrder();
    toast.success("PDF generado");
  };

  const sendByEmail = async () => {
    if (!customer.email || !customer.name) {
      toast.error("Nombre y correo son obligatorios.");
      return;
    }
    if (cart.length === 0) {
      toast.warning("Agrega productos al carrito primero.");
      return;
    }
    try {
      // Generar el PDF
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text("Resumen de Pedido", 14, 16);
      doc.setFontSize(11);
      doc.text(`Cliente: ${customer.name}`, 14, 26);
      doc.text(`Razón social: ${customer.businessName || "-"}`, 14, 32);
      doc.text(`Email: ${customer.email}`, 14, 38);
      doc.text(`Teléfono: ${customer.phone || "-"}`, 14, 44);

      const rows = cart.map((it) => [
        it.name,
        it.qty.toString(),
        `$${it.price.toLocaleString()}`,
        `$${(it.price * it.qty).toLocaleString()}`,
      ]);
      // @ts-ignore
      autoTable(doc, {
        startY: 50,
        head: [["Producto", "Cant.", "Precio", "Subtotal"]],
        body: rows,
      });

      const finalY = (doc as any).lastAutoTable?.finalY || 44;
      doc.setFontSize(12);
      doc.text(`Total: $${total.toLocaleString()}`, 14, finalY + 10);

      if (customer.notes) {
        doc.setFontSize(11);
        doc.text("Notas:", 14, finalY + 20);
        const split = doc.splitTextToSize(customer.notes, 180);
        doc.text(split, 14, finalY + 26);
      }

      // 1) Descargar inmediatamente en el dispositivo del cliente
      doc.save("pedido.pdf");

      // 2) Preparar PDF para envío por correo
      const pdfBase64 = doc.output("datauristring");

      // 3) Guardar en BD (no bloquear flujo si falla)
      try {
        const saved = await saveOrder();
        if (!saved) {
          toast.warning("No se pudo guardar el pedido en la base de datos, pero el PDF se descargó.");
        }
      } catch (_) {
        toast.warning("No se pudo guardar el pedido en la base de datos, pero el PDF se descargó.");
      }

      // 4) Enviar por correo
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: customer.email, name: customer.name, pdf: pdfBase64 }),
      });
      if (!res.ok) throw new Error("Fallo enviando correo");

      toast.success("Pedido enviado por correo");
    } catch (e) {
      toast.error("No se pudo enviar el correo");
      console.error(e);
    }
  };

  const handleGenerateClick = () => {
    if (cart.length === 0) return toast.warning("Agrega productos al carrito primero.");
    // si falta info mínima, pedimos datos
    if (!customer.name || !customer.email) {
      setShowCustomerDialog("pdf");
      return;
    }
    generatePDF();
  };

  const handleSendClick = () => {
    if (cart.length === 0) return toast.warning("Agrega productos al carrito primero.");
    if (!customer.name || !customer.email) {
      setShowCustomerDialog("email");
      return;
    }
    sendByEmail();
  };

  return (
    <div className="min-h-dvh flex flex-col px-3 py-3 gap-4">
      <header className="flex items-center justify-between">
        <div className="text-xl font-semibold">Catálogo</div>
        <Sheet open={cartOpen} onOpenChange={setCartOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="secondary" aria-label="Carrito" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] leading-none px-1.5 py-0.5 rounded-full border">
                  {cartCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-sm p-0">
            <SheetHeader>
              <SheetTitle>Tu carrito</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
              {/* Listado del carrito */}
              {cart.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aún no has agregado productos.</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((it) => (
                    <Card key={it.id} className="border-muted">
                      <CardContent className="py-3 flex items-center justify-between gap-2">
                        <div>
                          <div className="text-sm font-medium line-clamp-2 max-w-[12rem]">{it.name}</div>
                          <div className="text-xs text-muted-foreground">${it.price.toLocaleString()} c/u</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">x{it.qty}</Badge>
                          <Button size="sm" variant="outline" onClick={() => decQty(it.id)}>-</Button>
                          <Button size="sm" onClick={() => addToCart(it.brandId, it)}>+1</Button>
                          <Button size="sm" variant="destructive" onClick={() => removeItem(it.id)}>Quitar</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t bg-background p-4">
              <div className="rounded-lg bg-muted/40 p-3 mb-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Subtotal</div>
                  <div className="text-sm">${total.toLocaleString()}</div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-base font-semibold">Total</div>
                  <div className="text-base font-semibold">${total.toLocaleString()}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" onClick={handleGenerateClick} disabled={cart.length === 0}>
                  <Download className="h-4 w-4 mr-2" /> PDF
                </Button>
                <Button onClick={handleSendClick} disabled={cart.length === 0}>
                  <Send className="h-4 w-4 mr-2" /> Enviar
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Barra desplazable/Select para marcas en móvil */}
      <div className="sm:hidden">
        <Label className="mb-1 inline-block">Marca</Label>
        <Select value={activeBrand} onValueChange={setActiveBrand}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona marca" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                <span className="flex items-center gap-2">
                  {BRAND_LOGOS[b.id] ? (
                    <img src={BRAND_LOGOS[b.id]} alt={b.name} className="h-12 w-12 object-contain" loading="lazy" width={32} height={32} />
                  ) : null}
                  {/* <span>{b.name}</span> */}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeBrand} onValueChange={setActiveBrand} className="w-full">
        {/* Barra superior scrollable en mobile */}
        <TabsList className="hidden sm:grid w-full grid-cols-8 gap-1" aria-label="Selecciona una marca">
          {brands.map((b) => (
            <TabsTrigger key={b.id} value={b.id} className="text-xs py-2">
              {b.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Scroll horizontal con indicador en mobile */}
        {/* <div className="sm:hidden -mx-3 px-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Desliza para ver más</span>
            <GripHorizontal className="h-4 w-4" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {brands.map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveBrand(b.id)}
                className={`shrink-0 px-3 py-2 rounded-full border text-xs ${activeBrand === b.id ? "bg-primary text-primary-foreground border-primary" : "bg-card"}`}
              >
                <span className="inline-flex items-center gap-2">
                  {BRAND_LOGOS[b.id] ? (
                    <img src={BRAND_LOGOS[b.id]} alt={b.name} className="h-4 w-4 object-contain" loading="lazy" width={16} height={16} />
                  ) : null}
                  <span>{b.name}</span>
                </span>
              </button>
            ))}
          </div>
        </div> */}

        {brands.map((b) => (
          <TabsContent key={b.id} value={b.id} className="mt-2">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {b.products.map((p) => {
                const inCart = cart.find((x) => x.id === p.id)?.qty ?? 0;
                return (
                  <Card key={p.id} className="border-muted">
                    <CardContent className="p-2">
                      <div className="w-full aspect-square overflow-hidden rounded-md flex items-center justify-center mb-2">
                         {BRAND_LOGOS[b.id] ? (
                           <img
                             src={BRAND_LOGOS[b.id]}
                             alt={b.name}
                             title={b.name}
                             className="w-full h-full object-contain p-3"
                             loading="lazy"
                             width={160}
                             height={160}
                           />
                         ) : null}
                       </div>
                       <div className="text-xs font-medium leading-tight text-center line-clamp-2 min-h-[2.2rem]">{p.name}</div>
                      <div className="text-[11px] text-muted-foreground mt-1">${p.price.toLocaleString()}</div>
                      {inCart === 0 ? (
                        <Button size="sm" className="mt-2 w-full" onClick={() => addToCart(b.id, p)}>
                          Agregar
                        </Button>
                      ) : (
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="secondary" className="whitespace-nowrap">Agregado</Badge>
                          <Input
                            type="number"
                            min={1}
                            value={inCart}
                            onChange={(e) => updateQty(p.id, parseInt(e.target.value || "1", 10))}
                            className="w-20 h-8"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={!!showCustomerDialog} onOpenChange={(o) => !o && setShowCustomerDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Datos del cliente</DialogTitle>
            <DialogDescription>
              Completa tus datos para {showCustomerDialog === "pdf" ? "generar el PDF" : "enviar el pedido por correo"}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" placeholder="Tu nombre" value={customer.name} onChange={(e) => setCustomer((s) => ({ ...s, name: e.target.value }))} />
            <Label htmlFor="businessName">Razón social</Label>
            <Input id="businessName" placeholder="Empresa / Razón social" value={customer.businessName} onChange={(e) => setCustomer((s) => ({ ...s, businessName: e.target.value }))} />
            <Label htmlFor="email">Correo</Label>
            <Input id="email" type="email" placeholder="tucorreo@dominio.com" value={customer.email} onChange={(e) => setCustomer((s) => ({ ...s, email: e.target.value }))} />
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" placeholder="Tu teléfono" value={customer.phone} onChange={(e) => setCustomer((s) => ({ ...s, phone: e.target.value }))} />
            <Label htmlFor="notes">Notas</Label>
            <Textarea id="notes" placeholder="Instrucciones o comentarios" value={customer.notes} onChange={(e) => setCustomer((s) => ({ ...s, notes: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button variant="secondary" onClick={() => { setShowCustomerDialog(null); generatePDF(); }}>Generar PDF</Button>
            <Button onClick={() => { setShowCustomerDialog(null); sendByEmail(); }}>Enviar</Button>
          </div>
        </DialogContent>
      </Dialog>
      <footer className="text-center text-xs text-muted-foreground mt-auto">
        Selecciona productos de diferentes marcas, completa tus datos y genera o envía tu pedido.
      </footer>
    </div>
  );
}
