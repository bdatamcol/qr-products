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
    id: "apple",
    name: "Apple",
    products: [
      { id: "iphone-15", name: "iPhone 15", price: 17999 },
      { id: "macbook-air-m2", name: "MacBook Air M2", price: 23999 },
      { id: "ipad-10", name: "iPad 10th Gen", price: 8999 },
    ],
  },
  {
    id: "hp",
    name: "HP",
    products: [
      { id: "hp-15-ryzen5", name: "Laptop 15 Ryzen 5", price: 10999 },
      { id: "hp-deskjet-ink", name: "Impresora DeskJet Ink", price: 1999 },
    ],
  },
  {
    id: "epson",
    name: "Epson",
    products: [
      { id: "epson-l3250", name: "EcoTank L3250", price: 3799 },
      { id: "epson-l4260", name: "EcoTank L4260", price: 4999 },
    ],
  },
  {
    id: "suzuki",
    name: "Suzuki",
    products: [
      { id: "suzuki-gn125", name: "GN 125 (accesorios)", price: 1499 },
      { id: "suzuki-aceite", name: "Aceite 4T 1L", price: 199 },
    ],
  },
];