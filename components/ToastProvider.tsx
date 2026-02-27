"use client";

import { ToastContainer } from "react-toastify";

export function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      style={{ zIndex: 9999 }}
    />
  );
}
