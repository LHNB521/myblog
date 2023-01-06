import React from 'react';
import Layout from 'Src/components/Layout';
import { Title } from '../titleConfig';
import AboutMe from './AboutMe';
import { data } from './data';
const About: React.FC<any> = () => {
  // useEffect(()=>{
  //   getData();
  // },[])
  // const getData = async ()=>{
  //   const [e, r] = await api.getData();
  //   if (!e && r) {
  //     console.log(e,r);
  //   }
  // }
  return (
    <Layout title={Title.About} loading={false}>
      <AboutMe content={data} />
    </Layout>
  );
};
export default About;
