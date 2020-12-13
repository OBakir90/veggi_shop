import React from "react";

const NoResults = () => {
  return (
    <div className="no-results">
      <img
        src="https://raw.githubusercontent.com/itprofessionalsfrontend/shop/master/assets/bare-tree.png"
        alt="No Results"
      />
      <h2>Sorry there is no product matches your search..</h2>
      <p>Please search another product</p>
    </div>
  );
};

export default NoResults;
