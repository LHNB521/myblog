export interface ISaveParams {
  article_title: string;
  article_content: string;
}
export interface ISaveApi {
  save: (params: ISaveParams) => Promise<any>;
}
