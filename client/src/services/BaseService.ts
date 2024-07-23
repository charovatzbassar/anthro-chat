import { RestClient } from "@/utils";

export class BaseService<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  create = (data: T): Promise<T> => RestClient.post(this.endpoint, data);

  update = (id: string, data: T): Promise<T | null> =>
    RestClient.put(`${this.endpoint}/${id}`, data);

  delete = (id: string): Promise<T | null> =>
    RestClient.delete(`${this.endpoint}/${id}`);

  findById = (id: string): Promise<T | null> =>
    RestClient.get(`${this.endpoint}/${id}`);

  findAll = (): Promise<T[]> => RestClient.get(this.endpoint);

  get Endpoint(): string {
    return this.endpoint;
  }
}
