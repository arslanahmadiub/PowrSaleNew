import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import RenderProducts from "./Catalog/RenderProducts";
import { products } from "../../../DummyData/DummyData";
import { getCatalogData } from "../../../services/shopServices";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Space } from "antd";
import { setShopInfo } from "../../../action/shopAction";
import { imageEndPoint } from "../../../config.json";
const Container = Styled.div`
padding: 50px 30px;
border-radius: 0;
background: #F5F8FD;
min-height: 80%;
@media (max-width: 960px){
    padding: 20px 10px;
}
`;
const FlexContainer = Styled.div`
display: flex;
width: 100%;
justify-content:${(p) => (p.justify ? p.justify : "space-between")};
`;

const BrandSlogan = Styled.div`
    font-size: 18px; 
    color: #979FAA;
    
`;

export default function Catalog(props) {
  let [dumpData, setDumpData] = useState([]);

  const dispatch = useDispatch();

  let [showMessageNoProduct, setShowMessageNoProduct] = useState(false);
  const shopIds = useSelector((state) => state.shopPreview.shopIdCollections);

  const [loadingShow, setLoadingShow] = useState(false);

  const selectedShopId = useSelector(
    (state) => state.shopPreview.selectedShopId
  );
  let getCatalog = async () => {
    setLoadingShow(true);
    let { data } = await getCatalogData(selectedShopId);

    if (data.Success) {
      dispatch(setShopInfo(data.ShopDetails[0]));
    }
    let result = data.Products;
    let shopResult = data.ShopDetails;
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
        shopId: shopResult[0].shop,
        shopName: shopResult[0].shop_name,
        shopBio: shopResult[0].shop_bio,
        shopLogo: shopResult[0].shop_logo,
      };
      freshData.push(newData);
    });
    if (freshData.length > 0) {
      setDumpData(freshData);
      setShowMessageNoProduct(false);
      setLoadingShow(false);
    } else {
      setDumpData(freshData);
      setLoadingShow(false);

      setShowMessageNoProduct(true);
    }
  };
  useEffect(() => {
    setDumpData([]);
    if (selectedShopId) {
      getCatalog();
    } else {
      setShowMessageNoProduct(true);
    }
  }, [selectedShopId]);

  return (
    <Container>
      <div style={{ marginBottom: "0px", position: "relative" }}>
        <FlexContainer>
          {/* <div
            style={{
              width: "100px",
              right: "10px",
              top: "-30px",
              position: "absolute",
            }}
          >
            <FlexContainer>
              <BrandSlogan style={{ color: "#31BDF4", cursor: "pointer" }}>
                All
              </BrandSlogan>
              <BrandSlogan style={{ cursor: "pointer" }}>New</BrandSlogan>
            </FlexContainer>
          </div> */}
          {/* <br /> */}
          {loadingShow ? (
            <Space
              size="middle"
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Spin size="large" />
            </Space>
          ) : null}

          {shopIds.length < 1 ? (
            <h2>
              Sorry!!! you don’t have any products listed yet click on the
              <span style={{ color: "#31BDF4" }}> “Add Product” </span>tab to
              add products to your catalog. Once a product is added you can
              start sharing your shop link or product link.
            </h2>
          ) : null}

          {showMessageNoProduct ? (
            <h2>
              Sorry!!! you don’t have any products listed yet click on the
              <span style={{ color: "#31BDF4" }}> “Add Product” </span>tab to
              add products to your catalog. Once a product is added you can
              start sharing your shop link or product link.
            </h2>
          ) : null}
        </FlexContainer>
      </div>
      <RenderProducts products={dumpData} />
    </Container>
  );
}
