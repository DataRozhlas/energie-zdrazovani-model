import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import BarChart from "../components/BarChart";

const buttons: string[] = [
  "Všechny domácnosti",
  "Podle příjmů",
  "Podle příjmů a dětí",
  "Podle příjmů a typu bydlení",
];

const categories: string[] = [
  "loni (listopad 21)",
  "letos v létě (červenec 22)",
  "kdyby nastal 200 % růst cen nergií",
  "při zastropování cen energií (s fixací)",
];

const seriesName: string = "";

const tooltipSuffix: string =
  " % domácností dá za bydlení přes dvě pětiny příjmů";

const color: string = "#dd505b";

const data: any = [
  [{ name: "", data: [15, 24, 48, 30] }],
  [
    {
      name: "Domácnosti pod hranicí chudoby (< 60 % mediánu)",
      data: [44, 54, 79, 62],
    },
    {
      name: "Nízkopříjmové domácnosti (60–100 % mediánu)",
      data: [12, 26, 54, 30],
    },
    {
      name: "Nadstandardně příjmové domácnosti (101–150 % mediánu)",
      data: [8, 12, 34, 18],
    },
    {
      name: "Vysokopříjmové domácnosti (nad 150 % mediánu)",
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
        Jak velká část domácností dá za bydlení přes 40 % příjmů
      </h1>
      <span className="isolate inline-flex rounded-md shadow-sm mx-px sm:mx-0 mb-px">
        {buttons.map((button, index) => (
          <Button
            key={index}
            index={index}
            text={button}
            length={buttons.length}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        ))}
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
