import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import ActiveButton from "../components/ActiveButton";
import BarChart from "../components/BarChart";
import { usePostMessageWithHeight } from "../utils/hooks";

const isMobile =
  typeof window !== "undefined" ? window.innerWidth < 600 : false;

const buttons: string[] = [
  "Všechny domácnosti",
  "Podle příjmů",
  "Podle příjmů a dětí",
  "Podle dětí a věku",
];

const categories: string[] = ["listopad 2021", "listopad 2022"];

const seriesName: string = "";

const tooltipSuffix: string = " %";

const color: string = "#ffd48a";

const data: any = [
  [
    {
      title: "",
      series: [
        {
          data: [
            { y: 19, color: "#cbd5e1" },
            { y: 35, color: "#ffd48a" },
          ],
          color: "#ffd48a",
          name: "podíl domácností, které nic neušetří",
        },
      ],
    },
  ],
  [
    {
      title: "Domácnosti pod hranicí chudoby (<\u00A060\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 59, color: "#cbd5e1" },
            { y: 76, color: "#ffd48a" },
          ],
          color: "#ffd48a",
          name: "podíl domácností, které nic neušetří",
        },
      ],
    },
    {
      title: "Nízkopříjmové domácnosti (60–100\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 18, color: "#cbd5e1" },
            { y: 34, color: "#ffd48a" },
          ],
          color: "#ffd48a",
          name: "podíl domácností, které nic neušetří",
        },
      ],
    },
    {
      title: "Nadstandardně příjmové domácnosti (101–150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 7, color: "#cbd5e1" },
            { y: 17, color: "#ffd48a" },
          ],
          color: "#ffd48a",
          name: "podíl domácností, které nic neušetří",
        },
      ],
    },
    {
      title: "Vysokopříjmové domácnosti (nad 150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 1, color: "#cbd5e1" },
            { y: 10, color: "#ffd48a" },
          ],
          color: "#ffd48a",
          name: "podíl domácností, které nic neušetří",
        },
      ],
    },
  ],
  [
    {
      title: "Domácnosti s dětmi – příjem pod medián",
      series: [
        {
          data: [
            { y: 29, color: "#cbd5e1" },
            { y: 53, color: "#ffd48a" },
          ],
          color: "#ffd48a",
          name: "podíl domácností, které nic neušetří",
        },
      ],
    },
    {
      title: "Domácnosti s dětmi – příjem nad medián",
      series: [
        {
          data: [
            { y: 8, color: "#cbd5e1" },
            { y: 20, color: "#ffd48a" },
          ],
          color: "#ffd48a",
          name: "podíl domácností, které nic neušetří",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem pod medián",
      series: [
        {
          data: [
            { y: 36, color: "#cbd5e1" },
            { y: 56, color: "#ffd48a" },
          ],
          color: "#ffd48a",
          name: "podíl domácností, které nic neušetří",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem nad medián",
      series: [
        {
          data: [
            { y: 7, color: "#cbd5e1" },
            { y: 14, color: "#ffd48a" },
          ],
          color: "#ffd48a",
          name: "podíl domácností, které nic neušetří",
        },
      ],
    },
  ],
  [
    {
      title: "Domácnosti s dětmi",
      series: [
        {
          data: [
            { y: 16, color: "#cbd5e1" },
            { y: 37, color: "#ffd48a" },
          ],
          color: "#ffd48a",
          name: "podíl domácností, které nic neušetří",
        },
      ],
    },
    {
      title: "Domácnost bez dětí (do 65 let)",
      series: [
        {
          data: [
            { y: 17, color: "#cbd5e1" },
            { y: 30, color: "#ffd48a" },
          ],
          color: "#ffd48a",
          name: "podíl domácností, které nic neušetří",
        },
      ],
    },
    {
      title: "Senior – samostatně žijící",
      series: [
        {
          data: [
            { y: 50, color: "#cbd5e1" },
            { y: 63, color: "#ffd48a" },
          ],
          color: "#ffd48a",
          name: "podíl domácností, které nic neušetří",
        },
      ],
    },
    {
      title: "Senior – více členů domácnosti",
      series: [
        {
          data: [
            { y: 18, color: "#cbd5e1" },
            { y: 29, color: "#ffd48a" },
          ],
          color: "#ffd48a",
          name: "podíl domácností, které nic neušetří",
        },
      ],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("paq_narust_nula");

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
        {`Jak vzrostl podíl těch, kterým po zaplacení výdajů nic nezbývá`}
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
                ymin={0}
                ymax={100}
                categories={categories}
                tooltipSuffix={tooltipSuffix}
                legend={index === selectedData.length - 1}
                stacking={"normal"}
              ></BarChart>
            </div>
          );
        }
      )}
      <p className="text-xs text-right">
        Zdroj dat:{" "}
        <a
          href="https://data.irozhlas.cz/zivot/uspory-procenta/"
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
