import React from 'react';
import { Skeleton } from 'antd';
interface Props {
  rows?: number;
}
const LayoutLoading: React.FC<Props> = ({ rows = 10 }) => (
  <Skeleton paragraph={{ rows }} />
);
export default LayoutLoading;
