import React from 'react';
import { Loading } from '@/components';
import loadable from '../utils/loadable';

// Static Pages
export const NotFound = loadable(() => import('./NotFound'), {
  fallback: <Loading />,
});

// Layout Page
export const Layout = loadable(() => import('./Layout'), {
  fallback: <Loading />,
});
// Home Page
export const Home = loadable(() => import('./Home'), {
  fallback: <Loading />,
});
// HeroSection Page
export const HeroSection = loadable(() => import('./HeroSection'), {
  fallback: <Loading />,
});
// AboutSection Page
export const AboutSection = loadable(() => import('./AboutSection'), {
  fallback: <Loading />,
});
// InitiativesSection Page
export const InitiativesSection = loadable(
  () => import('./InitiativesSection'),
  {
    fallback: <Loading />,
  },
);
// InitiativesSection Page
export const ImpactStats = loadable(() => import('./ImpactStats'), {
  fallback: <Loading />,
});
// ProgramSection Page
export const ProgramSection = loadable(() => import('./ProgramSection'), {
  fallback: <Loading />,
});
// GallerySection Page
export const GallerySection = loadable(() => import('./GallerySection'), {
  fallback: <Loading />,
});

// ProgramSection Page
export const GalleryImages = loadable(
  () => import('./GallerySection/GalleryImages'),
  {
    fallback: <Loading />,
  },
);

// TestimonialsSection Page
export const TestimonialsSection = loadable(
  () => import('./TestimonialsSection'),
  {
    fallback: <Loading />,
  },
);

// DonateSection Page
export const DonateSection = loadable(() => import('./DonateSection'), {
  fallback: <Loading />,
});

// ContactSection Page
export const ContactSection = loadable(() => import('./ContactSection'), {
  fallback: <Loading />,
});

// ContactSection Page
export const JoinUs = loadable(() => import('./JoinUs'), {
  fallback: <Loading />,
});

// ContactSection Page
export const Login = loadable(() => import('./Login'), {
  fallback: <Loading />,
});

// ContactSection Page
export const ForgotPassword = loadable(() => import('./ForgotPassword'), {
  fallback: <Loading />,
});

// ContactSection Page
export const Profile = loadable(() => import('./Profile'), {
  fallback: <Loading />,
});

export const Kyc = loadable(() => import('./Kyc'), {
  fallback: <Loading />,
});

export const DonateNow = loadable(() => import('./DonetNow'), {
  fallback: <Loading />,
});
export const PrivateRoute = loadable(() => import('./PrivateRoute'), {
  fallback: <Loading />,
});

export const DonateHistory = loadable(() => import('./DonateHistory'), {
  fallback: <Loading />,
});

export const Child = loadable(() => import('./KeyLnitiatives/Child'), {
  fallback: <Loading />,
});

export const Rural = loadable(() => import('./KeyLnitiatives/Rural'), {
  fallback: <Loading />,
});

export const Sports = loadable(() => import('./KeyLnitiatives/Sports'), {
  fallback: <Loading />,
});

export const Education = loadable(() => import('./KeyLnitiatives/Education'), {
  fallback: <Loading />,
});
