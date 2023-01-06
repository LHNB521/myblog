import React from 'react';
import s from './index.scss';
import { Title } from '../titleConfig';
import { Api } from 'Src/server/api';
import { useRequest } from 'ahooks';
import Layout from 'Src/components/Layout';
import ClassifyBar from './ClassifyBar';
import { useNavigate } from 'react-router-dom';
interface theClassify {
  data?: any;
  category_name?: string;
  loading?: boolean;
  count?: number;
  slug?: any;
}
const Classify: React.FC = () => {
  const navigate = useNavigate();

  /**
   * 获取分类
   */
  const { data, loading }: theClassify = useRequest(async () => {
    const [e, r] = await Api.categoryAll();
    if (!e && r) {
      console.log(r);
      return r;
    }
  });
  /**
   * @description: 点击分类列表事件
   * @param {any} item
   * @return {*}
   */
  const toDirectory = (item: any) => {
    navigate(`/directory?classifys=${encodeURIComponent(item.category_name)}`);
  };
  return (
    <Layout
      title={Title.Classify}
      loading={loading}
      className={s.classBox}
      rows={8}
    >
      {data?.map((item: theClassify) => (
        <ClassifyBar
          className={s.classItem}
          name={item.category_name}
          onClick={() => toDirectory(item)}
        />
      ))}
    </Layout>
  );
};
export default Classify;
