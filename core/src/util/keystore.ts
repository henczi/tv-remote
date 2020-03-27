import { PersistentWebStore } from "./store";

export class ClientKeyStore {
  store = new PersistentWebStore(this.storeName);
  keys = this.store.get() || [];

  constructor(private storeName: string) {}

  add(uri: string, key: string) {
    this.keys.push({ uri: uri, key });
    this.persist();
  }

  getKeyByUri(uri: string) {
    for (const item of this.keys) {
      if (item.uri === uri) {
        return item.key;
      }
    }
    return undefined;
  }

  private persist() {
    this.store.set(this.keys);
  }
}