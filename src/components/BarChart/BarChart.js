import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'
import Bar from './components/Bar'
// const percent = [100, 75, 50, 25, 0]
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'

const _BarChart = ({ data }) => {
  const fill = 'rgb(134, 65, 244)'
  const _data = [0, 0, 0]
  const contentInset = { top: 5, bottom: 10 }
  const x = ['ETH', 'BTC', 'BNB']
  const percent = [0, 25, 50, 75, 100]

  return (
    <View style={{ flexDirection: 'column' }}>

      <View style={{ flexDirection: "row", height: 110 }}>
        <YAxis
          data={percent}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={percent.length}
          // formatLabel={(value, index) => `${percent[index] === undefined ? '' : percent[index]}`}
          formatLabel={(value, index) => `${percent[index] === undefined ? '' : `${percent[index]}%`}`}
        />
        <BarChart
          // spacingInner={.8}
          style={{ flex: 1, marginLeft: 16 }} data={_data} svg={{ fill }} contentInset={contentInset}>
          <Grid />
        </BarChart>
      </View>

      <XAxis
        data={x}
        contentInset={contentInset}
        svg={{
          fill: 'grey',
          fontSize: 10,
        }}
        style={{ height: 20, paddingTop: 5, }}
        // formatLabel={(value, index) => value}
        formatLabel={(value, index) => x[index]}
        numberOfTicks={3}
      // formatLabel={(value) => `${value}`}
      />
    </View>

  )
}
export default _BarChart




// export default function BarChart({ data }) {

//   const fill = 'rgb(134, 65, 244)'
//   const faker = [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80]

//   return (
//     <View
//       style={{
//         ...globalStyles.flex.row,
//         paddingHorizontal: 8,
//       }}
//     >
//       <A style={{ height: 110 }} data={faker} svg={{ fill }} >
//         <Grid />
//       </A>
//     </View>
//   )

// }
// 
// export default function BarChart({ data }) {
//   // 
//   const faker = [
//     {
//       series: 0, // item.balance TODO: handle 0
//       title: 'BTC',
//       value: '77.56%',
//       color: "#fff",
//       radius: 100,
//     },
//     {
//       // 
//       series: 0, // item.balance TODO: handle 0
//       value: '72.56%',
//       color: "#f2c4",
//       radius: 100,
//       title: 'ETH',
//     },
//     {
//       // 
//       color: "#aaa",
//       series: 0, // item.balance TODO: handle 0
//       value: '72.56%',
//       radius: 100,
//       title: 'BNB',
//     },
//   ]
//   return (
//     <View
//       style={{
//         ...globalStyles.flex.row,
//         paddingHorizontal: 8,
//       }}
//     >
//       <View style={{ alignItems: 'center' }}>
//         {percent.map(item => (
//           <AppText
//             key={item}
//             typo="dot"
//             color="text3"
//             style={{ height: 20, marginVertical: 1 }}
//           >
//             {item}
//           </AppText>
//         ))}
//       </View>
//       <View
//         style={{
//           margin: 8,
//           ...globalStyles.flex.row,
//           ...globalStyles.flex.between,
//           flex: 1,
//         }}
//       >
//         {faker.map((item, index) => (
//           <Bar
//             key={index}
//             title={item.title}
//             color={item.value === 0 ? '#fff' : item.color}
//             value={0}
//           />
//         ))}
//       </View>
//     </View>
//   )
// }
//