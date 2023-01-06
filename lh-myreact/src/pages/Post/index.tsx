import useUrlState from '@ahooksjs/use-url-state';
import { useRequest } from 'ahooks';
import React from 'react';
import { connect } from 'react-redux';
import Layout from 'Src/components/Layout';
import MarkDown from 'Src/components/MarkDown';
import { Api } from 'Src/server/api';
interface Props {
  doc: string;
  toc: string;
}
interface thePost {
  data?: any;
  loading?: boolean;
}
const Post: React.FC<Props> = ({ toc, doc }) => {
  const [slug] = useUrlState();
  /**
   * @description:获取文档
   * @param {*} useRequest
   * @return {*}
   */
  const { data, loading }: thePost = useRequest(async () => {
    const [e, r] = await Api.documentQuery(slug.title);
    console.log(r);
    if (!e && r) {
      return r;
    }
  });
  return (
    <Layout title={slug.title} loading={loading}>
      <MarkDown content={data?.body || ''} />
    </Layout>
  );
};
export default connect((state: Props) => ({ doc: state.doc, toc: state.toc }))(
  Post
);
