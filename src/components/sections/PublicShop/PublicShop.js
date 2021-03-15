import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import PublicShopDesktop from "./PublicShopDesktop";
import PublicShopMobile from "./PublicShopMobile";
import { Hidden } from "@material-ui/core";
import RenderProducts from "../Shop/Catalog/RenderProducts";
import { publicShopDetail } from "../../../services/shopServices";
import { imageEndPoint } from "../../../config.json";
import { setShopInfo } from "../../../action/shopAction";
import { useDispatch } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#31BDF4",
    background: "rgba(182,172,162,0.2)",
  },
}));

const Container = Styled.div`
padding: 50px 30px;
border-radius: 0;
background: #F5F8FD;
min-height: 80%;
@media (max-width: 960px){
    padding: 20px 10px;
}
`;

const PublicShop = () => {
  let id = window.location.href;
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  let shopId = id.slice(id.lastIndexOf("/") + 1, id.length);

  const dispatch = useDispatch();

  let [dumpData, setDumpData] = useState([]);
  const [shopData, setShopData] = useState(null);

  let getCatalog = async () => {
    try {
      setLoading(true);
      let { data } = await publicShopDetail(shopId);

      if (data.Success) {
        dispatch(setShopInfo(data.ShopDetails[0]));
      }
      setLoading(false);
      if (data.Success) {
        let result = data.Products;
        let shopResult = data.ShopDetails;
        setShopData(shopResult[0]);
        let freshData = [];
        result.map((item) => {
          let newData = {
            name: item.product_name,
            image:
              item.thumbnail.length > 0
                ? imageEndPoint + item.thumbnail[0].image
                : "",
            description: item.description,
            price: item.price,
            tiles: {
              first_tile: "",
            },
            delivery: "24hrs",
            productId: item.product,
          };
          freshData.push(newData);
        });
        setDumpData(freshData);
      }
    } catch (error) {
      setLoading(false);

      history.push("/page-not-found");
    }
  };
  useEffect(() => {
    getCatalog();
  }, []);
  return (
    <Container>
      <Hidden smDown>
        <PublicShopDesktop data={shopData} />
      </Hidden>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Hidden mdUp>
        <PublicShopMobile data={shopData} />
      </Hidden>
      <div style={{ padding: "30px" }}>
        <RenderProducts
          products={dumpData}
          shopNameData={shopData && shopData.shop_name}
        />
      </div>
    </Container>
  );
};

export default PublicShop;
