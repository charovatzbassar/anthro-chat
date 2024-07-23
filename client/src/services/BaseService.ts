export interface BaseService<T> {
  create: (data: T) => Promise<T>;
  update: (id: string, data: T) => Promise<T | null>;
  delete: (id: string) => Promise<T | null>;
  findById: (id: string) => Promise<T | null>;
  findAll: () => Promise<T[]>;
}