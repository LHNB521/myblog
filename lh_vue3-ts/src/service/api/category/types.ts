export interface IcategoryParams {
  category_name: string;
  category_description: string;
}
export interface IcategoryApi {
  all: () => Promise<any>;
  add: (params: IcategoryParams) => Promise<any>;
}
