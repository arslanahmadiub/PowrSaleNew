import React from "react";
import Grid from "@material-ui/core/Grid";
import Product from "./Product";
import { RightSideBarContext } from "../../../../contexts/RightSideBarContext";
import { Hidden } from "@material-ui/core";
const RenderProducts = (props) => {
  const { showRightSideBar } = React.useContext(RightSideBarContext);

  const products = props.products;

  return (
    <>
      <Hidden only={["lg", "md", "xl"]}>
        <Grid
          container
          direction="row"
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          {products &&
            products.map((product, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={showRightSideBar ? 4 : 3}
                  key={index}
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Product
                    key={product.name + index.toString()}
                    details={product}
                    shopNameData={props.shopNameData}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Hidden>
      <Hidden only={["sm", "xs"]}>
        <Grid container direction="row">
          {products &&
            products.map((product, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={showRightSideBar ? 6 : 4}
                  md={showRightSideBar ? 4 : 3}
                  key={index}
                >
                  <Product
                    key={product.name + index.toString()}
                    details={product}
                    shopNameData={props.shopNameData}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Hidden>
    </>
  );
};

export default RenderProducts;
