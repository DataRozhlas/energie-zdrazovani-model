import Highcharts, { seriesType } from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChart = (props: {
  series: any;
  ymax: number;
  ymin: number;
  categories: string[];
  tooltipSuffix: string;
  legend: boolean;
  stacking: string | undefined;
}) => {
  const options = {
    title: {
      text: undefined,
    },
    series: props.series.map((serie: {}) => {
      return { ...serie, type: "line" };
    }),
    xAxis: {
      categories: props.categories,
    },
    yAxis: {
      max: props.ymax,
      min: props.ymin,
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
        stacking: props.stacking,
      },
    },
    legend: {
      enabled: props.legend,
    },
    credits: {
      enabled: false,
    },
    chart: {
      animation: false,
      height: props.series[0].data.length * 50 + 80,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
