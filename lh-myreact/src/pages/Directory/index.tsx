import React from 'react';
import useUrlState from '@ahooksjs/use-url-state';
import { Api } from 'Src/server/api';
import { useRequest } from 'ahooks';
import Layout from 'Src/components/Layout';
import ListDisplayed from '../../components/ListDisplayed';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setDoc, setToc } from 'Src/redux/action';
interface theDirectory {
  data?: any;
  loading?: boolean;
  title?: string;
  type?: string;
}
interface Props {
  doc: string;
  toc: string;
  setDoc: Function;
  setToc: Function;
}
const Directory: React.FC<Props> = ({ setDoc, setToc }) => {
  const [slug] = useUrlState();
  const navigate = useNavigate();
  /**
   * 获取目录数据
   */
  const { data, loading }: theDirectory = useRequest(async () => {
    const [e, r] = await Api.catalogueQuery(slug.classifys);
    if (!e && r) {
      console.log(r);
      return r;
    }
  });
  /**
   * @description: 点击目录事件
   * @param {any} item
   * @return {*}
   */
  const toPostHandle = (item: any) => {
    setDoc(item.slug);
    setToc(slug.classifys);
    navigate(`/post?title=${encodeURIComponent(`${item.title}`)}`);
  };
  return (
    <Layout title={slug.classifys} loading={loading}>
      {data?.map((item: theDirectory) => (
        <ListDisplayed title={item.title} onClick={() => toPostHandle(item)} />
      ))}
    </Layout>
  );
};
export default connect(
  // 1. 状态
  (state: any) => ({ doc: state.doc, toc: state.toc }),
  // 2. 方法
  { setDoc, setToc }
)(Directory);
