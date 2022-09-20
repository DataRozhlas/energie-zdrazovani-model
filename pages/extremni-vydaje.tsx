import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import ActiveButton from "../components/ActiveButton";
import BarChart from "../components/BarChart";

const buttons: string[] = [
  "Všechny domácnosti",
  "Podle příjmů",
  "Podle příjmů a dětí",
  "Podle příjmů a typu bydlení",
];

const categories: string[] = [
  "loni (listopad\u00A02021)",
  "letos v létě (červenec\u00A02022)",
  "kdyby nastal 200\u00A0% růst cen energií",
  "při zastropování cen energií (s\u00A0fixací)",
];

const seriesName: string = "";

const tooltipSuffix: string =
  " % domácností dá za bydlení přes dvě pětiny příjmů";

const color: string = "#dd505b";

const data: any = [
  [{ name: "", data: [15, 24, 48, 30] }],
  [
    {
      name: "Domácnosti pod hranicí chudoby (<\u00A060\u00A0%\u00A0mediánu)",
      data: [44, 54, 79, 62],
    },
    {
      name: "Nízkopříjmové domácnosti (60–100\u00A0%\u00A0mediánu)",
      data: [12, 26, 54, 30],
    },
    {
      name: "Nadstandardně příjmové domácnosti (101–150\u00A0%\u00A0mediánu)",
      data: [8, 12, 34, 18],
    },
    {
      name: "Vysokopříjmové domácnosti (nad 150\u00A0%\u00A0mediánu)",
      data: [5, 10, 19, 11],
    },
  ],
  [
    { name: "Domácnosti s dětmi – příjem pod medián", data: [20, 35, 65, 45] },
    { name: "Domácnosti s dětmi – příjem nad medián", data: [4, 11, 31, 14] },
    { name: "Domácnosti bez dětí – příjem pod medián", data: [28, 38, 67, 46] },
    { name: "Domácnosti bez dětí – příjem nad medián", data: [4, 11, 28, 13] },
  ],
  [
    {
      name: "Vlastníci a družstevníci – příjem pod medián",
      data: [9, 22, 53, 26],
    },
    {
      name: "Vlastníci a družstevníci – příjem nad medián",
      data: [3, 6, 19, 7],
    },
    {
      name: "Nájemníci a podnájemníci – příjem pod medián",
      data: [51, 51, 78, 58],
    },
    {
      name: "Nájemníci a podnájemníci – příjem nad medián",
      data: [10, 17, 34, 29],
    },
  ],
];

const Home: NextPage = () => {
  const [activeButton, setActiveButton] = useState(0);
  const [selectedData, setSelectedData] = useState(data[activeButton]);

  useEffect(() => {
    setSelectedData(data[activeButton]);
  }, [activeButton]);

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
        (skupina: { name: string; data: number[] }, index: number) => {
          return (
            <div key={index}>
              <h2 className="text-center mt-5 mb-1 text-lg">{skupina.name}</h2>
              <BarChart
                data={skupina.data}
                color={color}
                ymax={80}
                categories={categories}
                seriesName={seriesName}
                tooltipSuffix={tooltipSuffix}
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
