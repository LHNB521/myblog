import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';
import s from './index.scss';
import { Skeleton } from 'antd';
interface Props {
  children?: any;
  loading?: boolean;
  isStatic?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
const Card: React.FC<Props> = ({
  children,
  loading,
  isStatic,
  className,
  onClick
}) => {
  return (
    <div
      className={classNames(
        s.card,
        { [s.center]: loading },
        { [s.active]: !isStatic },
        className
      )}
      onClick={onClick}
    >
      {loading ? <Skeleton paragraph={{ rows: 0 }} /> : children}
    </div>
  );
};
export default Card;
