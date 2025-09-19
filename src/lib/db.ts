import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

export const pool = connectionString
  ? new Pool({ connectionString, ssl: connectionString.includes("neon.tech") ? { rejectUnauthorized: false } : undefined })
  : null;

export async function ensureSchema() {
  if (!pool) return;
  await pool.query(`
    create table if not exists customers (
      id serial primary key,
      name text not null,
      email text not null,
      phone text,
      created_at timestamptz not null default now()
    );

    -- Agregar razón social si no existe
    alter table if exists customers add column if not exists business_name text;

    create table if not exists orders (
      id serial primary key,
      customer_id integer not null references customers(id) on delete cascade,
      notes text,
      total numeric not null,
      created_at timestamptz not null default now()
    );

    create table if not exists order_items (
      id serial primary key,
      order_id integer not null references orders(id) on delete cascade,
      product_id text not null,
      product_name text not null,
      brand_id text not null,
      price numeric not null,
      qty integer not null,
      price_type integer not null default 1
    );
    
    -- Agregar columna price_type si no existe en tablas antiguas
    alter table if exists order_items add column if not exists price_type integer not null default 1;
  `);
}