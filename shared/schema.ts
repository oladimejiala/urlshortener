import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const urls = pgTable("urls", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  originalUrl: text("original_url").notNull(),
  shortCode: varchar("short_code", { length: 10 }).notNull().unique(),
  customAlias: varchar("custom_alias", { length: 50 }),
  clickCount: integer("click_count").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clicks = pgTable("clicks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  urlId: varchar("url_id").notNull().references(() => urls.id),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  userAgent: text("user_agent"),
  ipAddress: varchar("ip_address", { length: 45 }),
});

export const insertUrlSchema = createInsertSchema(urls).omit({
  id: true,
  shortCode: true,
  clickCount: true,
  isActive: true,
  createdAt: true,
}).extend({
  originalUrl: z.string().url("Please enter a valid URL"),
  customAlias: z.string().max(50).optional(),
});

export const insertClickSchema = createInsertSchema(clicks).omit({
  id: true,
  timestamp: true,
});

export type InsertUrl = z.infer<typeof insertUrlSchema>;
export type Url = typeof urls.$inferSelect;
export type InsertClick = z.infer<typeof insertClickSchema>;
export type Click = typeof clicks.$inferSelect;

// Analytics types
export type AnalyticsData = {
  totalUrls: number;
  totalClicks: number;
  avgCtr: number;
  recentUrls: (Url & { clickCount: number })[];
};

export type ShortenedUrlResponse = {
  id: string;
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
  clickCount: number;
  createdAt: string;
};
