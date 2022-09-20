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

const seriesName: string = "za bydlení utratí";

const tooltipSuffix: string = "% z příjmů";

const color: string = "#673349";

const data: any = [
  [{ name: "", data: [23, 29, 43, 32] }],
  [
    {
      name: "Domácnosti pod hranicí chudoby (<\u00A060\u00A0%\u00A0mediánu)",
      data: [39, 47, 67, 54],
    },
    {
      name: "Nízkopříjmové domácnosti (60–100\u00A0%\u00A0mediánu)",
      data: [24, 29, 46, 32],
    },
    {
      name: "Nadstandardně příjmové domácnosti (101–150\u00A0%\u00A0mediánu)",
      data: [19, 23, 35, 26],
    },
    {
      name: "Vysokopříjmová domácnosti (nad 150\u00A0%\u00A0mediánu)",
      data: [16, 19, 29, 21],
    },
  ],
  [
    { name: "Domácnosti s dětmi – příjem pod medián", data: [28, 36, 51, 41] },
    { name: "Domácnosti s dětmi – příjem nad medián", data: [18, 22, 33, 24] },
    { name: "Domácnosti bez dětí – příjem pod medián", data: [31, 37, 55, 42] },
    { name: "Domácnosti bez dětí – příjem nad medián", data: [16, 21, 32, 22] },
  ],
  [
    {
      name: "Vlastníci a družstevníci – příjem pod medián",
      data: [21, 28, 47, 31],
    },
    {
      name: "Vlastníci a družstevníci – příjem nad medián",
      data: [15, 18, 28, 19],
    },
    {
      name: "Nájemníci a podnájemníci – příjem pod medián",
      data: [42, 43, 58, 47],
    },
    {
      name: "Nájemníci a podnájemníci – příjem nad medián",
      data: [25, 28, 36, 32],
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
        (skupina: { name: string; data: number[] }, index: number) => {
          return (
            <div key={index}>
              <h2 className="text-center mt-5 mb-1 text-lg">{skupina.name}</h2>
              <BarChart
                data={skupina.data}
                color={color}
                ymax={70}
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
