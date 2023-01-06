import React from 'react';
import PageTitle from 'Src/components/PageTitle';
import Left from './Left';
import s from './index.scss';
const Home: React.FC = () => {
  return (
    <>
      <PageTitle title="长江小浩" className={s.homeTitle} />
      <div className={s.body}>
        <Left />
      </div>
    </>
  );
};
export default Home;
