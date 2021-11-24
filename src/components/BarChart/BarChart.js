

import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'
import Bar from './components/Bar'
// const percent = [100, 75, 50, 25, 0]
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
// import {Gradient} from "@/scree"
const _BarChart = ({ data }) => {
  const fill = 'rgb(134, 65, 244)'
  const _data = [10, 50, 10, 5, 10]
  const contentInset = { top: 5, bottom: 10 }
  const x = ['ETH', 'BTC', 'BNB', "mm", "dd"]
  const percent = [0, 25, 50, 75, 100]

  return (
    <View style={{ flexDirection: 'column', }}>

      <View style={{ flexDirection: "row", height: 140, }}>
        <YAxis
          data={percent}
          contentInset={{ bottom: 30, top: -20 }}
          style={{ height: "100%", backgourndColor: "red" }}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={percent.length}
          // formatLabel={(value, index) => `${percent[index] === undefined ? '' : percent[index]}`}
          formatLabel={(value, index) => `${percent[index] === undefined ? '' : `${percent[index]}%`}`}
        />
        <View style={{ flexDirection: "column", flex: 1 }}>
          <BarChart
            // spacingInner={.2}
            spacingInner={0.4}
            spacingOuter={0.1}
            // gridMin={-100}
            // gridMax={120}

            animate
            curve={shape.curveNatural}

            style={{ flex: 1, height: 140 }} data={_data} svg={{
              fill
              // strokeLinejoin: "round",
              // strokeLinecap: "round",
              // strokeWidth: 5,d3-shape
              // strokeDasharray: [14, 4],
              // stroke: 'red'
            }} contentInset={contentInset}>
            <Grid />
          </BarChart>
          <View style={{ height: 10 }} />
          <XAxis
            // style={{ marginHorizontal: -10 }}
            data={x}
            formatLabel={(value, index) => x[index]}
            contentInset={{ left: 20, right: 20 }}
            // contentInset={contentInset}
            svg={{ fontSize: 10, fill: 'gray' }}
          />
        </View>
      </View>



    </View>

  )
}
export default _BarChart