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

const tooltipSuffix: string = " Kč";

const color: string = "#246F85";

const data: any = [
  [
    {
      title: "",
      series: [
        {
          data: [
            { y: 8131, color: "#cbd5e1" },
            { y: 5147, color: "#246F85" },
          ],
          color: "#246F85",
          name: "uspoří měsíčně",
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
            { y: 565, color: "#cbd5e1" },
            { y: -277, color: "#dd505b" },
          ],
          color: "#dd505b",
          name: "uspoří měsíčně",
        },
      ],
    },
    {
      title: "Nízkopříjmové domácnosti (60–100\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 5209, color: "#cbd5e1" },
            { y: 3035, color: "#246F85" },
          ],
          color: "#246F85",
          name: "uspoří měsíčně",
        },
      ],
    },
    {
      title: "Nadstandardně příjmové domácnosti (101–150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 10784, color: "#cbd5e1" },
            { y: 7560, color: "#246F85" },
          ],
          color: "#246F85",
          name: "uspoří měsíčně",
        },
      ],
    },
    {
      title: "Vysokopříjmové domácnosti (nad 150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [
            { y: 20328, color: "#cbd5e1" },
            { y: 15323, color: "#246F85" },
          ],
          color: "#246F85",
          name: "uspoří měsíčně",
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
            { y: 2919, color: "#cbd5e1" },
            { y: 720, color: "#246F85" },
          ],
          color: "#246F85",
          name: "uspoří měsíčně",
        },
      ],
    },
    {
      title: "Domácnosti s dětmi – příjem nad medián",
      series: [
        {
          data: [
            { y: 12086, color: "#cbd5e1" },
            { y: 9309, color: "#246F85" },
          ],
          color: "#246F85",
          name: "uspoří měsíčně",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem pod medián",
      series: [
        {
          data: [
            { y: 2729, color: "#cbd5e1" },
            { y: 1035, color: "#246F85" },
          ],
          color: "#246F85",
          name: "uspoří měsíčně",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem nad medián",
      series: [
        {
          data: [
            { y: 13995, color: "#cbd5e1" },
            { y: 9272, color: "#246F85" },
          ],
          color: "#246F85",
          name: "uspoří měsíčně",
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
            { y: 8364, color: "#cbd5e1" },
            { y: 4867, color: "#246F85" },
          ],
          color: "#246F85",
          name: "uspoří měsíčně",
        },
      ],
    },
    {
      title: "Domácnost bez dětí (do 65 let)",
      series: [
        {
          data: [
            { y: 10305, color: "#cbd5e1" },
            { y: 6581, color: "#246F85" },
          ],
          color: "#246F85",
          name: "uspoří měsíčně",
        },
      ],
    },
    {
      title: "Senior – samostatně žijící",
      series: [
        {
          data: [
            { y: 1298, color: "#cbd5e1" },
            { y: 967, color: "#246F85" },
          ],
          color: "#246F85",
          name: "uspoří měsíčně",
        },
      ],
    },
    {
      title: "Senior – více členů domácnosti",
      series: [
        {
          data: [
            { y: 7044, color: "#cbd5e1" },
            { y: 4501, color: "#246F85" },
          ],
          color: "#246F85",
          name: "uspoří měsíčně",
        },
      ],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(
    "paq_narust_uspory_abs"
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
        {`Kolik domácnostem zbývá po zaplacení všech výdajů`}
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
                ymin={-500}
                ymax={21000}
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
          href="https://data.irozhlas.cz/zivot/extremni-vydaje/"
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
