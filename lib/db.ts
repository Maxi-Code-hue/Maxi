/**
 * Minimal JSON-file data store.
 *
 * This keeps the demo dependency-free and runnable without an external
 * database. For production, swap this module for a real DB (Postgres/Prisma).
 */
import fs from "fs";
import path from "path";

export type User = {
  id: string;
  email: string;
  createdAt: number;
};

export type MagicToken = {
  id: string;
  tokenHash: string;
  email: string;
  expiresAt: number;
  consumedAt: number | null;
};

export type Session = {
  id: string;
  userId: string;
  expiresAt: number;
  createdAt: number;
};

export type Brew = {
  id: string;
  userId: string;
  bean: string;
  origin: string;
  method: string;
  rating: number;
  notes: string;
  createdAt: number;
};

type Schema = {
  users: User[];
  tokens: MagicToken[];
  sessions: Session[];
  brews: Brew[];
};

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "db.json");

const EMPTY: Schema = { users: [], tokens: [], sessions: [], brews: [] };

function read(): Schema {
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<Schema>;
    return { ...EMPTY, ...parsed };
  } catch {
    return { ...EMPTY };
  }
}

function write(data: Schema): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}

// --- Users ---------------------------------------------------------------

export function findOrCreateUser(email: string): User {
  const normalized = email.trim().toLowerCase();
  const data = read();
  let user = data.users.find((u) => u.email === normalized);
  if (!user) {
    user = { id: crypto.randomUUID(), email: normalized, createdAt: Date.now() };
    data.users.push(user);
    write(data);
  }
  return user;
}

export function getUser(id: string): User | undefined {
  return read().users.find((u) => u.id === id);
}

// --- Magic tokens --------------------------------------------------------

export function createToken(token: MagicToken): void {
  const data = read();
  data.tokens.push(token);
  write(data);
}

export function consumeToken(tokenHash: string): MagicToken | null {
  const data = read();
  const now = Date.now();
  const token = data.tokens.find(
    (t) => t.tokenHash === tokenHash && t.consumedAt === null && t.expiresAt > now,
  );
  if (!token) return null;
  token.consumedAt = now;
  write(data);
  return token;
}

// --- Sessions ------------------------------------------------------------

export function createSession(userId: string, ttlMs: number): Session {
  const data = read();
  const session: Session = {
    id: crypto.randomUUID(),
    userId,
    expiresAt: Date.now() + ttlMs,
    createdAt: Date.now(),
  };
  data.sessions.push(session);
  write(data);
  return session;
}

export function getSession(id: string): Session | undefined {
  const session = read().sessions.find((s) => s.id === id);
  if (!session) return undefined;
  if (session.expiresAt <= Date.now()) return undefined;
  return session;
}

export function deleteSession(id: string): void {
  const data = read();
  data.sessions = data.sessions.filter((s) => s.id !== id);
  write(data);
}

// --- Brews (per-user brew journal) ---------------------------------------

export function listBrews(userId: string): Brew[] {
  return read()
    .brews.filter((b) => b.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function addBrew(brew: Omit<Brew, "id" | "createdAt">): Brew {
  const data = read();
  const entry: Brew = { ...brew, id: crypto.randomUUID(), createdAt: Date.now() };
  data.brews.push(entry);
  write(data);
  return entry;
}
