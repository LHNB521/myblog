import React from 'react';
import s from './index.scss';
import { useEventListener } from 'ahooks';
import { useConfig } from './config';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { storeState } from 'Src/redux/interface';
import { setNavShow } from 'Src/redux/action';
interface Props {
  navShow?: boolean;
  setNavShow?: Function;
}
const Nav: React.FC<Props> = ({ navShow, setNavShow }) => {
  const navigate = useNavigate();
  const { navArr, blog } = useConfig();
  useEventListener(
    'mousewheel',
    (event) => {
      // eslint-disable-next-line no-param-reassign
      event = event || window.event;
      setNavShow!(event.wheelDeltaY > 0);
    },
    { target: document.body }
  );
  /**
   * !点击等号触发事件
   */
  const setHandle = () => {
    console.log('4545');
  };
  return (
    <div className={classNames(s.Nav, { [s.hiddenNav]: !navShow })}>
      <div className={s.Nav_block}>
        {/* 主页按钮 */}
        <div onClick={() => navigate('/')}>
          <HomeOutlined />
        </div>
        {/* 文章按钮 */}
        <div className={s.articlesBtn}>
          <div className={s.articelsSecond}>
            {blog.map((item, index) => (
              <NavLink
                to={item.to}
                className={s.articelsSecondItem}
                key={index}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <span>文章</span>
        </div>

        {/* 其他按钮 */}
        {navArr.map((item: any, index: number) => (
          <NavLink to={item.to} key={index} className={s.navLink}>
            {item.name}
          </NavLink>
        ))}
      </div>
      <div className={s.setD} onClick={setHandle}>
        =
      </div>
    </div>
  );
};

export default connect(
  (state: storeState) => ({
    navShow: state.navShow
  }),
  { setNavShow }
)(Nav);
