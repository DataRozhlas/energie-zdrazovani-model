import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import ActiveButton from "../components/ActiveButton";
import BarChart from "../components/BarChart";
import { usePostMessageWithHeight } from "../utils/hooks";

const buttons: string[] = ["Rozdělní podle příjmů", "Rozdělení podle vzdělání"];

const categories: string[] = ["Zvažují", "Přikročili k němu"];

const seriesName: string = "";

const tooltipSuffix: string = " % domácností";

const color: string = "#dd505b";

const data: any = [
  [
    {
      title: "Všechny rodiny s dětmi",
      series: [
        {
          data: [21, 9],
          color: color,
          name: seriesName,
        },
      ],
    },
    {
      title: "Chudší polovina rodin s dětmi",
      series: [
        {
          data: [29, 11],
          color: color,
          name: seriesName,
        },
      ],
    },
    {
      title: "Bohatší polovina rodin s dětmi",
      series: [
        {
          data: [11, 6],
          color: color,
          name: seriesName,
        },
      ],
    },
  ],
  [
    {
      title: "Bez maturity",
      series: [
        {
          data: [34, 11],
          color: color,
          name: seriesName,
        },
      ],
    },
    {
      title: "S maturitou",
      series: [
        {
          data: [14, 7],
          color: color,
          name: seriesName,
        },
      ],
    },
    {
      title: "VŠ",
      series: [
        {
          data: [12, 7],
          color: color,
          name: seriesName,
        },
      ],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("paq_omezeni_vydaju");

  const [activeButton, setActiveButton] = useState(0);
  const [selectedData, setSelectedData] = useState(data[activeButton]);

  useEffect(() => {
    setSelectedData(data[activeButton]);
    console.log(data[activeButton]);
  }, [activeButton]);

  useEffect(() => {
    postHeightMessage();
  }, [selectedData, postHeightMessage]);

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8" ref={containerRef}>
      <h1 className="text-3xl font-bold leading-7 mb-4">
        {`Zvažujete nebo jste už přikročili k výraznému omezení výdajů na vybavení a aktivity pro děti?`}
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
            <div key={`${Math.random()}-${index}`}>
              <h2 className="text-center mt-5 mb-1 text-lg">{skupina.title}</h2>
              <BarChart
                series={skupina.series}
                ymax={40}
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
          href="https://data.irozhlas.cz/zivot/"
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
