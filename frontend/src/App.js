import HomePage from "./features/HomePage/HomePage";
import Navbar from "./common/components/Navbar/Navbar";
import Footer from "./common/components/Footer/Footer";
import UpdateD from "./common/components/Users/UpdateD";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./features/Auth/SignUp/SignUp";
import Login from "./features/Auth/LogIn/Login";

function App() {
  return (
    <div>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/update" element={<UpdateD />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
