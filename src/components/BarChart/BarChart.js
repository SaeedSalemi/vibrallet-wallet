

import React, { useMemo } from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'
import Bar from './components/Bar'
// const percent = [100, 75, 50, 25, 0]
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
const _BarChart = ({ data }) => {

  const data6 = useMemo(() => {
    const _data = data ? data.map((item, index) => {
      return {
        value: item.balance,
        svg: {
          fill: item.color,
        },
        label: item.symbol
      }
    }) : []
    return _data
  }, [data])

  const contentInset = { top: 5, bottom: 10 }
  const percent = [0, 25, 50, 75, 100]

  return (
    <View style={{ flexDirection: 'column', }}>

      <View style={{ flexDirection: "row", height: 140 }}>
        <YAxis
          data={percent}
          contentInset={{ bottom: 30, top: -20 }}
          style={{ height: "100%" }}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={percent.length}
          formatLabel={(value, index) => `${percent[index] === undefined ? '' : `${percent[index]}%`}`}
        />
        <View style={{ flexDirection: "column", flex: 1 }}>
          <BarChart
            // spacingInner={.2}
            spacingInner={0.3}
            spacingOuter={0.3}
            gridMin={0}
            gridMax={100}

            animate
            curve={shape.curveBasis}
            style={{ flex: 1, height: 140 }}
            data={data6}
            yAccessor={({ item }) => item.value}
            // data={_data}
            // svg={{
            //   fill: "red"
            // }}
            // strokeLinejoin: "round",
            // strokeLinecap: "round",
            // strokeWidth: 5,d3-shape
            // strokeDasharray: [14, 4],
            // stroke: 'red'
            // }}
            contentInset={contentInset}
          >
            <Grid />
          </BarChart>
          <View style={{ height: 10 }} />
          <XAxis
            // style={{ marginHorizontal: -10 }}
            data={data6}
            formatLabel={(value, index) => { return data6[index].label }}
            contentInset={{ left: 50, right: 50 }}
            // contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 10, fill: 'gray' }}
          />
        </View>
      </View>



    </View>

  )
}
export default _BarChart