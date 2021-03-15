// import React, { useState, useEffect } from "react";
// import Button from "../CustomComponents/Button";
// import Publish from "@material-ui/icons/AddPhotoAlternate";
// import Styled from "styled-components";

// const Container = Styled.div`
//     border: ${(props) => (props.min ? "none" : "1px dashed #979FAA")};
//     display: flex;
//     position: relative;
//     width: ${(props) => (props.min ? "" : "100%")};
// `;

// const ImageContainer = Styled.div`
//     height: 75px;
//     width: 75px;
//     background: #FFFFFF;
//     border-radius: 15px;
// `;
// const Img = Styled.img`
//     height: 75px;
//     width: 75px;
//     margin: auto;
// `;
// const MiniFilePicker = (props) => {
//   const [file, setFile] = React.useState([]);
//   const [fileUrl, setfileUrl] = useState([]);

//   const pickFile = (event) => {
//     document.querySelector("#filepicker").click();
//   };

//   useEffect(() => {
//     props.getFiles(file);
//   }, [file]);

//   let resetImageArray = () => {
//     setFile([]);
//     setfileUrl([]);
//   };

//   const getFile = (event) => {
//     let eventFile = [...file];

//     eventFile.push(event.target.files[0]);

//     setFile(eventFile);

//     let newUrl = URL.createObjectURL(event.target.files[0]);
//     let urlData = [...fileUrl];
//     let urlObject = {
//       url: newUrl,
//     };
//     urlData.push(urlObject);
//     setfileUrl(urlData);
//   };
//   useEffect(() => {
//     if (props.clearImages === true) {
//       resetImageArray();
//     }
//   }, [props.clearImages]);
//   return (
//     <Container>
//       <div>
//         <input
//           id="filepicker"
//           multiple={true}
//           onChange={getFile}
//           type="file"
//           style={{ display: "none" }}
//         />
//         <Button
//           onClick={pickFile}
//           grey
//           style={{ height: "80px", width: "80px" }}
//         >
//           <Publish style={{ height: "60px", width: "70px", opacity: ".4" }} />
//         </Button>
//       </div>

//       <div
//         style={{
//           display: props.mini ? "none" : "",
//           lineHeight: "80px",
//           fontSize: "20px",
//           color: "#979FAA",
//           paddingLeft: "10px",
//         }}
//       >
//         {/* {file ? file.name : props.label ? props.label : "Upload Product Images"} */}
//         <div
//           style={{
//             display: "flex",
//           }}
//         >
//           {fileUrl.map((item, index) => {
//             return (
//               <ImageContainer style={{ marginRight: "5px" }} key={index}>
//                 <Img src={item.url} alt="apple" />
//               </ImageContainer>
//             );
//           })}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default MiniFilePicker;

import React, { useState, useEffect } from "react";
import Button from "../CustomComponents/Button";
import Publish from "@material-ui/icons/AddPhotoAlternate";
import Styled from "styled-components";

const Container = Styled.div`
    border: ${(props) => (props.min ? "none" : "1px dashed #979FAA")};
    display: flex;
    position: relative;
    width: ${(props) => (props.min ? "" : "100%")};
   
`;

const ImageContainer = Styled.div`
    height: 100px;
`;
const Img = Styled.img`
    height: 100px;
    
    padding:4px;
`;
const MiniFilePicker = (props) => {
  const [file, setFile] = React.useState([]);
  const [fileUrl, setfileUrl] = useState([]);

  const pickFile = (event) => {
    document.querySelector("#filepicker").click();
  };

  useEffect(() => {
    props.getFiles(file);
  }, [file]);

  let resetImageArray = () => {
    setFile([]);
    setfileUrl([]);
  };

  const getFile = (event) => {
    let eventFile = [...file];
    console.log(event.target.files);
    eventFile.push(event.target.files[0]);

    setFile(eventFile);

    let newUrl = URL.createObjectURL(event.target.files[0]);
    let urlData = [...fileUrl];
    let urlObject = {
      url: newUrl,
    };
    urlData.push(urlObject);
    setfileUrl(urlData);
  };
  useEffect(() => {
    if (props.clearImages === true) {
      resetImageArray();
    }
  }, [props.clearImages]);
  return (
    <Container>
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
        {/* {file ? file.name : props.label ? props.label : "Upload Product Images"} */}
        <div
          style={{
            display: "flex",
          }}
        >
          {fileUrl.map((item, index) => {
            return (
              <ImageContainer style={{ marginRight: "5px" }} key={index}>
                <Img src={item.url} alt="apple" />
              </ImageContainer>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default MiniFilePicker;
