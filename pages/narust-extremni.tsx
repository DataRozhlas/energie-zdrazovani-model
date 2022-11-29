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
            { y: 15, color: "#cbd5e1" },
            { y: 23, color: "#dd505b" },
          ],
          color: "#dd505b",
          name: "podíl domácností",
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
            { y: 44, color: "#cbd5e1" },
            { y: 46, color: "#dd505b" },
          ],
          color: "#dd505b",
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Nízkopříjmové domácnosti (60–100\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 12, color: "#cbd5e1" },
            { y: 23, color: "#dd505b" },
          ],
          color: "#dd505b",
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Nadstandardně příjmové domácnosti (101–150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 8, color: "#cbd5e1" },
            { y: 12, color: "#dd505b" },
          ],
          color: "#dd505b",
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Vysokopříjmové domácnosti (nad 150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 5, color: "#cbd5e1" },
            { y: 8, color: "#dd505b" },
          ],
          color: "#dd505b",
          name: "podíl domácností",
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
            { y: 24, color: "#cbd5e1" },
            { y: 35, color: "#dd505b" },
          ],
          color: "#dd505b",
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Domácnosti s dětmi – příjem nad medián",
      series: [
        {
          data: [
            { y: 4, color: "#cbd5e1" },
            { y: 8, color: "#dd505b" },
          ],
          color: "#dd505b",
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem pod medián",
      series: [
        {
          data: [
            { y: 26, color: "#cbd5e1" },
            { y: 35, color: "#dd505b" },
          ],
          color: "#dd505b",
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem nad medián",
      series: [
        {
          data: [
            { y: 3, color: "#cbd5e1" },
            { y: 9, color: "#dd505b" },
          ],
          color: "#dd505b",
          name: "podíl domácností",
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
            { y: 13, color: "#cbd5e1" },
            { y: 23, color: "#dd505b" },
          ],
          color: "#dd505b",
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Domácnost bez dětí (do 65 let)",
      series: [
        {
          data: [
            { y: 13, color: "#cbd5e1" },
            { y: 21, color: "#dd505b" },
          ],
          color: "#dd505b",
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Senior – samostatně žijící",
      series: [
        {
          data: [
            { y: 35, color: "#cbd5e1" },
            { y: 43, color: "#dd505b" },
          ],
          color: "#dd505b",
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Senior – více členů domácnosti",
      series: [
        {
          data: [
            { y: 8, color: "#cbd5e1" },
            { y: 13, color: "#dd505b" },
          ],
          color: "#dd505b",
          name: "podíl domácností",
        },
      ],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(
    "paq_narust_extremni"
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
        {`Jak přibylo domácností výrazně zatížených výdaji na bydlení (>\u00A040\u00A0%\u00A0příjmů)`}
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
                ymax={75}
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
