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

  addOrUpdate(name: string, uri: string, key: string) {
    if (this.containsName(name)) {
      const el = this.getByName(name);
      el.key = key;
      el.uri = uri;
    } else {
      this.keys.push({ name, uri, key });
    }
    this.persist();
  }

  containsName(name) {
    return this.keys.map(x => x.name).indexOf(name) >= 0;
  }

  removeByName(name) {
    this.keys = this.keys.filter(x => x.name !== name);
    this.persist();
  }

  getByName(name) {
    for(let i = 0; i < this.keys.length; i++) {
      if (this.keys[i].name === name)
        return this.keys[i];
    }
    return null;
  }

  listItems() {
    return this.keys;
  }

  private persist() {
    this.store.set(this.keys);
  }
}