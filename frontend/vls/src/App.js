import "./App.css";
import Header from "./components/HomePage/Header/Header";
import HeaderA from "./components/Admin/HeaderA/HeaderA";
import NavbarA from "./components/Admin/NavbarA/NavbarA";
import "./assets/js/script";
import Services from "./components/HomePage/Services/Services";
import About from "./components/HomePage/About/About";
import Qualities from "./components/HomePage/Qualities/Qualities";
import Features from "./components/HomePage/Features/Features";
import Portfolio from "./components/HomePage/Portfolio/Portfolio";
import Testimonials from "./components/HomePage/Testimonials/Testimonials";
import Contact from "./components/HomePage/Contact/Contact";
import Footer from "./components/HomePage/Footer/Footer";

function App() {
  return (
    <div className="App">
      {/* <Header />
      <Qualities />
      <Testimonials />
      <About />
      <Footer /> */}
      <HeaderA />
    </div>
  );
}

export default App;
