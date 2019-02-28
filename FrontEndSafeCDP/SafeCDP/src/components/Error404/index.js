import React from "react";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="error-404">
      Error 404: Cannot find page
      <Link className="home-button" to="/">
        Go back home
      </Link>
    </div>
  );
}
