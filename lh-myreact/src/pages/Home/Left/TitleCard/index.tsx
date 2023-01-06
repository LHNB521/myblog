import React, { MouseEventHandler } from 'react';
import Card from 'Src/components/Card';
import s from './index.scss';
import classNames from 'classnames';
import IMG from 'Src/components/Picture';
import { icon } from 'Src/utils/Icon';
interface Props {
  title?: string;
  loading?: boolean;
  description?: string;
  category?: string;
  imgPosition?: boolean;
  imgSrc?: any;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
const TitleCard: React.FC<Props> = ({
  title,
  loading,
  description,
  category,
  imgPosition,
  imgSrc,
  onClick
}) => {
  return (
    <Card isStatic={true} onClick={onClick} className={s.card}>
      {loading ? (
        '加载中。。。'
      ) : (
        <>
          <div className={s.title}>{title}</div>
          <div
            className={classNames(s.desImg, [
              imgPosition ? s.imgPositionRight : s.imgPositionLeft
            ])}
          >
            <div className={s.content}>{description}</div>
            <IMG width={'200px'} src={icon[imgSrc]} />
          </div>
          <div className={s.info}>
            <div
              className={classNames(s.tags, [
                imgPosition ? s.tagsPositionLeft : s.tagsPositionRight
              ])}
            >
              <span className={s.tag}>{category}</span>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default TitleCard;
