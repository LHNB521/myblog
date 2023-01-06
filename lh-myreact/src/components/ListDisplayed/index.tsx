import React, { MouseEventHandler } from 'react';
import s from './index.scss';
interface Props {
  title?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
const DirectoryBar: React.FC<Props> = ({ title, onClick }) => {
  return (
    <div className={s.listDisplayed} onClick={onClick}>
      <div className={s.title}>{title}</div>
    </div>
  );
};
export default DirectoryBar;
