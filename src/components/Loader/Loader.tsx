import React from "react";
import "./Loader.scss";

const Loader: React.FC = () => {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loader;
