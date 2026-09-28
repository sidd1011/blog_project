/**
 * =====================================================================
 * DevLearn Data Access Layer (db.ts)
 * ---------------------------------------------------------------------
 * Handles persistent JSON file storage for articles, categories, users,
 * and contact form messages. Provides atomic read/write functions.
 * In production, this can seamlessly transition to MongoDB/PostgreSQL,
 * but this file-backed store ensures 100% self-contained portability.
 * =====================================================================
 */

import fs from "fs";
import path from "path";
import { Article, Category, DashboardUser, ContactMessage } from "@/types";

const DATA_DIR = path.join(process.cwd(), "src/data");

function readJsonFile<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return [] as unknown as T;
  }
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as T;
}

function writeJsonFile<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

/* =====================================================================
 * Articles Data Operations
 * ===================================================================== */
export function getArticles(): Article[] {
  return readJsonFile<Article[]>("articles.json");
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = getArticles();
  return articles.find((a) => a.slug === slug);
}

export function getArticleById(id: string): Article | undefined {
  const articles = getArticles();
  return articles.find((a) => a.id === id);
}

export function saveArticle(article: Article): Article {
  const articles = getArticles();
  const index = articles.findIndex((a) => a.id === article.id);
  if (index >= 0) {
    articles[index] = { ...articles[index], ...article };
  } else {
    articles.unshift(article);
  }
  writeJsonFile("articles.json", articles);
  return article;
}

export function deleteArticle(id: string): boolean {
  const articles = getArticles();
  const filtered = articles.filter((a) => a.id !== id);
  if (filtered.length !== articles.length) {
    writeJsonFile("articles.json", filtered);
    return true;
  }
  return false;
}

/* =====================================================================
 * Categories Data Operations
 * ===================================================================== */
export function getCategories(): Category[] {
  return readJsonFile<Category[]>("categories.json");
}

export function saveCategory(category: Category): Category {
  const categories = getCategories();
  const index = categories.findIndex((c) => c.id === category.id);
  if (index >= 0) {
    categories[index] = category;
  } else {
    categories.push(category);
  }
  writeJsonFile("categories.json", categories);
  return category;
}

export function deleteCategory(id: string): boolean {
  const categories = getCategories();
  const filtered = categories.filter((c) => c.id !== id);
  if (filtered.length !== categories.length) {
    writeJsonFile("categories.json", filtered);
    return true;
  }
  return false;
}

/* =====================================================================
 * Users Data Operations
 * ===================================================================== */
export function getUsers(): DashboardUser[] {
  return readJsonFile<DashboardUser[]>("users.json");
}

export function saveUser(user: DashboardUser): DashboardUser {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === user.id);
  if (index >= 0) {
    users[index] = user;
  } else {
    users.push(user);
  }
  writeJsonFile("users.json", users);
  return user;
}

export function deleteUser(id: string): boolean {
  const users = getUsers();
  const filtered = users.filter((u) => u.id !== id);
  if (filtered.length !== users.length) {
    writeJsonFile("users.json", filtered);
    return true;
  }
  return false;
}

/* =====================================================================
 * Contact Form Operations
 * ===================================================================== */
export function getContactMessages(): ContactMessage[] {
  return readJsonFile<ContactMessage[]>("contact.json");
}

export function saveContactMessage(msg: ContactMessage): void {
  const messages = getContactMessages();
  messages.unshift(msg);
  writeJsonFile("contact.json", messages);
}
