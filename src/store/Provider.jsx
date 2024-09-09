"use client";
import { Provider } from "react-redux";
import store from "./store";
import ToastNotification from "@/(components)/toast/Toast";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <NextUIProvider>

        {children}
        <ToastNotification />
      </NextUIProvider>
    </Provider>
  );
}
