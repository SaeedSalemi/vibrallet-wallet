import React from 'react'
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

const TradingViewWidget = (props) => {

  const html = `

    <!DOCTYPE html>
        <html>
        <head>
        <title>Page Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <style>
        *{
            padding:0;
            margin:0;
            height : 100%;
        }
        </style>
        </head>
        <body style='height:100%'>

        <!-- TradingView Widget BEGIN -->
        <div class="tradingview-widget-container" style='height:100%'>

        <div id="tradingview_815e8" style='height:100%'></div>

        
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        <script type="text/javascript">
        new TradingView.widget(
        {
        "autosize" : true,
        "symbol": "BINANCE:${props.symbol}",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": false,
        "container_id": "tradingview_815e8"
        }
        );
        </script>
        </div>
        <!-- TradingView Widget END -->
        </body>
    </html>
    `

  return (
    <WebView
      javaScriptEnabled
      style={{ width: "100%", height: 400 }}
      source={{ html }}
    />
  )

}


TradingViewWidget.propTypes = {
  symbol: PropTypes.string,
}

TradingViewWidget.defaultProps = {
  symbol: 'ETHUSDT',
}

export default TradingViewWidget;