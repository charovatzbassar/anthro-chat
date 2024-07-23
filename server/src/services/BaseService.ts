export interface BaseService<T> {
  create: (data: T) => Promise<T>;
  delete: (id: string) => Promise<T | null>;
  update: (id: string, data: T) => Promise<T | null>;
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T | null>;
}
