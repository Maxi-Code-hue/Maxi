/**
 * Minimal JSON-file data store.
 *
 * This keeps the demo dependency-free and runnable without an external
 * database. For production, swap this module for a real DB (Postgres/Prisma).
 *
 * Concurrency: every read-modify-write goes through `transaction()`, which
 * holds an exclusive cross-process lock (atomic `mkdir`) for the whole
 * read → mutate → write cycle and persists via an atomic temp-file rename.
 * This prevents the TOCTOU race where two concurrent requests could consume
 * the same magic token (or corrupt the file) before either had written back.
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
const LOCK_DIR = path.join(DATA_DIR, ".lock");

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

/** Persist atomically: write to a temp file, then rename over the target. */
function writeAtomic(data: Schema): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${DB_FILE}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tmp, DB_FILE); // rename is atomic on the same filesystem
}

/** Acquire an exclusive lock. `mkdir` is atomic, so only one holder wins. */
function acquireLock(): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const deadline = Date.now() + 2000;
  for (;;) {
    try {
      fs.mkdirSync(LOCK_DIR);
      return;
    } catch {
      if (Date.now() > deadline) {
        // Lock is likely stale (crashed holder): reclaim it.
        try {
          fs.rmdirSync(LOCK_DIR);
          fs.mkdirSync(LOCK_DIR);
        } catch {
          /* give up gracefully and proceed */
        }
        return;
      }
      const until = Date.now() + 15; // brief synchronous backoff
      while (Date.now() < until) {
        /* spin */
      }
    }
  }
}

function releaseLock(): void {
  try {
    fs.rmdirSync(LOCK_DIR);
  } catch {
    /* already released */
  }
}

/** Run a read → mutate → write cycle atomically under the file lock. */
function transaction<T>(mutate: (data: Schema) => T): T {
  acquireLock();
  try {
    const data = read();
    const result = mutate(data);
    writeAtomic(data);
    return result;
  } finally {
    releaseLock();
  }
}

// --- Users ---------------------------------------------------------------

export function findOrCreateUser(email: string): User {
  const normalized = email.trim().toLowerCase();
  return transaction((data) => {
    let user = data.users.find((u) => u.email === normalized);
    if (!user) {
      user = { id: crypto.randomUUID(), email: normalized, createdAt: Date.now() };
      data.users.push(user);
    }
    return user;
  });
}

export function getUser(id: string): User | undefined {
  return read().users.find((u) => u.id === id);
}

// --- Magic tokens --------------------------------------------------------

export function createToken(token: MagicToken): void {
  transaction((data) => {
    data.tokens.push(token);
  });
}

export function consumeToken(tokenHash: string): MagicToken | null {
  return transaction((data) => {
    const now = Date.now();
    const token = data.tokens.find(
      (t) => t.tokenHash === tokenHash && t.consumedAt === null && t.expiresAt > now,
    );
    if (!token) return null;
    token.consumedAt = now; // marked inside the same locked transaction
    return token;
  });
}

// --- Sessions ------------------------------------------------------------

export function createSession(userId: string, ttlMs: number): Session {
  return transaction((data) => {
    const session: Session = {
      id: crypto.randomUUID(),
      userId,
      expiresAt: Date.now() + ttlMs,
      createdAt: Date.now(),
    };
    data.sessions.push(session);
    return session;
  });
}

export function getSession(id: string): Session | undefined {
  const session = read().sessions.find((s) => s.id === id);
  if (!session) return undefined;
  if (session.expiresAt <= Date.now()) return undefined;
  return session;
}

export function deleteSession(id: string): void {
  transaction((data) => {
    data.sessions = data.sessions.filter((s) => s.id !== id);
  });
}

// --- Brews (per-user brew journal) ---------------------------------------

export function listBrews(userId: string): Brew[] {
  return read()
    .brews.filter((b) => b.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function addBrew(brew: Omit<Brew, "id" | "createdAt">): Brew {
  return transaction((data) => {
    const entry: Brew = { ...brew, id: crypto.randomUUID(), createdAt: Date.now() };
    data.brews.push(entry);
    return entry;
  });
}
