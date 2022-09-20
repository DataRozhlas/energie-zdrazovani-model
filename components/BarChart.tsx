import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChart = (props: { color: string; type: string; data: number[] }) => {
  const options = {
    title: {
      text: undefined,
    },
    series: [
      {
        data: props.data,
        color: props.color,
        type: props.type,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
