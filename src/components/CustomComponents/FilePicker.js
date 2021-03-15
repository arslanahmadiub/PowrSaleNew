import React, { useEffect } from "react";
import Button from "../CustomComponents/Button";
import Publish from "@material-ui/icons/AddPhotoAlternate";
import Styled from "styled-components";
import { useSelector } from "react-redux";
import { logoImage } from "../../action/fileSaveAction";
import { logoImageFile } from "../../action/fileSaveAction";
import { clearFilePicker } from "../../action/shopAction";
import { useDispatch } from "react-redux";

const Container = Styled.div`
    border: ${(props) => (props.min ? "none" : "1px dashed #979FAA")};
    display: flex;
    position: relative;
    width: ${(props) => (props.min ? "" : "100%")};
`;

const FilePicker = (props) => {
  const dispatch = useDispatch();
  const filePickerData = useSelector((state) => state.shopPreview.filePicker);
  const [file, setFile] = React.useState(null);
  useEffect(() => {
    if (props.cleanFile) {
      setFile(null);
    }
  }, [props.cleanFile]);

  const pickFile = (event) => {
    document.querySelector("#filepicker").click();
  };
  useEffect(() => {
    if (filePickerData) {
      clearFile();
    }
  }, [filePickerData]);
  const getFile = (event) => {
    setFile(event.target.files[0]);
    let newUrl = URL.createObjectURL(event.target.files[0]);
    dispatch(logoImage(newUrl));
    dispatch(logoImageFile(event.target.files[0]));
  };

  let clearFile = () => {
    setFile(null);
    dispatch(clearFilePicker(false));
  };

  return (
    <Container>
      <div>
        <input
          id="filepicker"
          multiple={props.multiple ? true : false}
          onChange={getFile}
          type="file"
          style={{ display: "none" }}
        />
        <Button
          onClick={pickFile}
          grey
          style={{ height: "80px", width: "80px" }}
        >
          <Publish style={{ height: "60px", width: "70px", opacity: ".4" }} />
        </Button>
      </div>

      <div
        style={{
          display: props.mini ? "none" : "",
          lineHeight: "80px",
          fontSize: "20px",
          color: "#979FAA",
          paddingLeft: "10px",
        }}
      >
        {file ? file.name : props.label ? props.label : "Upload a logo"}
      </div>
    </Container>
  );
};

export default FilePicker;
