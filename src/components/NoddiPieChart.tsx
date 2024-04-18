import { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ReactECharts from 'echarts-for-react'

// The palette of Echarts
const CHART_COLORS = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']

const NoddiPieChart = ({ dataList, seriesName, legendHeader, legendSubHeader }) => {
  const legendsWrapperRef = useRef(null)
  const [legendsWrapperHeight, setLegendsWrapperHeight] = useState(0)

  const [seriesData, setSeriesData] = useState([])
  const [colors, setColors] = useState([])

  useEffect(() => {
    if (legendsWrapperRef.current) {
      setLegendsWrapperHeight(legendsWrapperRef.current.clientHeight)
    }
  }, [legendsWrapperRef])

  const setData = () => {
    const counter = {}
    dataList.forEach(function (obj) {
      counter[obj] = (counter[obj] || 0) + 1
    })

    const data = []
    for (const [key, value] of Object.entries(counter)) {
      data.push({
        name: key,
        value: value
      })
    }
    data.sort((a, b) => b.value - a.value)
    setSeriesData(data)

    const colors = []
    while (colors.length < data.length) {
      colors.push(...CHART_COLORS)
    }
    setColors(colors)
  }

  useEffect(() => {
    setData()
  }, [])

  const option = {
    color: colors,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    responsive: true,
    maintainAspectRatio: false,
    series: [
      {
        name: seriesName,
        type: 'pie',
        radius: ['48%', '90%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
          formatter: '{x|{d}%} \n {y|{b}}',
          rich: {
            x: {
              fontSize: 31.25,
              fontWeight: 800,
              color: '#525b75',
              padding: [0, 0, 5, 15]
            },
            y: {
              fontSize: 12.8,
              color: '#525b75',
              fontWeight: 600
            }
          }
        },
        emphasis: {
          label: {
            show: true
          }
        },
        labelLine: {
          show: false
        },
        data: seriesData
      }
    ],
    grid: {
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      containLabel: false
    }
  }

  const LegendValue = ({ text, value, color }) => {
    return (
      <div className={'d-flex align-items-center mb-1'}>
        <span className={'d-inline-block bullet-item me-2'} style={{ backgroundColor: color }}></span>
        <p className={'mb-0 fw-semi-bold text-900 lh-sm flex-1'}>{text}</p>
        <h5 className={'mb-0 text-900'}>{value}</h5>
      </div>
    )
  }

  return (
    <>
      {seriesData && seriesData.length > 0 && (
        <Row className={'-3 mb-3'}>
          <Col xs={12} md={6}>
            <h3 className={'text-1100 text-nowrap'}>{legendHeader}</h3>
            <p className={'text-700 mb-md-7'}>{legendSubHeader}</p>
            <div className={'d-flex align-items-center justify-content-between'}>
              <p className={'mb-0 fw-bold'}>{seriesName}</p>
              <p
                className={'mb-0 fs--1'}
                style={{
                  paddingRight: legendsWrapperHeight === 165 ? '15px' : '0'
                }}
              >
                Total count <span className={'fw-bold'}>{seriesData.map((item) => item.value).reduce((prev, next) => prev + next)}</span>
              </p>
            </div>
            <hr
              className={'bg-200 mb-2 mt-2'}
              style={{
                width: legendsWrapperHeight === 165 ? 'calc(100% + 15px)' : '100%'
              }}
            />

            <div ref={(el) => (legendsWrapperRef.current = el)} className={'pie-chart-legends-wrapper'}>
              {seriesData.map((value, index) => {
                return <LegendValue key={index} text={value.name} value={value.value} color={colors[index]} />
              })}
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className={'position-relative mb-sm-4 mb-xl-0'}>
              <ReactECharts option={option} className={'pie-chart'} />
            </div>
          </Col>
        </Row>
      )}
    </>
  )
}

export default NoddiPieChart
