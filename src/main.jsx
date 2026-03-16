import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store/store";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import Lenis from "lenis";
import { gsap } from "gsap";

// Initialize Lenis smooth scroll and connect it to GSAP's ticker
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

// Feed Lenis into GSAP's RAF for perfect compatibility
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);