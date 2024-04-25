"use client";
import { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

function ChartComponent({ userID, keyword = "water" }) {
  const [option, setOption] = useState(null);
  const [waterLog, setWaterLog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (waterLog.length === 0) {
      return;
    }
    // const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    // const data = [];
    // for (let i = 0; i < days.length; i++) {
    //   data.push(Math.floor(Math.random() * 200) + 100);
    // }

    const timeStamp = [];
    const data = [];

    for (let i = 0; i < waterLog.length; i++) {
      console.log(waterLog[i]);
      timeStamp.push(
        new Date(Date.parse(waterLog[i].timestamp)).toDateString()
      );
      data.push(waterLog[i].WaterLog.waterAmount);
      //console.log(new Date(Date.parse(waterLog[i].timeStamp)).toDateString());
    }

    // Set options for the chart
    const newOption = {
      title: {
        text: "Water Log over Time",
        textStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        data: timeStamp,
      },
      yAxis: {
        type: "value",
        name: "Milliliters",
        axisLabel: {
          formatter: "{value}",
        },
      },
      series: [
        {
          name: "Water Log",
          data: data,
          type: "bar",
          itemStyle: {
            color: "#6ab0e4",
          },
        },
      ],
    };

    // Set the options for the chart
    setOption(newOption);
  }, [waterLog]);

  useEffect(() => {
    const bodyToSend = { userID: userID, keyword: keyword };
    if (Object.keys(bodyToSend).length === 0) {
      return;
    }
    fetch("/api/log/getAllLogEntries", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyToSend),
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        setWaterLog([...waterLog, res.logs[0]]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userID, keyword]); // Empty dependency array ensures this code runs only once on component mount

  return (
    <div className="p-5 md:p-2 font-opensans rounded-xl">
      <h1 className="grid place-items-center text-black p-3 font-extrabold text-[1.3rem]">
        Log Analytics
      </h1>
      <div className="grid h-screen p-2 md:p-0 place-items-center min-h-fit">
        {isLoading ? (
          <>Loading...</>
        ) : (
          option && (
            <ReactEcharts
              option={option}
              className="w-[60%] md:h-full md:w-full"
              style={{ height: "400px" }}
            />
          )
        )}
      </div>
    </div>
  );
}

export default ChartComponent;
