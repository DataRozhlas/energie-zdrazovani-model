import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import ActiveButton from "../components/ActiveButton";
import BarChart from "../components/BarChart";
import { usePostMessageWithHeight } from "../utils/hooks";

const buttons: string[] = ["Leden 2022", "Září 2022"];

const categories: string[] = [
  "Vytápět na nižší teplotu",
  "Méně používat elektrické spotřebiče",
  "Vytápět menší část bytu/domu",
  "Ohřívat užitkovou vodu na nižší teplotu",
  "Lépe izolovat okna či střechu",
  "Hledat jiného dodavatele elektřiny",
  "Hledat jiného dodavatele plynu",
];

const seriesName: string = "";

const tooltipSuffix: string = " % domácností";

const color: string = "#dd505b";

const data: any = [
  [
    {
      title: "",
      series: [
        { data: [34, 33, 19, 7, 5, 2, 1], color: color, name: seriesName },
      ],
    },
  ],
  [
    {
      title: "",
      series: [
        { data: [52, 47, 30, 17, 8, 2, 1], color: color, name: seriesName },
      ],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("paq_jak_setri");

  const [activeButton, setActiveButton] = useState(1);
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
        {`Snažíte se v souvislosti s (možným) zvýšením cen energií`}
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
                ymax={55}
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
