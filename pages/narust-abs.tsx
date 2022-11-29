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

const categories: string[] = isMobile
  ? ["zvýšení výdajů"]
  : ["zvýšení výdajů od listopadu 2021 do listopadu 2022"];

const seriesName: string = "";

const tooltipSuffix: string = " Kč";

const color: string = "#dd505b";

const data: any = [
  [
    {
      title: "",
      series: [
        {
          data: [2573],
          color: "#ebae48",
          name: isMobile
            ? "za bydlení"
            : "za bydlení (energie, nájemné, hypotéka...)",
        },
        {
          data: [608],
          color: "#fb646e",
          name: isMobile ? "za potraviny" : "za potraviny (konzumované doma)",
        },
      ],
    },
  ],
  [
    {
      title: "Domácnosti pod hranicí chudoby (<\u00A060\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [2040],
          color: "#ebae48",
          name: isMobile
            ? "za bydlení"
            : "za bydlení (energie, nájemné, hypotéka...)",
        },
        {
          data: [388],
          color: "#fb646e",
          name: isMobile ? "za potraviny" : "za potraviny (konzumované doma)",
        },
      ],
    },
    {
      title: "Nízkopříjmové domácnosti (60–100\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [2701],
          color: "#ebae48",
          name: isMobile
            ? "za bydlení"
            : "za bydlení (energie, nájemné, hypotéka...)",
        },
        {
          data: [543],
          color: "#fb646e",
          name: isMobile ? "za potraviny" : "za potraviny (konzumované doma)",
        },
      ],
    },
    {
      title: "Nadstandardně příjmové domácnosti (101–150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [2386],
          color: "#ebae48",
          name: isMobile
            ? "za bydlení"
            : "za bydlení (energie, nájemné, hypotéka...)",
        },
        {
          data: [532],
          color: "#fb646e",
          name: isMobile ? "za potraviny" : "za potraviny (konzumované doma)",
        },
      ],
    },
    {
      title: "Vysokopříjmové domácnosti (nad 150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [2667],
          color: "#ebae48",
          name: isMobile
            ? "za bydlení"
            : "za bydlení (energie, nájemné, hypotéka...)",
        },
        {
          data: [268],
          color: "#fb646e",
          name: isMobile ? "za potraviny" : "za potraviny (konzumované doma)",
        },
      ],
    },
  ],
  [
    {
      title: "Domácnosti s dětmi – příjem pod medián",
      series: [
        {
          data: [2208],
          color: "#ebae48",
          name: isMobile
            ? "za bydlení"
            : "za bydlení (energie, nájemné, hypotéka...)",
        },
        {
          data: [761],
          color: "#fb646e",
          name: isMobile ? "za potraviny" : "za potraviny (konzumované doma)",
        },
      ],
    },
    {
      title: "Domácnosti s dětmi – příjem nad medián",
      series: [
        {
          data: [3211],
          color: "#ebae48",
          name: isMobile
            ? "za bydlení"
            : "za bydlení (energie, nájemné, hypotéka...)",
        },
        {
          data: [1128],
          color: "#fb646e",
          name: isMobile ? "za potraviny" : "za potraviny (konzumované doma)",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem pod medián",
      series: [
        {
          data: [2062],
          color: "#ebae48",
          name: isMobile
            ? "za bydlení"
            : "za bydlení (energie, nájemné, hypotéka...)",
        },
        {
          data: [154],
          color: "#fb646e",
          name: isMobile ? "za potraviny" : "za potraviny (konzumované doma)",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem nad medián",
      series: [
        {
          data: [2950],
          color: "#ebae48",
          name: isMobile
            ? "za bydlení"
            : "za bydlení (energie, nájemné, hypotéka...)",
        },
        {
          data: [389],
          color: "#fb646e",
          name: isMobile ? "za potraviny" : "za potraviny (konzumované doma)",
        },
      ],
    },
  ],
  [
    {
      title: "Domácnosti s dětmi",
      series: [
        {
          data: [2601],
          color: "#ebae48",
          name: isMobile
            ? "za bydlení"
            : "za bydlení (energie, nájemné, hypotéka...)",
        },
        {
          data: [881],
          color: "#fb646e",
          name: isMobile ? "za potraviny" : "za potraviny (konzumované doma)",
        },
      ],
    },
    {
      title: "Domácnost bez dětí (do 65 let)",
      series: [
        {
          data: [2731],
          color: "#ebae48",
          name: isMobile
            ? "za bydlení"
            : "za bydlení (energie, nájemné, hypotéka...)",
        },
        {
          data: [371],
          color: "#fb646e",
          name: isMobile ? "za potraviny" : "za potraviny (konzumované doma)",
        },
      ],
    },
    {
      title: "Senior – samostatně žijící",
      series: [
        {
          data: [1515],
          color: "#ebae48",
          name: isMobile
            ? "za bydlení"
            : "za bydlení (energie, nájemné, hypotéka...)",
        },
        {
          data: [89],
          color: "#fb646e",
          name: isMobile ? "za potraviny" : "za potraviny (konzumované doma)",
        },
      ],
    },
    {
      title: "Senior – více členů domácnosti",
      series: [
        {
          data: [2640],
          color: "#ebae48",
          name: isMobile
            ? "za bydlení"
            : "za bydlení (energie, nájemné, hypotéka...)",
        },
        {
          data: [538],
          color: "#fb646e",
          name: isMobile ? "za potraviny" : "za potraviny (konzumované doma)",
        },
      ],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("paq_narust_abs");

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
        {`O kolik víc zaplatili letos v listopadu než\u00A0před\u00A0rokem`}
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
                ymax={5000}
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
          href="https://data.irozhlas.cz/zivot/vydaje-castky/"
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
