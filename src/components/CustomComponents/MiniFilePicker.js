import React, { useState, useEffect } from "react";
import Button from "../CustomComponents/Button";
import Publish from "@material-ui/icons/AddPhotoAlternate";
import Styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import { Hidden } from "@material-ui/core";

const Container = Styled.div`
    border: ${(props) => (props.min ? "none" : "1px dashed #979FAA")};
    
    position: relative;
    over-flow:auto;
    width: ${(props) => (props.min ? "" : "100%")};
   
`;

const Img = Styled.img`
    height: 100px;
    over-flow:auto;
    display:inline-block;
    &:hover .hide {
      display: block !important;
    }
    padding:4px;
`;
const ImageContainer = Styled.div`
    height: 100px;
    over-flow:auto;
    display:inline-block;
    &:hover .hide {
      display: block !important;
    }
`;
const MiniFilePicker = (props) => {
  const [file, setFile] = React.useState([]);
  const [fileUrl, setfileUrl] = useState([]);
  const [deleteImageId, setDeleteImageId] = useState([]);

  const pickFile = (event) => {
    document.querySelector("#filepicker").click();
  };

  useEffect(() => {
    props.getFiles(file);
  }, [file]);

  useEffect(() => {
    props.getDeletedImages && props.getDeletedImages(deleteImageId);
  }, [deleteImageId]);

  let resetImageArray = () => {
    setFile([]);
    setfileUrl([]);
  };

  useEffect(() => {
    if (props.serverImage) {
      setfileUrl(props.serverImage);
    }
  }, [props.serverImage]);

  const getFile = (event) => {
    let eventFile = [...file];

    eventFile.push(event.target.files[0]);

    setFile(eventFile);

    let newUrl = URL.createObjectURL(event.target.files[0]);
    let urlData = [...fileUrl];
    let urlObject = {
      url: newUrl,
      side: "local",
      localFileIndex: file.length,
    };
    urlData.push(urlObject);
    setfileUrl(urlData);
  };
  useEffect(() => {
    if (props.clearImages === true) {
      resetImageArray();
    }
  }, [props.clearImages]);

  let handeDelete = async (item, index) => {
    if (item.side === "server") {
      let newUrls = [...fileUrl];
      newUrls.splice(index, 1);
      setfileUrl(newUrls);

      setDeleteImageId((oldArray) => [...oldArray, item.imageId]);
    } else {
      let newUrls1 = [...fileUrl];
      newUrls1.splice(index, 1);
      setfileUrl(newUrls1);
      let localFile = [...file];
      localFile.splice(item.localFileIndex, 1);
      setFile(localFile);
    }
  };

  return (
    <>
      <Hidden only={["xs", "sm"]}>
        <Container style={{ display: "flex" }}>
          <div>
            <input
              id="filepicker"
              multiple={true}
              onChange={getFile}
              type="file"
              style={{ display: "none" }}
            />
            <Button
              onClick={pickFile}
              grey
              style={{ height: "100px", width: "100px" }}
            >
              <Publish
                style={{ height: "60px", width: "70px", opacity: ".4" }}
              />
            </Button>
          </div>

          <div
            style={{
              display: props.mini ? "none" : "",
              lineHeight: "80px",
              fontSize: "20px",
              color: "#979FAA",
              paddingLeft: "10px",
              overFlow: "auto",
            }}
          >
            {/* {file ? file.name : props.label ? props.label : "Upload Product Images"} */}
            <div
              style={{
                display: "inline-block",
                overFlow: "auto",
              }}
            >
              {fileUrl.map((item, index) => {
                return (
                  <ImageContainer
                    style={{
                      marginRight: "5px",
                      position: "relative",
                      overFlow: "auto",
                    }}
                    key={index}
                  >
                    <IconButton
                      color="primary"
                      component="span"
                      className="hide"
                      size="small"
                      onClick={() => handeDelete(item, index)}
                      style={{
                        position: "absolute",
                        right: "2px",
                        top: "2px",
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                    <Img src={item.url} alt="apple" />
                  </ImageContainer>
                );
              })}
            </div>
          </div>
        </Container>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <Container
          style={{ display: fileUrl.length > 0 ? "inline-block" : "flex" }}
        >
          <div>
            <input
              id="filepicker"
              multiple={true}
              onChange={getFile}
              type="file"
              style={{ display: "none" }}
            />
            <Button
              onClick={pickFile}
              grey
              style={{ height: "100px", width: "100px" }}
            >
              <Publish
                style={{ height: "60px", width: "70px", opacity: ".4" }}
              />
            </Button>
          </div>

          <div
            style={{
              display: props.mini ? "none" : "",
              lineHeight: "80px",
              fontSize: "20px",
              color: "#979FAA",
              paddingLeft: "10px",
              overFlow: "auto",
            }}
          >
            {/* {file ? file.name : props.label ? props.label : "Upload Product Images"} */}
            <div
              style={{
                display: "inline-block",
                overFlow: "auto",
              }}
            >
              {fileUrl.map((item, index) => {
                return (
                  <ImageContainer
                    style={{
                      marginRight: "5px",
                      position: "relative",
                      overFlow: "auto",
                    }}
                    key={index}
                  >
                    <IconButton
                      color="primary"
                      component="span"
                      className="hide"
                      size="small"
                      onClick={() => handeDelete(item, index)}
                      style={{
                        position: "absolute",
                        right: "2px",
                        top: "2px",
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                    <Img src={item.url} alt="apple" />
                  </ImageContainer>
                );
              })}
            </div>
          </div>
        </Container>
      </Hidden>
    </>
  );
};

export default MiniFilePicker;
