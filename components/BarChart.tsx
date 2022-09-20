import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChart = (props: {
  color: string;
  data: number[];
  ymax: number;
  categories: string[];
  seriesName: string;
  tooltipSuffix: string;
}) => {
  const options = {
    title: {
      text: undefined,
    },
    series: [
      {
        name: props.seriesName,
        data: props.data,
        color: props.color,
        type: "bar",
      },
    ],
    xAxis: {
      categories: props.categories,
    },
    yAxis: {
      max: props.ymax,
      title: {
        enabled: false,
      },
      labels: {
        format: "{value} %",
      },
    },
    plotOptions: {
      series: {
        animation: false,
        dataLabels: {
          enabled: true,
          format: "{y} %",
        },
        tooltip: {
          valueSuffix: props.tooltipSuffix,
        },
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    chart: {
      animation: false,
      height: 300,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
