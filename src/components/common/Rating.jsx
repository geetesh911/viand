import React, { Fragment } from "react";

export const Rating = ({ rating, classes }) => {
  return (
    <Fragment>
      <span
        className={`badge badge-secondary text-white ${classes}`}
        style={ratingStyle(rating)}
      >
        {rating ? rating : "new"}
      </span>
    </Fragment>
  );
};

const ratingStyle = rating => {
  if (rating >= 4.5) return { backgroundColor: "#3F7E00" };
  if (rating < 4.5 && rating >= 4.0) return { backgroundColor: "#5BA829" };
  if (rating < 4.0 && rating >= 3.5) return { backgroundColor: "#9ACD32" };
  if (rating < 3.5 && rating >= 3.0) return { backgroundColor: "#CDD614" };
  if (rating < 3.0 && rating >= 2.5) return { backgroundColor: "#FFBA00" };
  if (rating < 2.5 && rating >= 2.0) return { backgroundColor: "#FF7800" };
  if (rating < 2.0 && rating >= 1.5) return { backgroundColor: "#DE1D0F" };
  if (rating < 1.5 && rating >= 1.0) return { backgroundColor: "#CD1C26" };
  if (rating < 1.0 && rating > 0) return { backgroundColor: "#CD1C26" };
  else return { backgroundColor: "#89959B" };
};
