export interface StorageInterface {
  get(key: string)
  has(key: string)
  set(key: string, value: string)
}
