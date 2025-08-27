import './i18n';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  ForgotPassword,
  Home,
  JoinUs,
  Kyc,
  Layout,
  Login,
  NotFound,
  PrivateRoute,
  Profile,
  DonateNow,
  DonateHistory,
  GalleryImages,
  ContactSection,
  Education,
  Sports,
  Child,
  Rural,
} from './containers/pageListAsync';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/signup/:type" element={<JoinUs />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/kyc" element={<Kyc />}></Route>
          <Route path="/donate-now" element={<DonateNow />}></Route>
          <Route path="/donate-history" element={<DonateHistory />}></Route>
          <Route path="/gallery-images" element={<GalleryImages />}></Route>
          <Route path="/contact-us" element={<ContactSection />}></Route>
          <Route
            path="/key-initiatives-education"
            element={<Education />}
          ></Route>
          <Route path="/key-initiatives-sports" element={<Sports />}></Route>
          <Route path="/key-initiatives-child" element={<Child />}></Route>
          <Route path="/key-initiatives-rural" element={<Rural />}></Route>
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
