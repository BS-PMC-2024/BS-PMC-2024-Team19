import "./App.css";
import "./assets/js/script";
import HomePage from "./features/HomePage/HomePage";
import Header from "./common/components/Header/Header";
import Footer from "./common/components/Footer/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
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
