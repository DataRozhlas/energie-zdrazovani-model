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

const color: string = "#dd505b";

const data: any = [
  [
    {
      title: "",
      series: [
        {
          data: [
            { y: 23, color: "#cbd5e1" },
            { y: 29, color: "#673349" },
          ],
          color: "#673349",
          name: "% z příjmů",
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
            { y: 39, color: "#cbd5e1" },
            { y: 45, color: "#673349" },
          ],
          color: "#673349",
          name: "% z příjmů",
        },
      ],
    },
    {
      title: "Nízkopříjmové domácnosti (60–100\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 24, color: "#cbd5e1" },
            { y: 30, color: "#673349" },
          ],
          color: "#673349",
          name: "% z příjmů",
        },
      ],
    },
    {
      title: "Nadstandardně příjmové domácnosti (101–150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 19, color: "#cbd5e1" },
            { y: 23, color: "#673349" },
          ],
          color: "#673349",
          name: "% z příjmů",
        },
      ],
    },
    {
      title: "Vysokopříjmové domácnosti (nad 150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 16, color: "#cbd5e1" },
            { y: 20, color: "#673349" },
          ],
          color: "#673349",
          name: "% z příjmů",
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
            { y: 28, color: "#cbd5e1" },
            { y: 36, color: "#673349" },
          ],
          color: "#673349",
          name: "% z příjmů",
        },
      ],
    },
    {
      title: "Domácnosti s dětmi – příjem nad medián",
      series: [
        {
          data: [
            { y: 18, color: "#cbd5e1" },
            { y: 22, color: "#673349" },
          ],
          color: "#673349",
          name: "% z příjmů",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem pod medián",
      series: [
        {
          data: [
            { y: 30, color: "#cbd5e1" },
            { y: 37, color: "#673349" },
          ],
          color: "#673349",
          name: "% z příjmů",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem nad medián",
      series: [
        {
          data: [
            { y: 16, color: "#cbd5e1" },
            { y: 21, color: "#673349" },
          ],
          color: "#673349",
          name: "% z příjmů",
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
            { y: 23, color: "#cbd5e1" },
            { y: 29, color: "#673349" },
          ],
          color: "#673349",
          name: "% z příjmů",
        },
      ],
    },
    {
      title: "Domácnost bez dětí (do 65 let)",
      series: [
        {
          data: [
            { y: 22, color: "#cbd5e1" },
            { y: 29, color: "#673349" },
          ],
          color: "#673349",
          name: "% z příjmů",
        },
      ],
    },
    {
      title: "Senior – samostatně žijící",
      series: [
        {
          data: [
            { y: 36, color: "#cbd5e1" },
            { y: 40, color: "#673349" },
          ],
          color: "#673349",
          name: "% z příjmů",
        },
      ],
    },
    {
      title: "Senior – více členů domácnosti",
      series: [
        {
          data: [
            { y: 19, color: "#cbd5e1" },
            { y: 24, color: "#673349" },
          ],
          color: "#673349",
          name: "% z příjmů",
        },
      ],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(
    "paq_narust_rel_potraviny"
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
        {`Jak velkou část svého příjmu dávají domácnosti za bydlení`}
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
                ymax={50}
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
