"use client";
import { useState } from "react";
import ReactEcharts from "echarts-for-react";
function ChartComponent() {
  // 将图表初始化和按钮点击事件的代码移到 useEffect 中

  const labelRight = {
    position: "right",
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
      <div className="grid h-screen place-items-center">
        <ReactEcharts
          option={option}
          style={{ height: "400px", width: "60%" }}
        />
      </div>
    </div>
  );
}

export default ChartComponent;
