/**
 * Minimal promise wrapper over native IndexedDB for the offline flight pack.
 * No external dependency — the store layout is small and fixed.
 */

const DB_NAME = "pa-china-2026-offline";
const DB_VERSION = 1;

export const PACK_STORES = {
  meta: { keyPath: "key" },
  documents: { keyPath: "id" },
  searchIndex: { keyPath: "id" },
  exports: { keyPath: "kind" },
  readiness: { keyPath: "id" }
} as const;

export type PackStoreName = keyof typeof PACK_STORES;

export function isIndexedDbSupported(): boolean {
  return typeof indexedDB !== "undefined";
}

export function openPackDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      for (const [name, options] of Object.entries(PACK_STORES)) {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, options);
        }
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB open failed"));
    request.onblocked = () => reject(new Error("IndexedDB open blocked by another tab"));
  });
}

function awaitTransaction(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("IndexedDB transaction failed"));
    tx.onabort = () => reject(tx.error ?? new Error("IndexedDB transaction aborted"));
  });
}

/** Replaces the full contents of the given stores in one transaction, so an
 *  interrupted install can never leave a half-old, half-new pack behind. */
export async function replaceStores(
  db: IDBDatabase,
  writes: Partial<Record<PackStoreName, unknown[]>>
): Promise<void> {
  const names = Object.keys(writes) as PackStoreName[];
  const tx = db.transaction(names, "readwrite");
  for (const name of names) {
    const store = tx.objectStore(name);
    store.clear();
    for (const value of writes[name] ?? []) {
      store.put(value);
    }
  }
  await awaitTransaction(tx);
}

export async function readAll<T>(db: IDBDatabase, storeName: PackStoreName): Promise<T[]> {
  const tx = db.transaction(storeName, "readonly");
  const request = tx.objectStore(storeName).getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as T[]);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB read failed"));
  });
}

export async function readKey<T>(
  db: IDBDatabase,
  storeName: PackStoreName,
  key: IDBValidKey
): Promise<T | undefined> {
  const tx = db.transaction(storeName, "readonly");
  const request = tx.objectStore(storeName).get(key);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as T | undefined);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB read failed"));
  });
}

export async function clearAllStores(db: IDBDatabase): Promise<void> {
  const names = Object.keys(PACK_STORES) as PackStoreName[];
  const tx = db.transaction(names, "readwrite");
  for (const name of names) {
    tx.objectStore(name).clear();
  }
  await awaitTransaction(tx);
}
