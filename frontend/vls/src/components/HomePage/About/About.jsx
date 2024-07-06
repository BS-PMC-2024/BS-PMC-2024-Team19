import React from "react";
import "./About.css";
import images from "../../../constants/images";

const About = () => {
  return (
    <section className="about section-p bg-dark" id="about">
      <div className="container">
        <div className="about-content grid text-center">
          <div className="content-left">
            <img src={images.about_main_img} alt="" />
          </div>
          <div className="content-right">
            <div className="section-t">
              <h3>About Us</h3>
            </div>
            <p className="text">
              At BestInvest, we are dedicated to revolutionizing financial
              trading with cutting-edge AI technology. Our mission is to empower
              traders worldwide by providing sophisticated tools for portfolio
              management, risk assessment, and real-time performance tracking.
              We strive to deliver innovative solutions that enhance
              decision-making, optimize trading strategies, and ensure our
              clients achieve sustainable success in the dynamic global market.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
