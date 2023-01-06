import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import s from './index.scss';
const About = lazy(() => import('Src/pages/About'));
const Home = lazy(() => import('Src/pages/Home'));
const Books = lazy(() => import('Src/pages/Books'));
const Classify = lazy(() => import('Src/pages/Classify'));
const Directory = lazy(() => import('Src/pages/Directory'));
const Post = lazy(() => import('Src/pages/Post'));

const Main: React.FC = () => {
  return (
    <main className={s.main}>
      <div className={s.center}>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="books" element={<Books />} />
              <Route path="classify" element={<Classify />} />
              <Route path="directory" element={<Directory />} />
              <Route path="post" element={<Post />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
};
export default Main;
