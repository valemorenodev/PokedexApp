import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../components/Login/Login';
import NotFound from '../components/Notfound/NotFound';
import View from '../View/View';

const RouterApp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="*"
          element={
            localStorage.getItem("token") ? (
              <Routes>
                <Route path="/dashboard" element={<View />} />
                <Route path={"*"} element={<NotFound />} />
              </Routes>
            ) :
              (
                <Routes>
                  <Route path={"*"} element={<Navigate to="/login" />} />
                </Routes>
              )
          } />
      </Routes>
    </>
  )
}

export default RouterApp
