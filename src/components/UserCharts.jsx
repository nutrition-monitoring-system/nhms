"use client";
import { useState } from "react";
import ReactEcharts from "echarts-for-react";
function ChartComponent() {
  // 将图表初始化和按钮点击事件的代码移到 useEffect 中

  const labelRight = {
    position: "right",
  };
  const option1 = {
    title: {
      text: "Pie Chart",
    },
    legend: {
      top: "bottom",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [50, 250],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          { value: 40, name: "rose 1" },
          { value: 38, name: "rose 2" },
          { value: 32, name: "rose 3" },
          { value: 30, name: "rose 4" },
          { value: 28, name: "rose 5" },
          { value: 26, name: "rose 6" },
          { value: 22, name: "rose 7" },
          { value: 18, name: "rose 8" },
        ],
      },
    ],
  };
  const option2 = {
    title: {
      text: "Stacked Line",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Email",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Union Ads",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ads",
        type: "line",
        stack: "Total",
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "Direct",
        type: "line",
        stack: "Total",
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "Search Engine",
        type: "line",
        stack: "Total",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };
  const option3 = {
    title: {
      text: "Bar Chart",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      top: 80,
      bottom: 30,
    },
    xAxis: {
      type: "value",
      position: "top",
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    yAxis: {
      type: "category",
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      data: [
        "ten",
        "nine",
        "eight",
        "seven",
        "six",
        "five",
        "four",
        "three",
        "two",
        "one",
      ],
    },
    series: [
      {
        name: "Cost",
        type: "bar",
        stack: "Total",
        label: {
          show: true,
          formatter: "{b}",
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
          0.18,
        ],
      },
    ],
  };
  const option4 = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };
  // 第二个参数是一个空数组，确保这些代码仅在组件挂载时执行一次
  const [option, setOption] = useState(option4);

  return (
    <div className="font-opensans rounded-xl">
      <div className="grid p-5 m-2 text-lg font-extrabold text-center">
        User Analytics
      </div>
      <div className="w-full flex justify-center items-center gap-3 p-2 text-center">
        <button onClick={() => setOption(option4)} className="tile bg-gray-100">
          Bar chart
        </button>
        <button onClick={() => setOption(option1)} className="tile bg-gray-100">
          Pie chart
        </button>
        <button onClick={() => setOption(option2)} className="tile bg-gray-100">
          Line chart
        </button>
        <button onClick={() => setOption(option3)} className="tile bg-gray-100">
          Bar chart
        </button>
      </div>
      <div className="h-screen grid place-items-center">
        <ReactEcharts
          option={option}
          style={{ height: "500px", width: "60%" }}
        />
      </div>
    </div>
  );
}

export default ChartComponent;
