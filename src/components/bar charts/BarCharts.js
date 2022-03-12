import React, { PureComponent } from "react";
import "./BarCharts.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";

export default function BarCharts({
  responseData,
  newSearch,
  units,
  measurement,
}) {
  const data = [
    {
      name: "Carbs",
      amount:
        responseData.totalNutrients.CHOCDF.quantity.toFixed(1) +
        responseData.totalNutrients.CHOCDF.unit,

      percent: responseData.totalDaily.CHOCDF.quantity.toFixed(2),
    },
    {
      name: "Protein",

      amount:
        responseData.totalNutrients.PROCNT.quantity.toFixed(1) +
        responseData.totalNutrients.PROCNT.unit,

      percent: responseData.totalDaily.PROCNT.quantity.toFixed(2),
    },
    {
      name: "Fat",
      amount:
        responseData.totalNutrients.FAT.quantity.toFixed(1) +
        responseData.totalNutrients.FAT.unit,

      percent: responseData.totalDaily.FAT.quantity.toFixed(2),
    },
  ];
  data.map((item) => {
    if (item.percent > 100) {
      item.percent = 100;
    }
    return item;
  });
  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;

    const fireOffset = value.toString().length < 5;
    const offset = fireOffset ? -40 : 5;
    return (
      <text
        x={x + width - offset}
        y={y + height - 5}
        fill={fireOffset ? "#285A64" : "black"}
        fontSize={"20"}
        textAnchor="end"
      >
        {value}
      </text>
    );
  };
  const toPercent = (decimal, fixed = 0) => `${decimal.toFixed(fixed) / 100}%`;

  return (
    <div className="chart-container">
      <p className="calories-label">{` ${responseData.calories} calories`}</p>
      {/* <p>{`${responseData.totalWeight}${units} `}</p> */}
      <BarChart
        width={580}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={60}
        className="bar-labels"
      >
        <XAxis
          dataKey="name"
          scale="point"
          padding={{ left: 50, right: 50 }}
          tick={{ fontSize: 25 }}
        />

        <YAxis
          className="label"
          domain={[0, 100]}
          label={{
            value: "RDI%",
            angle: -90,
            position: "left",
            fontSize: "170%",
          }}
          tick={{ fontSize: 20 }}
          tickSize="15"
          maxBarSize={100}
        ></YAxis>

        {/* <Legend /> */}
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="percent"
          position="top"
          fill="#8884d8"
          background={{ fill: "#eee" }}
          className="bar-labels"
        >
          <LabelList
            dataKey="amount"
            position="center"
            angle="270"
            fontSize="120%"
            content={renderCustomizedLabel}
          />
        </Bar>
      </BarChart>
      <p>RDI% is the recommended daily intake based on a 2000 calorie diet.</p>
    </div>
  );
}
