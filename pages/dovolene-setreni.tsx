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
  "Podle ekonomické situace",
  "Podle příjmů a dětí",
  "Podle vzdělání",
];

const categories: string[] = [
  "Ano, výrazně se omezíme",
  "Ano, trochu se omezíme",
  "Ne, nebudeme na to brát ohled",
  "Ne, utratíme víc než dřív",
  "Vůbec nejezdíme na dovolené",
  "Nevím",
];

const tooltipSuffix: string = " %";

const data: any = [
  [
    {
      title: "",
      series: [
        {
          data: [
            { y: 25.1, color: "#dc2626" },
            { y: 14.7, color: "#fecaca" },
            { y: 17, color: "#a7f3d0" },
            { y: 4.1, color: "#059669" },
            { y: 25.5, color: "#d4d4d4" },
            { y: 13.7, color: "#d4d4d4" },
          ],
          name: "podíl domácností",
        },
      ],
    },
  ],
  [
    {
      title: "V příjmové chudobě",
      series: [
        {
          data: [
            { y: 22.1, color: "#dc2626" },
            { y: 17.6, color: "#fecaca" },
            { y: 6.1, color: "#a7f3d0" },
            { y: 2.2, color: "#059669" },
            { y: 39.5, color: "#d4d4d4" },
            { y: 12.5, color: "#d4d4d4" },
          ],
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Nízkopříjmoví bez větších úspor",
      series: [
        {
          data: [
            { y: 30, color: "#dc2626" },
            { y: 10.9, color: "#fecaca" },
            { y: 1.6, color: "#a7f3d0" },
            { y: 5.1, color: "#059669" },
            { y: 40.6, color: "#d4d4d4" },
            { y: 11.8, color: "#d4d4d4" },
          ],
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Standardně zajištění",
      series: [
        {
          data: [
            { y: 25.1, color: "#dc2626" },
            { y: 15.2, color: "#fecaca" },
            { y: 21, color: "#a7f3d0" },
            { y: 4.3, color: "#059669" },
            { y: 21.1, color: "#d4d4d4" },
            { y: 13.3, color: "#d4d4d4" },
          ],
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
            { y: 22.9, color: "#dc2626" },
            { y: 23.6, color: "#fecaca" },
            { y: 14.7, color: "#a7f3d0" },
            { y: 5.6, color: "#059669" },
            { y: 20.2, color: "#d4d4d4" },
            { y: 13, color: "#d4d4d4" },
          ],
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Domácnosti s dětmi – příjem nad medián",
      series: [
        {
          data: [
            { y: 21.6, color: "#dc2626" },
            { y: 20.6, color: "#fecaca" },
            { y: 33.2, color: "#a7f3d0" },
            { y: 6.3, color: "#059669" },
            { y: 8.2, color: "#d4d4d4" },
            { y: 10, color: "#d4d4d4" },
          ],
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem pod medián",
      series: [
        {
          data: [
            { y: 26, color: "#dc2626" },
            { y: 6.1, color: "#fecaca" },
            { y: 4.4, color: "#a7f3d0" },
            { y: 4.1, color: "#059669" },
            { y: 44.6, color: "#d4d4d4" },
            { y: 14.7, color: "#d4d4d4" },
          ],
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem nad medián",
      series: [
        {
          data: [
            { y: 27.2, color: "#dc2626" },
            { y: 14.3, color: "#fecaca" },
            { y: 18.8, color: "#a7f3d0" },
            { y: 2.9, color: "#059669" },
            { y: 23.3, color: "#d4d4d4" },
            { y: 13.5, color: "#d4d4d4" },
          ],
          name: "podíl domácnostís",
        },
      ],
    },
  ],
  [
    {
      title: "Základní",
      series: [
        {
          data: [
            { y: 9.7, color: "#dc2626" },
            { y: 8.1, color: "#fecaca" },
            { y: 17.7, color: "#a7f3d0" },
            { y: 5.7, color: "#059669" },
            { y: 45.7, color: "#d4d4d4" },
            { y: 13.1, color: "#d4d4d4" },
          ],
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Středoškolské bez maturity",
      series: [
        {
          data: [
            { y: 27.7, color: "#dc2626" },
            { y: 11.7, color: "#fecaca" },
            { y: 8.3, color: "#a7f3d0" },
            { y: 5.2, color: "#059669" },
            { y: 33.3, color: "#d4d4d4" },
            { y: 13.8, color: "#d4d4d4" },
          ],
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Středoškolské s maturitou",
      series: [
        {
          data: [
            { y: 29.7, color: "#dc2626" },
            { y: 17.8, color: "#fecaca" },
            { y: 19, color: "#a7f3d0" },
            { y: 3.3, color: "#059669" },
            { y: 16.9, color: "#d4d4d4" },
            { y: 13.3, color: "#d4d4d4" },
          ],
          name: "podíl domácností",
        },
      ],
    },
    {
      title: "Vysokoškolské",
      series: [
        {
          data: [
            { y: 21.2, color: "#dc2626" },
            { y: 18.5, color: "#fecaca" },
            { y: 29.3, color: "#a7f3d0" },
            { y: 2.4, color: "#059669" },
            { y: 14.2, color: "#d4d4d4" },
            { y: 14.5, color: "#d4d4d4" },
          ],
          name: "podíl domácností",
        },
      ],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(
    "paq_dovolene_setreni"
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
      <h1 className="text-2xl font-bold leading-6 pb-2">
        {`Bude vaše domácnost šetřit na zimní dovolené?`}
      </h1>
      <h2 className="leading-4 pb-4">
        Kliknutím na tlačítko zobrazíte odpovědi různých typů domácností
      </h2>
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
                legend={false}
                stacking={"normal"}
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
