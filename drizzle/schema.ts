import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Books table
export const books = mysqlTable("books", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  description: text("description"),
  coverUrl: varchar("coverUrl", { length: 500 }),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Chapters table
export const chapters = mysqlTable("chapters", {
  id: int("id").autoincrement().primaryKey(),
  bookId: int("bookId").notNull(),
  number: int("number").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Reading Progress table
export const readingProgress = mysqlTable("readingProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  bookId: int("bookId").notNull(),
  currentChapter: int("currentChapter").default(1).notNull(),
  progress: int("progress").default(0).notNull(), // 0-100 percentage
  lastRead: timestamp("lastRead").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Webinars table
export const webinars = mysqlTable("webinars", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  instructor: varchar("instructor", { length: 255 }).notNull(),
  videoUrl: varchar("videoUrl", { length: 500 }).notNull(),
  duration: int("duration"),
  thumbnailUrl: varchar("thumbnailUrl", { length: 500 }),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Advertisements table
export const advertisements = mysqlTable("advertisements", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  imageUrl: varchar("imageUrl", { length: 500 }),
  actionUrl: varchar("actionUrl", { length: 500 }),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Notifications table
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["new_book", "new_webinar", "milestone"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message"),
  bookId: int("bookId"),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Export types
export type Book = typeof books.$inferSelect;
export type Chapter = typeof chapters.$inferSelect;
export type ReadingProgress = typeof readingProgress.$inferSelect;
export type Webinar = typeof webinars.$inferSelect;
export type Advertisement = typeof advertisements.$inferSelect;
export type Notification = typeof notifications.$inferSelect;

export type InsertBook = typeof books.$inferInsert;
export type InsertChapter = typeof chapters.$inferInsert;
export type InsertReadingProgress = typeof readingProgress.$inferInsert;
export type InsertWebinar = typeof webinars.$inferInsert;
export type InsertAdvertisement = typeof advertisements.$inferInsert;
export type InsertNotification = typeof notifications.$inferInsert;
