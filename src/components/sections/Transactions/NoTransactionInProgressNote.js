import { Link } from "react-router-dom";
import React from "react";

const NoTransactionInProgressNote = (props) => {
  return (
    <section className="note-section" style={{ color: "#979FAA" }}>
      <ol>
        <p>
          Oops! You don't have any transactions created yet. You have two
          options here:
        </p>

        <li>
          <p>
            if you are a Seller/Merchant{" "}
            <Link to="/shopPreview">Click Here</Link> or head over to "Shop" to
            set up your storefront site. You will be able to add products and
            generate payment links you can add to your product posting on social
            media.
          </p>
        </li>
      </ol>
    </section>
  );
};

export default NoTransactionInProgressNote;
