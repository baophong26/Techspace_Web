"use client";

import { Provider } from "react-redux";
import store from "../redux/store";
import { useEffect } from "react";
import AOS from "aos";

export default function ClientProviders({ children }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
