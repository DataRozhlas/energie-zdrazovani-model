import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import BarChart from "../components/BarChart";
import styles from "../styles/Home.module.css";

const buttons: string[] = [
  "Všechny domácnosti",
  "Domácnosti podle příjmů",
  "Domácnosti podle příjmů a dětí",
  "Domácnosti podle příjmů a typu bydlení",
];

const data: any = [
  [{ name: "", data: [23, 29, 43, 32] }],
  [
    { name: "Pod hranicí chudoby (< 60 % mediánu)", data: [39, 47, 67, 54] },
    { name: "Nízkopříjmová (60–100 % mediánu)", data: [24, 29, 46, 32] },
    {
      name: "Nadstandardně příjmová (101–150 % mediánu)",
      data: [19, 23, 35, 26],
    },
    { name: "Vysokopříjmová (nad 150 % mediánu)", data: [16, 19, 29, 21] },
  ],
  [
    { name: "S dětmi – příjem pod medián", data: [28, 36, 51, 41] },
    { name: "S dětmi – příjem nad medián", data: [18, 22, 33, 24] },
    { name: "Bez dětí – příjem pod medián", data: [31, 37, 55, 42] },
    { name: "Bez dětí – příjem nad medián", data: [16, 21, 32, 22] },
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
              <h2>{skupina.name}</h2>
              <BarChart
                data={skupina.data}
                color="#673349"
                ymax={70}
              ></BarChart>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Home;
