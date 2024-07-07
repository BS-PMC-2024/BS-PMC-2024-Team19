import React from "react";
import sections from "../../../constants/data";
import images from "../../../constants/images";
import "./Qualities.css";

const Qualities = () => {
  return (
    <section className="qualities section-p bg-md-black" id="qualities">
      <div className="container">
        <div className="qualities-content grid">
          <div className="content-left">
            <div className="section-t text-center">
              <h3>We are Professionals</h3>
              <p className="text">
                At BestInvest, we leverage cutting-edge AI technology to empower
                traders in the financial market. Our software enables efficient
                portfolio management, comprehensive risk assessment, and
                real-time performance tracking across multiple exchanges. We are
                dedicated to providing robust solutions that enhance
                decision-making and optimize trading strategies.
              </p>
            </div>

            <div className="item-list grid text-white">
              {sections.qualities.map((quality) => {
                return (
                  <div className="item flex" key={quality.id}>
                    <div className="item-icon flex flex-center">
                      {quality.icon}
                    </div>
                    <div className="item-text">
                      <h3 className="item-title fs-25">{quality.title}</h3>
                      <p className="text">{quality.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="content-right">
            <img src={images.professionals_main_img} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualities;
