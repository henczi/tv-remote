import { PersistentWebStore } from "./store";

export interface ClientKeyStoreItem {
  name: string;
  uri: string;
  key: string;
}

export class ClientKeyStore {
  private store = new PersistentWebStore(this.storeName);
  private keys: ClientKeyStoreItem[] = this.store.get() || [];

  constructor(private storeName: string) {}

  add(name: string, uri: string, key: string) {
    this.keys.push({ name, uri, key });
    this.persist();
  }

  list() {
    return this.keys;
  }

  private persist() {
    this.store.set(this.keys);
  }
}