import React from 'react';
import { useRequest } from 'ahooks';
import s from './index.scss';
import { Api } from 'Src/server/api';
import TitleCard from './TitleCard';
import { useNavigate } from 'react-router-dom';
interface theDoc {
  body?: string; // 内容
  description?: string; // 描述
  title?: string; // 标题
  created_at?: string; // 创建时间
  category?: string;
  url?: string;
}
interface theData {
  data?: any;
  loading?: boolean;
}
const Left: React.FC = () => {
  const navigate = useNavigate();
  // 主页显示文档列表接口
  const { data, loading }: theData = useRequest(async () => {
    const [e, r] = await Api.catalogueQueryAll();
    console.log(r);
    if (!e && r) {
      return r;
    }
  });
  // 随机显示图片
  const imgRandom = () => {
    const imgSrc = 'img' + Math.floor(Math.random() * 10);
    return imgSrc;
  };
  return (
    <section className={s.section}>
      {data?.map(({ title, description, category }: theDoc, index: number) => (
        <TitleCard
          title={title}
          loading={loading}
          description={description}
          category={category}
          imgPosition={index % 2 === 0}
          imgSrc={imgRandom()}
          onClick={() =>
            navigate(`/post?title=${encodeURIComponent(`${title}`)}`)
          }
        />
      ))}
    </section>
  );
};
export default Left;
