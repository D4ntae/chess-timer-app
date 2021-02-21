import React from "react";

import Colors from "../constants/Colors";

const IconButton = (props) => {
  let IconGroup = props.iconGroup;
  return (
    <IconGroup
      name={props.iconName}
      onPress={props.onPress}
      size={36}
      color={props.color ? props.color : Colors.primary}
    />
  );
};

export default IconButton;
