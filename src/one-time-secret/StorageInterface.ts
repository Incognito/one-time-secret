export interface StorageInterface {
  get(key: string): Promise<{secret: string | undefined}>;
  has(key: string): Promise<boolean>;
  set(key: string, value: {secret: string}, ttl: number): void;
}
