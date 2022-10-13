import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import ActiveButton from "../components/ActiveButton";
import BarChart from "../components/BarChart";
import { usePostMessageWithHeight } from "../utils/hooks";

const buttons: string[] = [
  "Všichni čerpající",
  "Chudší polovina rodin s dětmi",
  "Bohatší polovina rodin s dětmi",
];

const categories: string[] = [
  "Vybavení do školy či školky",
  "Věci pro děti nesouvisející se vzděláváním",
  "Volnočasové aktivity pro děti",
  "Na nutné výdaje",
  "Dal/a jsem je dítěti",
  "Investice (spoření, apod.)",
  "Splátka dluhu či jiných poplatků, které jsme nestíhali",
  "Jiné účely mimo děti (jednorázový výdaj, vybavení domácnosti, dovolená, restaurace, jinak)",
  "Nekupovali jsme díky nim nic specifického - peníze jsme všechny ušetřili",
];

const seriesName: string = "";

const tooltipSuffix: string = " % domácností";

const color: string = "#dd505b";

const data: any = [
  [
    {
      title: "",
      series: [
        {
          data: [50, 35, 23, 15, 14, 4, 2, 9, 17],
          color: color,
          name: seriesName,
        },
      ],
    },
  ],
  [
    {
      title: "",
      series: [
        {
          data: [55, 38, 28, 17, 11, 2, 3, 7, 12],
          color: color,
          name: seriesName,
        },
      ],
    },
  ],
  [
    {
      title: "",
      series: [
        {
          data: [41, 30, 15, 11, 18, 8, 0, 12, 25],
          color: color,
          name: seriesName,
        },
      ],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(
    "paq_prispevek_na_deti"
  );

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
        {`Jak jste využili příspěvek 5 tisíc korun na nezletilé dítě?`}
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
                ymax={60}
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
