export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
};

export type Brand = {
  id: string;
  name: string;
  logo?: string;
  products: Product[];
};

//marcas de productos
/* 
Mabe
LG
Samsung
Haceb
Challenger
Midea
Whirlpool
HQ
Oppo */

export const brands: Brand[] = [
  {
    id: "samsung",
    name: "Samsung",
    products: [
      { id: "sam-galaxy-a15", name: "Galaxy A15", price: 3999 },
      { id: "sam-galaxy-s24", name: "Galaxy S24", price: 18999 },
      { id: "sam-tv-50", name: "TV 50\" 4K", price: 8999 },
    ],
  },
  {
    id: "mabe",
    name: "Mabe",
    products: [
      { id: "mabe-refri-9p", name: "Refrigerador 9 pies", price: 6999 },
      { id: "mabe-lava-20kg", name: "Lavadora 20kg", price: 5999 },
    ],
  },
  {
    id: "lg",
    name: "LG",
    products: [
      { id: "lg-oled-55", name: "OLED 55\" C3", price: 24999 },
      { id: "lg-monitor-27", name: "Monitor 27\" 144Hz", price: 5499 },
    ],
  },
  {
    id: "oppo",
    name: "Oppo",
    products: [
      { id: "oppo-reno11", name: "Reno 11", price: 8999 },
      { id: "oppo-a78", name: "A78", price: 4999 },
    ],
  },
  {
    id: "haceb",
    name: "Haceb",
    products: [
      { id: "haceb-100", name: "Haceb 100", price: 10999 },
    ],
  },
  {
    id: "challenger",
    name: "Challenger",
    products: [
      { id: "challenger-15-nevera", name: "Challenger nevera", price: 10999 },
      { id: "challenger-lavadora", name: "Challenger lavadora", price: 10999 },
      { id: "challenger-horno", name: "Challenger horno", price: 10999 },
    ],
  },
  {
    id: "midea",
    name: "Midea",
    products: [
      { id: "midea-l3250", name: "Midea L3250", price: 3799 },
      { id: "midea-l4260", name: "Midea L4260", price: 4999 },
    ],
  },
  {
    id: "whirlpool",
    name: "Whirlpool",
    products: [
      { id: "Whirlpool-gn125", name: "GN 125 (accesorios)", price: 1499 },
      { id: "Whirlpool-aceite", name: "Aceite 4T 1L", price: 199 },
    ],
  },
  {
    id: "hq",
    name: "HQ",
    products: [
      { id: "hq-100", name: "HQ 100", price: 10999 },
    ],
  },
];