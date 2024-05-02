"use client";
import { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

function ChartComponent({ userID, keyword = "water" }) {
  /* This component currently takes in the water keyword and produces a graph of logs. */
  const [option, setOption] = useState(null);
  const [waterLog, setWaterLog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /* This checks if water log is empty or not.  */
    if (waterLog.length === 0) {
      return;
    }
    const timeStamp = [];
    const data = [];

    // eslint-disable-next-line no-undef
    const loggedDates = {};
    // console.log(loggedDates);
    /* Logged dates should be an object of the date, and the total ml. */

    for (let i = 0; i < waterLog.length; i++) {
      /* Parse each timestamp */
      let timestamp = new Date(Date.parse(waterLog[i].timestamp));
      let dateTime = timestamp.toDateString();
      let amount = waterLog[i].WaterLog.waterAmount;
      if (timestamp.toDateString() in loggedDates) {
        /* We know that an entry has already been added. */
        loggedDates[dateTime] += amount;
      } else {
        /* New entry so: */
        // console.log(timestamp.toDateString(), waterLog[i].WaterLog.waterAmount)
        loggedDates[dateTime] = amount;
      }
      let formattedTimestamp = `${timestamp.toDateString()} ${timestamp.toLocaleTimeString()}`;

      // timeStamp.push(formattedTimestamp);
      /* Add each water log to the graph */
      // data.push(waterLog[i].WaterLog.waterAmount);
    }
    console.log(loggedDates);
    // Object.keys(loggedDates).foreach((date) => {
    //   console.log(date)
    // });
    for (let [date, amount] of Object.entries(loggedDates)) {
      timeStamp.push(date);
      data.push(amount);
    }

    // Set options for the chart

    /* The water should be the total amount of water for a date, per the time. */
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
    if (userID === null || keyword === null) {
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
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setWaterLog([...res.logs]);
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
              className="w-[60%] md:h-full md:w-full min-h-[400px]"
            />
          )
        )}
      </div>
    </div>
  );
}

export default ChartComponent;
