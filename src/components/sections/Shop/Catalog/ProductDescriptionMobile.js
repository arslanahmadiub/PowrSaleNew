import React from "react";

const ProductDescriptionMobile = () => {
  return (
    <div>
      <Grid container direction="row" spacing={0}>
        <Grid
          item
          xs={12}
          md={4}
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          {sideUrl !== null && sideUrl.length > 0 ? (
            <CoverImage
              // src={imageEndPoint + productDetail[0].Images[0].image}
              src={sideUrl[0]}
              alt="First tile"
            />
          ) : null}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          style={{ display: "flex", width: "100%", marginTop: "10px" }}
        >
          {sideUrl !== null
            ? sideUrl.map((item, index) => {
                if (index === 0) {
                  return null;
                } else {
                  return (
                    <Grid item key={index}>
                      <TiledImage
                        src={item}
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        onClick={() => handelTiledImage(item, index)}
                      />
                    </Grid>
                  );
                }
              })
            : null}
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DetailsContainer>
            <Grid
              container
              direction="column"
              spacing={0}
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12}>
                {/* <ProductName>{name && name}</ProductName> */}
                <ProductName>{data.name}</ProductName>
              </Grid>
              <Grid item xs={12}>
                {/* <Description>{description && description}</Description> */}
                <Description>{data.description}</Description>
              </Grid>
              <Grid item xs={12}>
                {/* <Price>GHS {price && price}</Price> */}
                <Price>GHS {data.price}</Price>
              </Grid>
              <Grid item xs={12} sm={2}></Grid>
              <Grid
                container
                direction="row"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={4}
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {userAvailability && userWithOwnShop === false ? (
                    <Button onClick={handelBuyNow}>Buy Now</Button>
                  ) : (
                    <Button disable faded>
                      Buy Now
                    </Button>
                  )}
                </Grid>
                {/* <Button onClick={handelBuyNow}>Buy Now</Button> */}
              </Grid>
              <br />
              <Grid item xs={12}>
                {userAvailability ? null : (
                  <p style={{ fontSize: "15px" }}>
                    Please{" "}
                    <span
                      style={{ color: "#31BDF4", cursor: "pointer" }}
                      onClick={handelLogin}
                    >
                      {" "}
                      Login
                    </span>{" "}
                    Or{" "}
                    <span
                      style={{ color: "#31BDF4", cursor: "pointer" }}
                      onClick={handelSignUp}
                    >
                      Create Account
                    </span>{" "}
                    To Buy This Product
                  </p>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Delivery>Delivery Applicable</Delivery>
            </Grid>
            <Grid item xs={12}>
              <Description>Yes, Price based on location</Description>
            </Grid>
          </DetailsContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDescriptionMobile;
