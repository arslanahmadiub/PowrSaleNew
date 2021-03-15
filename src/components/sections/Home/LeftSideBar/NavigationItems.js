import React from "react";
import NavItem from "./NavItem";

const NavigationItems = (props) => {
  const items = props.items;
  return items ? (
    <div>
      {items?.map((item) => {
        return <NavItem key={item.text} text={item.text} icon={item.icon} />;
      })}
    </div>
  ) : (
    <></>
  );
};

export default NavigationItems;
