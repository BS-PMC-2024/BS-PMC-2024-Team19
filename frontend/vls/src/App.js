import "./App.css";
import "./assets/js/script";
import HomePage from "./features/HomePage/HomePage";
import Navbar from "./common/components/Navbar/Navbar";
import Footer from "./common/components/Footer/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
