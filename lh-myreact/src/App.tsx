import './global.custom.scss';

import React from 'react';
import s from './App.scss';
import Nav from 'Src/components/Nav';
import Main from './components/Main';
import classNames from 'classnames';
const App: React.FC = () => {
  return (
    <div className={classNames(s.AppBox, s.bg2)}>
      <Nav />
      <Main />
    </div>
  );
};

export default App;
