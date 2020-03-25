import { PersistentWebStore } from "./store";

export class ClientKeyStore {
  store = new PersistentWebStore(this.storeName);
  keys = this.store.get() || [];

  constructor(private storeName: string) {}

  add(host: string, key: string) {
    this.keys.push({ host, key });
    this.persist();
  }

  getKeyByHost(host: string) {
    for (const item of this.keys) {
      if (item.host === host) {
        return item.key;
      }
    }
    return null;
  }

  private persist() {
    this.store.set(this.keys);
  }
}