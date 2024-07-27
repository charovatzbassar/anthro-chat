import { RestClient } from "@/utils";

export class BaseService<T> {
  constructor(private _endpoint: string) {
    this._endpoint = _endpoint;
  }

  create = (data: T): Promise<T> => RestClient.post(this._endpoint, data);

  update = (id: string, data: T): Promise<T | null> =>
    RestClient.put(`${this._endpoint}/${id}`, data);

  delete = (id: string): Promise<T | null> =>
    RestClient.delete(`${this._endpoint}/${id}`);

  findById = (id: string): Promise<T | null> =>
    RestClient.get(`${this._endpoint}/${id}`);

  findAll = (): Promise<T[]> => RestClient.get(this._endpoint);

  get endpoint(): string {
    return this._endpoint;
  }
}
