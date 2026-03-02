import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {

  return (

    <>
      <div className="flex min-h-[calc(100vh-80px)] flex-col">
        <Navbar />
        {/* Main content grows and pushes footer down */}
        <main className="flex-1 bg-slate-50">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
