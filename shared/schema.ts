import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Basic users table (required by the template)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Projects table (could be used for a CMS in the future)
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(),
  fullDescription: text("full_description"),
  image: text("image").notNull(),
  client: varchar("client", { length: 200 }),
  industry: varchar("industry", { length: 200 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Project categories junction table
export const projectCategories = pgTable("project_categories", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  categoryId: integer("category_id").references(() => categories.id).notNull(),
});

// Play items table (creative experiments)
export const playItems = pgTable("play_items", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 200 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  read: boolean("read").default(false).notNull(),
});

// Define relationships
export const projectsRelations = relations(projects, ({ many }) => ({
  categories: many(projectCategories),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  projects: many(projectCategories),
}));

export const projectCategoriesRelations = relations(projectCategories, ({ one }) => ({
  project: one(projects, {
    fields: [projectCategories.projectId],
    references: [projects.id],
  }),
  category: one(categories, {
    fields: [projectCategories.categoryId],
    references: [categories.id],
  }),
}));

// Define schemas for validation
export const projectInsertSchema = createInsertSchema(projects);
export type ProjectInsert = z.infer<typeof projectInsertSchema>;

export const categoryInsertSchema = createInsertSchema(categories);
export type CategoryInsert = z.infer<typeof categoryInsertSchema>;

export const playItemInsertSchema = createInsertSchema(playItems);
export type PlayItemInsert = z.infer<typeof playItemInsertSchema>;

export const contactMessageInsertSchema = createInsertSchema(contactMessages);
export type ContactMessageInsert = z.infer<typeof contactMessageInsertSchema>;
