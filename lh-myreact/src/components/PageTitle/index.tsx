import classNames from 'classnames';
import React from 'react';
import s from './index.scss';
interface Props {
  title?: string;
  className?: string;
}
const PageTitle: React.FC<Props> = ({ title, className }) => {
  return (
    <div className={classNames(s.box, className)}>
      <div className={s.title}>{title}</div>
    </div>
  );
};
export default PageTitle;
