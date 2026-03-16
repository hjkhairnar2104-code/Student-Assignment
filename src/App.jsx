import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import ScrollProgressBar from "./components/ScrollProgressBar";

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollProgressBar />
      <AnimatedBackground />
      <div className="flex min-h-screen flex-col relative z-10">
        <Navbar />
        {/* Page content fades in on every navigation */}
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 bg-transparent"
        >
          <Outlet />
        </motion.main>

        <Footer />
      </div>
    </>
  );
}

export default App;
