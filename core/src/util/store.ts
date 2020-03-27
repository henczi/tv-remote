export class PersistentWebStore {
  constructor(private storeKey: string) {}

  get() {
    const data = localStorage.getItem(this.storeKey);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  }

  set(data: any) {
    if (data == null) {
      localStorage.removeItem(this.storeKey);
    } else {
      localStorage.setItem(this.storeKey, JSON.stringify(data));
    }
  }
}