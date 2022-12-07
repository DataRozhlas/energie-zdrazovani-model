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
  "Podle typu domácnosti",
  "Podle příjmů",
  "Podle příjmů a dětí",
];

const categories: string[] = [
  "listopad 2021",
  "listopad 2022",
  "leden 2023 – zastropované energie, bez valorizace důchodů",
  "leden 2023 – zastropované energie, s valorizací důchodů",
];

const seriesName: string = "";

const tooltipSuffix: string = " %";

const color: string = "#fb646e";

const data: any = [
  [
    {
      title: "",
      series: [
        {
          data: [
            { y: 4, color: "#cbd5e1" },
            { y: 7, color: "#fb646e" },
            { y: 11, color: "#cbd5e1" },
            { y: 10, color: "#cbd5e1" },
          ],
          color: "#fb646e",
          name: "podíl domácností, které mají výdaje vyšší než příjmy",
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
            { y: 4, color: "#cbd5e1" },
            { y: 8, color: "#fb646e" },
            { y: 11, color: "#cbd5e1" },
            { y: 11, color: "#cbd5e1" },
          ],
          color: "#fb646e",
          name: "podíl domácností, které mají výdaje vyšší než příjmy",
        },
      ],
    },
    {
      title: "Domácnost bez dětí (do 65 let)",
      series: [
        {
          data: [
            { y: 3, color: "#cbd5e1" },
            { y: 5, color: "#fb646e" },
            { y: 9, color: "#cbd5e1" },
            { y: 9, color: "#cbd5e1" },
          ],
          color: "#fb646e",
          name: "podíl domácností, které mají výdaje vyšší než příjmy",
        },
      ],
    },
    {
      title: "Senior – samostatně žijící",
      series: [
        {
          data: [
            { y: 14, color: "#cbd5e1" },
            { y: 9, color: "#fb646e" },
            { y: 15, color: "#cbd5e1" },
            { y: 6, color: "#cbd5e1" },
          ],
          color: "#fb646e",
          name: "podíl domácností, které mají výdaje vyšší než příjmy",
        },
      ],
    },
    {
      title: "Senior – více členů domácnosti",
      series: [
        {
          data: [
            { y: 3, color: "#cbd5e1" },
            { y: 7, color: "#fb646e" },
            { y: 10, color: "#cbd5e1" },
            { y: 8, color: "#cbd5e1" },
          ],
          color: "#fb646e",
          name: "podíl domácností, které mají výdaje vyšší než příjmy",
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
            { y: 14, color: "#cbd5e1" },
            { y: 12, color: "#fb646e" },
            { y: 27, color: "#cbd5e1" },
            { y: 23, color: "#cbd5e1" },
          ],
          color: "#fb646e",
          name: "podíl domácností, které mají výdaje vyšší než příjmy",
        },
      ],
    },
    {
      title: "Nízkopříjmové domácnosti (60–100\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 2, color: "#cbd5e1" },
            { y: 8, color: "#fb646e" },
            { y: 10, color: "#cbd5e1" },
            { y: 9, color: "#cbd5e1" },
          ],
          color: "#fb646e",
          name: "podíl domácností, které mají výdaje vyšší než příjmy",
        },
      ],
    },
    {
      title: "Nadstandardně příjmové domácnosti (101–150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 0, color: "#cbd5e1" },
            { y: 2, color: "#fb646e" },
            { y: 4, color: "#cbd5e1" },
            { y: 4, color: "#cbd5e1" },
          ],
          color: "#fb646e",
          name: "podíl domácností, které mají výdaje vyšší než příjmy",
        },
      ],
    },
    {
      title: "Vysokopříjmové domácnosti (nad 150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 0, color: "#cbd5e1" },
            { y: 0, color: "#fb646e" },
            { y: 3, color: "#cbd5e1" },
            { y: 3, color: "#cbd5e1" },
          ],
          color: "#fb646e",
          name: "podíl domácností, které mají výdaje vyšší než příjmy",
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
            { y: 10, color: "#cbd5e1" },
            { y: 15, color: "#fb646e" },
            { y: 20, color: "#cbd5e1" },
            { y: 20, color: "#cbd5e1" },
          ],
          color: "#fb646e",
          name: "podíl domácností, které mají výdaje vyšší než příjmy",
        },
      ],
    },
    {
      title: "Domácnosti s dětmi – příjem nad medián",
      series: [
        {
          data: [
            { y: 0, color: "#cbd5e1" },
            { y: 1, color: "#fb646e" },
            { y: 2, color: "#cbd5e1" },
            { y: 2, color: "#cbd5e1" },
          ],
          color: "#fb646e",
          name: "podíl domácností, které mají výdaje vyšší než příjmy",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem pod medián",
      series: [
        {
          data: [
            { y: 9, color: "#cbd5e1" },
            { y: 13, color: "#fb646e" },
            { y: 20, color: "#cbd5e1" },
            { y: 17, color: "#cbd5e1" },
          ],
          color: "#fb646e",
          name: "podíl domácností, které mají výdaje vyšší než příjmy",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem nad medián",
      series: [
        {
          data: [
            { y: 0, color: "#cbd5e1" },
            { y: 0, color: "#fb646e" },
            { y: 1, color: "#cbd5e1" },
            { y: 1, color: "#cbd5e1" },
          ],
          color: "#fb646e",
          name: "podíl domácností, které mají výdaje vyšší než příjmy",
        },
      ],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(
    "paq_stropy_prijmy_vydaje"
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
        {`Kolik domácností má vyšší výdaje než příjmy`}
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
