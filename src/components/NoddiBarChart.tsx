import ReactECharts from 'echarts-for-react'
import { Col, Row } from 'react-bootstrap'
import * as echarts from 'echarts'

const NoddiBarChart = ({ data, legendHeader, legendSubHeader }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '7%'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.x
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data.y,
        type: 'line',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(58,77,233,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(58,77,233,0.3)'
            }
          ])
        }
      }
    ]
  }

  return (
    <>
      {data.x.length > 0 && (
        <Row>
          <Col xs={12}>
            <h3 className={'text-1100 text-nowrap'}>{legendHeader}</h3>
            <p className={'text-700 mb-md-7 mb-0'}>{legendSubHeader}</p>
          </Col>
          <Col xs={12}>
            <ReactECharts option={option} />
          </Col>
        </Row>
      )}
    </>
  )
}

export default NoddiBarChart
