import React from 'react'
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

const MarketWebView = (props) => {
  
  return (
    <WebView
      style={{ width: "100%" }}
      source={{ uri: props.cmcUrl }}
    />
  )

}


MarketWebView.propTypes = {
  name: PropTypes.string,
}

MarketWebView.defaultProps = {
  name: 'plutonium',
}

export default MarketWebView;