import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';
import s from './index.scss';
interface Props {
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  name?: string;
  count?: number;
}
const ClassifyBar: React.FC<Props> = ({ className, onClick, name, count }) => {
  return (
    <div className={classNames(s.classBar, className)} onClick={onClick}>
      {name}
      <div className={s.classNum}>{count}</div>
    </div>
  );
};
export default ClassifyBar;
