import { Get, Post } from '../server';

export interface FcResponse<T> {
  errno: string;
  errmsg: string;
  data: T;
}

export type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>;

export function categoryAll<T = { name: string }>(): ApiResponse<T> {
  return Get<T>('/category/all',);
}
export function catalogueQuery<T = { name: string }>(category: any): ApiResponse<T> {
  return Post<T>('/catalogue/catalogueQuery', { category });
}
export function catalogueQueryAll<T = { name: string }>(): ApiResponse<T> {
  return Get<T>('/catalogue/all');
}
export function documentQuery<T = { name: string }>(title: string): ApiResponse<T> {
  return Post<T>('/document/documentQuery', { title });
}
export const Api = {
  categoryAll,
  catalogueQuery,
  catalogueQueryAll,
  documentQuery
};
