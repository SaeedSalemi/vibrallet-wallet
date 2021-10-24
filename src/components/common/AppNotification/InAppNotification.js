import React, { useContext } from 'react';
import FlashMessage from 'react-native-flash-message';

const InAppNotificaiton = (props) => {
  const align = "left"
  // const align = is_rtl ? "right" : "left"
  const paddright = 0
  return (
    <FlashMessage
      titleStyle={{
        textAlign: align,
        paddingRight: paddright,

        textAlign: "left",
        paddingTop: 5,
        fontSize: 14
      }}
      textStyle={{
        textAlign: align, paddingRight: paddright,
        textAlign: "left",
        fontSize: 12

      }}
      style={{ flexDirection: "row", elevation: 5 }}
      floating={true}
    />
  );
};

export default InAppNotificaiton