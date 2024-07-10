import Header from "../../common/components/Header/Header";
import Qualities from "./Qualities/Qualities";
import Testimonials from "./Testimonials/Testimonials";
import About from "./About/About";
import "../../App.css";

const Homepage = () => {
  return (
    <div>
      <Header />
      <Qualities />
      <Testimonials />
      <About />
    </div>
  );
};

export default Homepage;
