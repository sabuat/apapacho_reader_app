import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============= BOOKS =============

export async function getPublishedBooks() {
  const db = await getDb();
  if (!db) return [];
  const { books } = await import("../drizzle/schema");
  return db.select().from(books).where(eq(books.published, true));
}

export async function getAllBooks() {
  const db = await getDb();
  if (!db) return [];
  const { books } = await import("../drizzle/schema");
  return db.select().from(books);
}

export async function getBookById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const { books } = await import("../drizzle/schema");
  const result = await db.select().from(books).where(eq(books.id, id));
  return result[0] || null;
}

export async function createBook(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { books } = await import("../drizzle/schema");
  const result = await db.insert(books).values(data);
  return result[0]?.insertId || null;
}

export async function updateBook(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { books } = await import("../drizzle/schema");
  await db.update(books).set(data).where(eq(books.id, id));
}

// ============= CHAPTERS =============

export async function getChaptersByBookId(bookId: number) {
  const db = await getDb();
  if (!db) return [];
  const { chapters } = await import("../drizzle/schema");
  return db.select().from(chapters).where(eq(chapters.bookId, bookId));
}

export async function getPublishedChaptersByBookId(bookId: number) {
  const db = await getDb();
  if (!db) return [];
  const { chapters } = await import("../drizzle/schema");
  const { and } = await import("drizzle-orm");
  return db
    .select()
    .from(chapters)
    .where(and(eq(chapters.bookId, bookId), eq(chapters.published, true)));
}

export async function getChapterByNumber(bookId: number, number: number) {
  const db = await getDb();
  if (!db) return null;
  const { chapters } = await import("../drizzle/schema");
  const { and } = await import("drizzle-orm");
  const result = await db
    .select()
    .from(chapters)
    .where(and(eq(chapters.bookId, bookId), eq(chapters.number, number)));
  return result[0] || null;
}

export async function createChapter(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { chapters } = await import("../drizzle/schema");
  const result = await db.insert(chapters).values(data);
  return result[0]?.insertId || null;
}

export async function updateChapter(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { chapters } = await import("../drizzle/schema");
  await db.update(chapters).set(data).where(eq(chapters.id, id));
}

// ============= WEBINARS =============

export async function getPublishedWebinars() {
  const db = await getDb();
  if (!db) return [];
  const { webinars } = await import("../drizzle/schema");
  return db.select().from(webinars).where(eq(webinars.published, true));
}

export async function getAllWebinars() {
  const db = await getDb();
  if (!db) return [];
  const { webinars } = await import("../drizzle/schema");
  return db.select().from(webinars);
}

export async function createWebinar(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { webinars } = await import("../drizzle/schema");
  const result = await db.insert(webinars).values(data);
  return result[0]?.insertId || null;
}

export async function updateWebinar(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { webinars } = await import("../drizzle/schema");
  await db.update(webinars).set(data).where(eq(webinars.id, id));
}
