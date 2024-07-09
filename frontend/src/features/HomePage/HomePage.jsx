import Header from "../../common/components/Header/Header";
import Qualities from "./Qualities/Qualities";
import Testimonials from "./Testimonials/Testimonials";
import About from "./About/About";

const Homepage = () => {
  return (
    <div>
      <Qualities />
      <Testimonials />
      <About />
    </div>
  );
};

export default Homepage;