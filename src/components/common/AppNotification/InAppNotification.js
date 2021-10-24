import React, { useContext } from 'react';
import FlashMessage from 'react-native-flash-message';
import { Context } from '../classes/Provider'

const InAppNotificaiton = (props) => {
  const { is_rtl } = useContext(Context)
  const align = is_rtl ? "right" : "left"
  const paddright = is_rtl ? 20 : 0
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
      style={{ flexDirection: is_rtl ? 'row-reverse' : "row", elevation: 5 }}
      floating={true}
    />
  );
};

export default InAppNotificaiton