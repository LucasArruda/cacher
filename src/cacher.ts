export default class Cacher {
  static map: Map<string, Object> = new Map<string, Object>();

  static set(key: string, obj: Object){
    this.map.set(key, obj);
  }

  static get(key: string): Object | undefined {
    return this.map.get(key);
  }

  static has(key: string): boolean {
    return this.map.has(key);
  }

  static del(key: string): boolean {
    if (!this.has(key)) return false;

    return this.map.delete(key);
  }
}
