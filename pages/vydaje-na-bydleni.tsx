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

const seriesName: string = "za bydlení utratí";

const tooltipSuffix: string = "% z příjmů";

const color: string = "#673349";

const data: any = [
  [
    {
      title: "",
      series: [{ data: [23, 29, 43, 32], color: color, name: seriesName }],
    },
  ],
  [
    {
      title: "Domácnosti pod hranicí chudoby (<\u00A060\u00A0%\u00A0mediánu)",
      series: [{ data: [39, 47, 67, 54], color: color, name: seriesName }],
    },
    {
      title: "Nízkopříjmové domácnosti (60–100\u00A0%\u00A0mediánu)",
      series: [{ data: [24, 29, 46, 32], color: color, name: seriesName }],
    },
    {
      title: "Nadstandardně příjmové domácnosti (101–150\u00A0%\u00A0mediánu)",
      series: [{ data: [19, 23, 35, 26], color: color, name: seriesName }],
    },
    {
      title: "Vysokopříjmová domácnosti (nad 150\u00A0%\u00A0mediánu)",
      series: [{ data: [16, 19, 29, 21], color: color, name: seriesName }],
    },
  ],
  [
    {
      title: "Domácnosti s dětmi – příjem pod medián",
      series: [{ data: [28, 36, 51, 41], color: color, name: seriesName }],
    },
    {
      title: "Domácnosti s dětmi – příjem nad medián",
      series: [{ data: [18, 22, 33, 24], color: color, name: seriesName }],
    },
    {
      title: "Domácnosti bez dětí – příjem pod medián",
      series: [{ data: [31, 37, 55, 42], color: color, name: seriesName }],
    },
    {
      title: "Domácnosti bez dětí – příjem nad medián",
      series: [{ data: [16, 21, 32, 22], color: color, name: seriesName }],
    },
  ],
  [
    {
      title: "Vlastníci a družstevníci – příjem pod medián",
      series: [{ data: [21, 28, 47, 31], color: color, name: seriesName }],
    },
    {
      title: "Vlastníci a družstevníci – příjem nad medián",
      series: [{ data: [15, 18, 28, 19], color: color, name: seriesName }],
    },
    {
      title: "Nájemníci a podnájemníci – příjem pod medián",
      series: [{ data: [42, 43, 58, 47], color: color, name: seriesName }],
    },
    {
      title: "Nájemníci a podnájemníci – příjem nad medián",
      series: [{ data: [25, 28, 36, 32], color: color, name: seriesName }],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(
    "paq_vydaje_na_bydleni"
  );

  const [activeButton, setActiveButton] = useState(0);
  const [selectedData, setSelectedData] = useState(data[activeButton]);

  useEffect(() => {
    setSelectedData(data[activeButton]);
  }, [activeButton]);

  useEffect(() => {
    postHeightMessage();
  }, [selectedData, postHeightMessage]);

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8" ref={containerRef}>
      <h1 className="text-3xl font-bold leading-7 mb-4">
        Kolik procent z příjmů utratí za bydlení
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
            <div key={`${skupina.title}-${index}`}>
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
          href="https://data.irozhlas.cz/zivot/vydaje-procenta/"
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
