import React, { useRef, useEffect } from "react";
import RightSideBar from "./RightSideBar/RightSideBar";
import { Dialog, Grid, DialogTitle, Drawer, Hidden } from "@material-ui/core";
import Styled from "styled-components";
import { ArrowBack, Close, EventNote, Menu } from "@material-ui/icons";
import Button from "../../CustomComponents/Button";
import LeftSideBar from "./LeftSideBar/LeftSideBar";
import { AuthContext } from "../../../contexts/AuthContext";
import { RightSideBarContext } from "../../../contexts/RightSideBarContext";
import SideBarToggle from "../../CustomComponents/SideBarToggle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { graphCall } from "../../../action/dashboardAction";
import { useDispatch, useSelector } from "react-redux";

const DrawerContainer = Styled.div`
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar {
        display: none;
    };
    overflow-x: hidden;
    overflow-y: scroll;
    width:250px;
`;

const CloseDrawer = Styled(Close)`
position:absolute;
right: 15px;
top: 30px;
cursor: pointer;
`;

const FlexContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    position:relative;
    margin: 30px 0px;
    @media (max-width: 960px){
        margin: 10px 0px;
    }
`;

const ButtonContainer = Styled.div`
    width: 40px;
    heigth: 30px;
    padding: 0;
    display: flex; 
    justify-content: left;
    margin: 0 5px 0 0;
`;

const Title = Styled.div`
    font-size: 16px;
    font-weight: 500;
    margin: 0 0 0 0px;
    line-height: 51px;
`;

const Home = (props) => {
  const [drawerOpen, toggleDrawerOpen] = React.useState(false);

  const [modal, setModal] = React.useState(false);
  const dispatch = useDispatch();
  let proRef = useRef();
  const closeDialog = useSelector((state) => state.auth.profileDialog);
  const closeDrawer = useSelector((state) => state.dashboard.closeSide);
  const profile = React.useContext(AuthContext);
  const { showRightSideBar, toggleRightSideBar } = React.useContext(
    RightSideBarContext
  );

  useEffect(() => {
    toggleDrawerOpen(false);
  }, [closeDrawer]);

  useEffect(() => {
    if (closeDialog) {
      setModal(false);
    }
  }, [closeDialog]);

  let handelRightSideBar = () => {
    toggleRightSideBar(true);
    dispatch(graphCall());
  };

  const toggleModal = (event) => {
    setModal(!modal);
  };
  const drawer = (
    <div
      style={{ position: "relative", height: "100vh", padding: "60px 15px" }}
    >
      <LeftSideBar />
    </div>
  );

  return (
    <>
      <Grid container direction="row" ref={proRef}>
        {/* MOBILE TEMPORARY SIDEBAR */}
        <Drawer
          //container={container}
          variant="temporary"
          anchor={"left"}
          open={drawerOpen}
          onClose={() => toggleDrawerOpen(!drawerOpen)}
          // classes={{
          //     paper: classes.drawerPaper,
          // }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <DrawerContainer
            onClick={(event) => {
              event.stopPropagation();
              //toggleDrawerOpen(!drawerOpen)
            }}
          >
            {/* <CloseDrawer /> */}
            {drawer}
          </DrawerContainer>
        </Drawer>

        {/* THE LEFT SIDE BAR */}
        <Hidden smDown>
          <Grid item md={2} style={{ background: "#fff" }}>
            {drawer}
          </Grid>
        </Hidden>
        {/* THE MAIN CONTENT */}
        <Grid
          item
          xs={12}
          md={showRightSideBar ? 7 : 10}
          style={{ padding: "20px", background: "#F5F8FD" }}
        >
          {/*    MOBILE TOP ROW */}
          <Hidden mdUp>
            <FlexContainer>
              <FlexContainer>
                <ButtonContainer onClick={() => toggleDrawerOpen(!drawerOpen)}>
                  <Button>
                    <Menu />
                  </Button>
                </ButtonContainer>
              </FlexContainer>
              <FlexContainer>
                <ButtonContainer onClick={toggleModal}>
                  <div
                    style={{
                      position: "fixed",
                      right: "-25px",
                      top: "6vh",
                    }}
                  >
                    <SideBarToggle />
                  </div>
                </ButtonContainer>
              </FlexContainer>
            </FlexContainer>
          </Hidden>

          {props.children}
        </Grid>
        <Hidden smDown>
          <div
            onClick={handelRightSideBar}
            style={{
              position: "fixed",
              right: "-25px",
              top: "10vh",
            }}
          >
            <SideBarToggle />
          </div>
        </Hidden>
        <Dialog open={modal} fullScreen fullWidth onClose={toggleModal}>
          <DialogTitle>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
              }}
            >
              <ArrowBack onClick={toggleModal} />

              <Title style={{ marginLeft: "5%" }}>Profile</Title>
            </div>
          </DialogTitle>
          <RightSideBar />
        </Dialog>

        {/* THE RIGHT HAND MESSAGE AND PROFILE BAR */}

        <Hidden smDown>
          <Grid
            item
            md={showRightSideBar === true ? 3 : false}
            style={{
              display: showRightSideBar ? "" : "none",
            }}
          >
            <RightSideBar />
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};

export default Home;
