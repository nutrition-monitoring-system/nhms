import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import './User_chart.css'
function ChartComponent() {
    const [myChart, setMyChart] = useState(null);
  
    // 将图表初始化和按钮点击事件的代码移到 useEffect 中
    useEffect(() => {
      const initChart = (option) => {
        if (myChart) {
          myChart.dispose();
        }
        const chart = echarts.init(document.getElementById('pie-chart'));
        chart.setOption(option);
        setMyChart(chart);
      };
      const labelRight = {
        position: 'right'
      };
      const option1 = { 
        legend: {
            top: 'bottom'
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          series: [
            {
              name: 'Nightingale Chart',
              type: 'pie',
              radius: [50, 250],
              center: ['50%', '50%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 8
              },
              data: [
                { value: 40, name: 'rose 1' },
                { value: 38, name: 'rose 2' },
                { value: 32, name: 'rose 3' },
                { value: 30, name: 'rose 4' },
                { value: 28, name: 'rose 5' },
                { value: 26, name: 'rose 6' },
                { value: 22, name: 'rose 7' },
                { value: 18, name: 'rose 8' }
              ]
            }
          ]
       };
      const option2 = { title: {
        text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ] };
      const option3 = {title: {
        text: 'Bar Chart with Negative Value'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: 80,
        bottom: 30
      },
      xAxis: {
        type: 'value',
        position: 'top',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      yAxis: {
        type: 'category',
        axisLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        data: [
          'ten',
          'nine',
          'eight',
          'seven',
          'six',
          'five',
          'four',
          'three',
          'two',
          'one'
        ]
      },
      series: [
        {
          name: 'Cost',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            formatter: '{b}'
          },
          data: [
            { value: -0.07, label: labelRight },
            { value: -0.09, label: labelRight },
            0.2,
            0.44,
            { value: -0.23, label: labelRight },
            0.08,
            { value: -0.17, label: labelRight },
            0.47,
            { value: -0.36, label: labelRight },
            0.18
          ]
        }
      ] };
  
      initChart(option1);
  
      document.getElementById('button1').addEventListener('click', () => {
        initChart(option1);
      });
  
      document.getElementById('button2').addEventListener('click', () => {
        initChart(option2);
      });
  
      document.getElementById('button3').addEventListener('click', () => {
        initChart(option3);
      });
    }, []); // 第二个参数是一个空数组，确保这些代码仅在组件挂载时执行一次
  
    return (
      <div>
        <button id="button1" className="custom-button1">pie chart</button>
        <button id="button2" className="custom-button2">line chart</button>
        <button id="button3" className="custom-button3">bar chart</button>
  
        <div id="pie-chart" className="pie-chart-box"></div>
      </div>
    );
  }
  
  export default ChartComponent;
  