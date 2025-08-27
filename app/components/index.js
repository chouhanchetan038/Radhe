import React from 'react';
import loadable from '../utils/loadable';
import Loading from './Loading';

// Loading - No need to lazy load this component
export { default as Loading } from './Loading';

export const Navbar = loadable(() => import('./Navbar'), {
  fallback: <Loading />,
});

export const Footer = loadable(() => import('./Footer'), {
  fallback: <Loading />,
});

export const ScrollToTop = loadable(() => import('./ScrollToTop'), {
  fallback: <Loading />,
});

export const ImageSwiper = loadable(() => import('./ImageSwiper'), {
  fallback: <Loading />,
});
