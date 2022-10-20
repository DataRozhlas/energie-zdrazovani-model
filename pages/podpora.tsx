import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import ActiveButton from "../components/ActiveButton";
import LineChart from "../components/LineChart";
import { usePostMessageWithHeight } from "../utils/hooks";

const buttons: string[] = [
  "Silně zatížení výdaji na bydlení",
  "Středně zatížení",
  "Málo ztížení",
];

const categories: string[] = [
  "9. března 2022",
  "26. dubna 2022",
  "31. května 2022",
  "26. července 2022 ",
  "27. září 2022",
];

const tooltipSuffix: string = " % respondentů";

const color: string = "#dd505b";

const data: any = [
  [
    {
      title: "Dávají za bydlení více než 40 % příjmů",
      series: [
        {
          data: [50, 41.7, 41.8, 41.7, 34.1],
          color: color,
          name: "Podíl odpovědí určitě ano a spíše ano",
        },
      ],
    },
  ],
  [
    {
      title: "Dávají za bydlení 25 až 40 % příjmů",
      series: [
        {
          data: [56.6, 48.4, 46.4, 43.6, 46],
          color: color,
          name: "Podíl odpovědí určitě ano a spíše ano",
        },
      ],
    },
  ],
  [
    {
      title: "Dávají za bydlení méně než 25 % příjmů",
      series: [
        {
          data: [63.2, 51.2, 49.2, 44.6, 51.6],
          color: color,
          name: "Podíl odpovědí určitě ano a spíše ano",
        },
      ],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("paq_podpora");

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
        {`Souhlasil(a) byste, aby ČR dlouhodobě přijala uprchlíky z Ukrajiny?`}
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
              <LineChart
                series={skupina.series}
                ymax={65}
                ymin={30}
                categories={categories}
                tooltipSuffix={tooltipSuffix}
                legend={true}
                stacking={undefined}
              ></LineChart>
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
