import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import ActiveButton from "../components/ActiveButton";
import LineChart from "../components/LineChart";
import { usePostMessageWithHeight } from "../utils/hooks";

const buttons: string[] = [
  "Ukrajinci jsou dobře začleněni",
  "Nejsou dobře začlenění",
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
      title:
        "Podpora těch, kdo si myslí, že Ukrajinci jsou v ČR dobře začlenění v oblasti práce",
      series: [
        {
          data: [68.2, 65.7, 66.2, 63.8, 65],
          color: color,
          name: "Podíl odpovědí určitě ano a spíše ano",
        },
      ],
    },
    {
      title:
        "Podpora těch, kdo si myslí, že Ukrajinci jsou v ČR dobře začlenění v oblasti bydlení",
      series: [
        {
          data: [75.7, 72, 72, 64.2, 68.3],
          color: color,
          name: "Podíl odpovědí určitě ano a spíše ano",
        },
      ],
    },
    {
      title:
        "Podpora těch, kdo si myslí, že Ukrajinci jsou v ČR dobře začlenění v oblasti jazyka",
      series: [
        {
          data: [68.8, 68, 67.8, 64.6, 68],
          color: color,
          name: "Podíl odpovědí určitě ano a spíše ano",
        },
      ],
    },
  ],
  [
    {
      title:
        "Podpora těch, kdo si nemyslí, že Ukrajinci nejsou v ČR dobře začlenění v oblasti práce",
      series: [
        {
          data: [35.3, 28.1, 25.2, 22.5, 20.8],
          color: color,
          name: "Podíl odpovědí určitě ano a spíše ano",
        },
      ],
    },
    {
      title:
        "Podpora těch, kdo si nemyslí, že Ukrajinci nejsou v ČR dobře začlenění v oblasti bydlení",
      series: [
        {
          data: [44.7, 33.6, 32.1, 32.7, 30.9],
          color: color,
          name: "Podíl odpovědí určitě ano a spíše ano",
        },
      ],
    },
    {
      title:
        "Podpora těch, kdo si nemyslí, že Ukrajinci nejsou v ČR dobře začlenění v oblasti jazyka",
      series: [
        {
          data: [45.9, 37.6, 34.3, 31.5, 30.1],
          color: color,
          name: "Podíl odpovědí určitě ano a spíše ano",
        },
      ],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("paq_hodnoceni");

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
                ymax={80}
                ymin={20}
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
