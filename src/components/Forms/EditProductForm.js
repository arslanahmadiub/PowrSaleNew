import React, { useState, useEffect, useRef } from "react";
import Styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Input from "../CustomComponents/Input";
import TextArea from "../CustomComponents/TextArea";
import Button from "../CustomComponents/Button";
import MiniFilePicker from "../CustomComponents/MiniFilePicker";
import Select from "../CustomComponents/Select";
import FlexContainer from "../CustomComponents/FlexContainer";
import { imageEndPoint } from "../../config.json";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Switch } from "antd";
import { DataContext } from "../../contexts/DataContext";
import { productDeliveryTerm } from "../../services/shopServices";
import { editProfileDetail } from "../../services/shopServices";
import { editProduct } from "../../services/shopServices";
import { deleteProductImage } from "../../services/shopServices";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeliveryTerms from "./DeliveryTerms";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import { selectedTabIndex } from "../../action/shopAction";
import { setDescriptionModel } from "../../action/shopAction";

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

export default function EditProductForm(props) {
  const [clearImageData, setClearImageData] = useState(false);
  const shopIds = useSelector((state) => state.shopPreview.shopIdCollections);
  const history = useHistory();

  const classes = useStyles();

  let dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  const productId = useSelector((state) => state.shopPreview.productId);

  const [inputList, setInputList] = useState([
    {
      city: "",
      price: "",
    },
  ]);

  const [imagesData, setImagesData] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [firstFunction, setFirstFunction] = useState(true);
  const [serverImageList, setServerImageList] = useState([]);
  const [serviceFee, setServiceFee] = useState(0);
  const selectedShopId = useSelector(
    (state) => state.shopPreview.selectedShopId
  );

  let [data, setData] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productCountry: "",

    instaGram: false,
    facebook: false,
    twitter: false,
  });

  let getProduct = async (pId) => {
    setFirstFunction(false);
    try {
      setLoading(true);
      let { data } = await editProfileDetail(pId);

      setLoading(false);
      if (data.Success) {
        setData({
          productName: data.Details[0].product_name,
          productPrice: data.Details[0].price,
          productDescription: data.Details[0].description,
          productCountry: data.Details[0].delivery_terms[0].delivery_country,
          instaGram: false,
          facebook: false,
          twitter: false,
        });

        let value = parseFloat(data.Details[0].price) * 0.05;
        setServiceFee(value.toFixed(3));

        let inputLists = [];

        data.Details[0].delivery_terms.map((item, index) => {
          let data = {
            city: item.delivery_location,
            price: item.delivery_price,
          };
          inputLists.push(data);
        });
        setInputList(inputLists);

        let imageList = [];
        data.Details[0].images.map((item, index) => {
          let urlObject = {
            url: imageEndPoint + item.image,
            side: "server",
            imageId: item.image,
          };
          imageList.push(urlObject);
        });

        setServerImageList(imageList);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (firstFunction) {
      getProduct(productId);
    }
  }, []);

  const { countryList } = React.useContext(DataContext);

  let {
    productName,
    productPrice,
    productDescription,
    productCountry,

    instaGram,
    facebook,
    twitter,
  } = data;

  let onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.name === "productPrice") {
      let value = parseFloat(e.target.value) * 0.05;
      setServiceFee(value.toFixed(3));
    }
  };

  const emailToast = () => {
    toast.success("Product Update!", {
      position: "top-right",
      autoClose: 5000,
      draggable: false,
    });
  };

  const [error, setError] = useState(null);

  let userToken = localStorage.getItem("token");

  let clearForm = () => {
    setData({
      productName: "",
      productPrice: "",
      productDescription: "",
      productCountry: "",
      productCity: "",
      productCurrency: "",
      instaGram: false,
      facebook: false,
      twitter: false,
    });
    setClearImageData(true);

    setTimeout(() => {
      setClearImageData(false);
    }, 3000);

    setInputList([
      {
        city: "",
        price: "",
      },
    ]);
  };

  const updateProductFunction = async (event) => {
    event.preventDefault();
    setError(null);
    let form_data = new FormData();

    await form_data.set("product_name", productName);
    await form_data.set("description", productDescription);
    await form_data.set("price", productPrice);
    if (imagesData) {
      imagesData.forEach((item, index) => {
        form_data.append(index, item);
      });
    }
    let newDeliveryTerm = [];
    inputList.map((item, index) => {
      let newData = {
        delivery_country: productCountry,
        delivery_location: item.city,
        delivery_price: item.price,
      };
      if (newData.delivery_location && newData.delivery_price) {
        newDeliveryTerm.push(newData);
      }
    });

    if (productName.length < 1) {
      setError("Enter product name..");
    } else if (productName.length > 30) {
      setError("Maximum of 30 characters allowed in product name...");
    } else if (productPrice.length < 1) {
      setError("Enter product price..");
    } else if (productPrice < 1) {
      setError("Price must be greater than 0... ");
    } else if (productPrice.length > 8) {
      setError("Maximum of 8 characters allowed in product price...");
    } else if (productDescription.length < 1) {
      setError("Enter product description...");
    } else if (productDescription.length > 300) {
      setError("Maximum of 300 characters allowed in product description...");
    } else if (productCountry.length < 1) {
      setError("Select product country...");
    } else if (inputList[0].city.length < 1) {
      setError("Enter product city...");
    } else if (inputList[0].price.length < 1) {
      setError("Enter product delivery price...");
    } else {
      try {
        setLoading(true);
        let { data } = await editProduct(productId, form_data, userToken);

        if (data.Success) {
          let finalData = {
            product_id: productId,
            delivery_terms: newDeliveryTerm,
          };
          try {
            let result = await productDeliveryTerm(finalData, userToken);

            if (deletedImages && deletedImages.length > 0) {
              deletedImages.forEach((element) => {
                try {
                  deleteProductImage(element);
                } catch (error) {}
              });
            }

            emailToast();
            clearForm();
            setLoading(false);
            dispatch(selectedTabIndex(1));

            setTimeout(() => {
              history.push("/shopPreview");
            }, 1000);
          } catch (ex) {
            setLoading(false);

            setError(" Some thing went wrong or server error...");

            setTimeout(() => {
              setError(null);
            }, 3000);
          }
        }
      } catch (error) {
        setError(" Some thing went wrong or server error...");
        setLoading(false);

        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
  };

  let siteAddress = window.location.href;

  let finalUrl =
    siteAddress.slice(0, siteAddress.lastIndexOf("/") + 1) +
    "shop/" +
    selectedShopId;

  let getImages = (value) => {
    setImagesData(value);
  };
  let deleteImageIds = (value) => {
    setDeletedImages(value);
  };
  useEffect(() => {
    getImages();
  }, [props.getFiles]);
  useEffect(() => {
    deleteImageIds();
  }, [props.getDeletedImages]);

  let onHandelChange = (e, i) => {
    let { name, value } = e.target;
    let list = [...inputList];
    list[i][name] = value;
    setInputList(list);
  };

  let addInput = () => {
    setInputList([
      ...inputList,
      {
        city: "",
        price: "",
      },
    ]);
  };

  let removeInput = (index) => {
    let list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  useEffect(() => {
    if (facebook) {
      facebookClick();
    }
  }, [facebook]);

  useEffect(() => {
    if (twitter) {
      twitterClick();
    }
  }, [twitter]);

  let shareAbleData =
    "Product Name = " +
    productName +
    "\n" +
    "Product Price = " +
    productPrice +
    "\n" +
    "Product Description = " +
    productDescription;

  let facebookClick = () => {
    document.getElementById("facebookShare").click();
  };
  let twitterClick = () => {
    document.getElementById("twitterShare").click();
  };

  let handelSharing = () => {};

  let ToggleFacebook = (e) => {
    setData({ ...data, facebook: e });
  };
  let ToggleTwitter = (e) => {
    setData({ ...data, twitter: e });
  };

  return (
    <>
      {!productId ? (
        <Container>
          <h2>
            Sorry!!! you don’t have any product selected. Go back or click on
            cancel button and click on edit product...
          </h2>
        </Container>
      ) : (
        <div>
          <div
            style={{ paddingBottom: "60px", borderBottom: "0.5 solid grey" }}
          >
            <Grid container direction="row" spacing={4}>
              <Grid item xs={12}>
                {error && (
                  <Alert variant="filled" severity="error">
                    {error}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={12}>
                <MiniFilePicker
                  getFiles={(value) => getImages(value)}
                  clearImages={clearImageData}
                  serverImage={serverImageList}
                  getDeletedImages={(value) => deleteImageIds(value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3} direction="row">
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={2} direction="column">
                      <Grid item xs={12}>
                        <Input
                          placeholder="Enter product name"
                          label="Name of product"
                          required
                          name="productName"
                          onChange={onChange}
                          value={productName}
                        />
                      </Grid>

                      <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                      </Backdrop>

                      <Grid item xs={12}>
                        <Input
                          placeholder="Price"
                          label="Price"
                          required
                          type="number"
                          name="productPrice"
                          onChange={onChange}
                          value={productPrice}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextArea
                      placeholder="Enter description"
                      label="Description"
                      rows={5}
                      required
                      name="productDescription"
                      onChange={onChange}
                      value={productDescription}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <h4>Delivery Terms</h4>
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  placeholder="Select country"
                  list={countryList}
                  label="Country"
                  rows={5}
                  required
                  name="productCountry"
                  onChange={onChange}
                  value={productCountry}
                />
              </Grid>
              <Grid item xs={12} md={8}></Grid>

              {inputList.map((item, index) => {
                return (
                  <DeliveryTerms
                    handelChange={(e) => onHandelChange(e, index)}
                    key={index}
                    values={item}
                    index={index}
                    add={addInput}
                    remove={() => {
                      removeInput(index);
                    }}
                    lastIndex={inputList.length - 1}
                  />
                );
              })}
              <Grid item xs={12}>
                <FlexContainer>
                  <div>Note: Powrsale service charge is 5%</div>
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      marginRight: "2%",
                      marginLeft: "2%",
                      marginTop: "-0.5%",
                    }}
                  >
                    GHS {isNaN(serviceFee) ? "0" : serviceFee}
                  </div>
                </FlexContainer>
              </Grid>

              <Grid item xs={12}>
                <hr />

                <p>Also share on social media</p>

                <FlexContainer>
                  <span>Facebook</span>
                  <FacebookShareButton
                    quote={shareAbleData}
                    url={finalUrl}
                    onClick={handelSharing}
                  >
                    <button
                      id="facebookShare"
                      onClick={facebookClick}
                      style={{ display: "none" }}
                    >
                      Facebook Share
                    </button>
                  </FacebookShareButton>
                  <Switch size="small" onChange={ToggleFacebook} />
                </FlexContainer>

                <FlexContainer>
                  <span>Twitter</span>

                  <TwitterShareButton
                    title="Here is description of Product"
                    via={shareAbleData}
                    url={finalUrl}
                  >
                    <button
                      id="twitterShare"
                      onClick={twitterClick}
                      style={{ display: "none" }}
                    >
                      Twitter Share
                    </button>
                  </TwitterShareButton>
                  <Switch size="small" onChange={ToggleTwitter} />
                </FlexContainer>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Button onClick={updateProductFunction}>Update Product</Button>
              </Grid>
            </Grid>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
