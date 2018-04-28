export class InMemoryStorage implements StorageInterface {
  /**
   * Intentionally not injecting the Map
   * This should not be tamperable
   *
   * To prevent the secret from being allocated in multiple places in
   * memory it is provided without use of a variable or reference.
   * Promise resolve will make it act as a function reference.
   * If Node itself assigns it somewhere, I don't know how I can help
   * that.
   *
   * Use of object for a value in get/set to encourage only a reference to the
   * value is used everywhere, also this lets me mutate the original memory
   * location.
   */

  constructor(){
    this.map = new Map()
  }

  async get(key: string) {
    return await new Promise((resolve)=>{
      resolve({secret: this.map.get(key)})
      const memoryReplacement = 'X'.repeat(secret.length)
      const key = 'X'.repeat(key.length)
      this.map.set(key, memoryReplacement)
      this.map.delete(key)
    })
  }

  async has(key: string) {
    return await new Promise((resolve)=>{
      resolve(this.map.has(key));
      const key = 'X'.repeat(key.length);
    });
  }

  async set(key: string, value: {secret: string}, ttl) {
    return await new Promise((resolve)=>{
      resolve(this.map.set(key, value.secret));
      const value = 'X'.repeat(value.secret.length);

    })
    setTimeout(()=>{
      this.map.delete(key);
      key = 'X'.repeat(key.length);
    }, ttl)
  }
}
