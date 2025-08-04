import React from 'react';
import aboutUsRightTopImage from "../../../assets/art1.png";
import aboutUsLeftBottomImage from "../../../assets/art2.png";
import './AboutUs.scss';

// About Section Component
const AboutUs = () => (
  <section className="about-us">
    <div className="about-us-images">
      <img
        src={aboutUsRightTopImage}
        alt="Decorative ice cream illustration"
        className="about-us-right-top"
        loading="lazy"
      />
      <img
        src={aboutUsLeftBottomImage}
        alt="Decorative ice cream illustration"
        className="about-us-left-bottom"
        loading="lazy"
      />
    </div>
    <div className="about-content">
      <h2 className="text-center mb-4">About CreamDash</h2>
      <div className="about-text">
        <p className="text-center lead">
          At CreamDash, we are passionate about crafting the finest ice cream using only the purest ingredients.
          Our mission is to bring joy and satisfaction to every scoop, ensuring that each flavor tells a story
          of quality and delight.
        </p>
        <p className="text-center">
          Founded with a commitment to excellence, we source our ingredients from local farms and trusted suppliers.
          Every batch is carefully crafted by our experienced artisans who understand that great ice cream is more
          than just a treat—it's a moment of happiness.
        </p>
      </div>
    </div>
  </section>
);

export default AboutUs;
