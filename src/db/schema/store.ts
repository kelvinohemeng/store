import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  product_name: text("product_name").notNull(),
  product_description: text("product_description").notNull().default(""),
  product_type: text("product_type").notNull(),
  product_price: real("product_price").notNull(),
  compare_price: real("compare_price"),
  quantity: integer("quantity").notNull().default(0),
  // stored as JSON arrays, same shape the storefront/admin UI already expects
  image_url: text("image_url", { mode: "json" })
    .$type<string[]>()
    .notNull()
    .default([]),
  sizes: text("sizes", { mode: "json" }).$type<string[]>().notNull().default([]),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customer_name: text("customer_name"),
  email: text("email").notNull(),
  paystack_reference: text("paystack_reference").unique(),
  delivery_address: text("delivery_address", { mode: "json" }).$type<{
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }>(),
  payment_status: text("payment_status").notNull().default("pending"),
  order_status: text("order_status").notNull().default("pending"),
  total_amount: real("total_amount").notNull().default(0),
  order_note: text("order_note"),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const orderItems = sqliteTable("order_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  order_id: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  product_id: integer("product_id").references(() => products.id, {
    onDelete: "set null",
  }),
  quantity: integer("quantity").notNull().default(1),
  price: real("price").notNull(),
  variants: text("variants", { mode: "json" }).$type<Record<string, unknown>>(),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const ordersRelations = relations(orders, ({ many }) => ({
  order_items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.order_id],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.product_id],
    references: [products.id],
  }),
}));
