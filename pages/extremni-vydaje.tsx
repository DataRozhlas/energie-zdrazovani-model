import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import ActiveButton from "../components/ActiveButton";
import BarChart from "../components/BarChart";
import { usePostMessageWithHeight } from "../utils/hooks";

const buttons: string[] = [
  "Všechny domácnosti",
  "Podle příjmů",
  "Podle příjmů a dětí",
  "Podle příjmů a typu bydlení",
];

const categories: string[] = [
  "před rokem (listopad\u00A02021)",
  "letos v létě (červenec\u00A02022)",
  "kdyby nastal 200\u00A0% růst cen energií",
  "při zastropování cen energií (s\u00A0fixací)",
];

const seriesName: string = "";

const tooltipSuffix: string =
  " % domácností dá za bydlení přes dvě pětiny příjmů";

const color: string = "#dd505b";

const data: any = [
  [
    {
      title: "",
      series: [{ data: [15, 24, 48, 30], color: color, name: seriesName }],
    },
  ],
  [
    {
      title: "Domácnosti pod hranicí chudoby (<\u00A060\u00A0%\u00A0mediánu)",
      series: [{ data: [44, 54, 79, 62], color: color, name: seriesName }],
    },
    {
      title: "Nízkopříjmové domácnosti (60–100\u00A0%\u00A0mediánu)",
      series: [{ data: [12, 26, 54, 30], color: color, name: seriesName }],
    },
    {
      title: "Nadstandardně příjmové domácnosti (101–150\u00A0%\u00A0mediánu)",
      series: [{ data: [8, 12, 34, 18], color: color, name: seriesName }],
    },
    {
      title: "Vysokopříjmové domácnosti (nad 150\u00A0%\u00A0mediánu)",
      series: [{ data: [5, 10, 19, 11], color: color, name: seriesName }],
    },
  ],
  [
    {
      title: "Domácnosti s dětmi – příjem pod medián",
      series: [{ data: [20, 35, 65, 45], color: color, name: seriesName }],
    },
    {
      title: "Domácnosti s dětmi – příjem nad medián",
      series: [{ data: [4, 11, 31, 14], color: color, name: seriesName }],
    },
    {
      title: "Domácnosti bez dětí – příjem pod medián",
      series: [{ data: [28, 38, 67, 46], color: color, name: seriesName }],
    },
    {
      title: "Domácnosti bez dětí – příjem nad medián",
      series: [{ data: [4, 11, 28, 13], color: color, name: seriesName }],
    },
  ],
  [
    {
      title: "Vlastníci a družstevníci – příjem pod medián",
      series: [{ data: [9, 22, 53, 26], color: color, name: seriesName }],
    },
    {
      title: "Vlastníci a družstevníci – příjem nad medián",
      series: [{ data: [3, 6, 19, 7], color: color, name: seriesName }],
    },
    {
      title: "Nájemníci a podnájemníci – příjem pod medián",
      series: [{ data: [51, 51, 78, 58], color: color, name: seriesName }],
    },
    {
      title: "Nájemníci a podnájemníci – příjem nad medián",
      series: [{ data: [10, 17, 34, 29], color: color, name: seriesName }],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(
    "paq_extremni_vydaje"
  );

  const [activeButton, setActiveButton] = useState(0);
  const [selectedData, setSelectedData] = useState(data[activeButton]);

  useEffect(() => {
    setSelectedData(data[activeButton]);
  }, [activeButton]);

  useEffect(() => {
    postHeightMessage();
  }, [activeButton]);

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8" ref={containerRef}>
      <h1 className="text-3xl font-bold leading-7 mb-4">
        {`Kolik z nich dá za bydlení přes\u00A040\u00A0%\u00A0příjmů`}
      </h1>
      <span className="isolate inline-flex rounded-md shadow-sm mx-px sm:mx-0 mb-px">
        {buttons.map((button, index) =>
          index === activeButton ? (
            <ActiveButton
              key={index}
              text={button}
              setActiveButton={setActiveButton}
              length={buttons.length}
              index={index}
            />
          ) : (
            <Button
              key={index}
              text={button}
              setActiveButton={setActiveButton}
              length={buttons.length}
              index={index}
            />
          )
        )}
      </span>
      {selectedData.map(
        (skupina: { title: string; series: [] }, index: number) => {
          return (
            <div key={index}>
              <h2 className="text-center mt-5 mb-1 text-lg">{skupina.title}</h2>
              <BarChart
                series={skupina.series}
                ymax={70}
                categories={categories}
                tooltipSuffix={tooltipSuffix}
                legend={false}
                stacking={undefined}
              ></BarChart>
            </div>
          );
        }
      )}
      <p className="text-xs text-right">
        Zdroj dat:{" "}
        <a
          href="https://data.irozhlas.cz/zivot/extremni-vydaje/"
          target="_blank"
          rel="noreferrer"
        >
          Život k nezaplacení
        </a>{" "}
        a výpočty PAQ
      </p>
    </div>
  );
};

export default Home;
