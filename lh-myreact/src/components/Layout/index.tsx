import classNames from 'classnames';
import React from 'react';
import PageTitle from '../PageTitle';
import s from './index.scss';
import Card from '../Card';
import LayoutLoading from '../LayoutLoading';
interface Props {
  title?: string;
  loading?: boolean;
  children?: object;
  isPost?: boolean;
  className?: string;
  rows?: number;
}
const Layout: React.FC<Props> = ({
  title,
  loading,
  children,
  isPost = false,
  className,
  rows
}) => {
  return (
    <>
      <PageTitle
        title={title}
        className={classNames({ [s.postTitle]: isPost })}
      ></PageTitle>
      <Card
        isStatic={true}
        loading={loading}
        className={classNames(s.layoutCard, className)}
      >
        {loading ? <LayoutLoading rows={rows} /> : children}
      </Card>
    </>
  );
};

export default Layout;
