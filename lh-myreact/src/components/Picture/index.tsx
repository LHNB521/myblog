import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import Error from './error.png';
interface Props {
  src?: string;
  width?: string;
  height?: string;
}
const IMG: React.FC<Props> = ({ src, width, height }) => {
  const [load, setLoad] = useState(true);
  const [success, setSuccess] = useState(true);
  const style = {
    width,
    height
  };
  useEffect(() => {
    setSuccess(true);
    setLoad(true);
  }, [src]);
  const onLoad = () => {
    setLoad(false);
  };
  const onError = () => {
    setSuccess(false);
    setLoad(false);
  };
  return (
    <Spin spinning={load}>
      {success ? (
        <img src={src} style={style} onLoad={onLoad} onError={onError} />
      ) : (
        <img src={Error} style={style} />
      )}
    </Spin>
  );
};
export default IMG;
