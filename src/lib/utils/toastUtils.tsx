// app/lib/toastUtils.js
"use client";

import { toast } from "react-toastify";

export const showSuccess = (message: string, options = {}) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    ...options,
  });
};

export const showError = (message: string, options = {}) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    ...options,
  });
};
