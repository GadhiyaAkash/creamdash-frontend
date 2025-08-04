import React from "react";
import PropTypes from "prop-types";
import "./SectionHeader.scss";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <header className="section-header text-center">
      <h2 className="section-title mb-4">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
    </header>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export default SectionHeader;
