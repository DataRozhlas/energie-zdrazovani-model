import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChart = (props: { color: string; data: number[]; ymax: number }) => {
  const options = {
    title: {
      text: undefined,
    },
    series: [
      {
        data: props.data,
        color: props.color,
        type: "column",
      },
    ],
    yAxis: {
      max: props.ymax,
      title: {
        enabled: false,
      },
    },
    credits: {
      enabled: false,
    },
    chart: {
      animation: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
