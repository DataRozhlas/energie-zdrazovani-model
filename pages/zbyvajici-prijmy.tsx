import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import ActiveButton from "../components/ActiveButton";
import BarChart from "../components/BarChart";
import { usePostMessageWithHeight } from "../utils/hooks";

const buttons: string[] = [
  "Všechny domácnosti",
  "Podle příjmů",
  "Podle příjmů a dětí",
  "Podle příjmů a typu bydlení",
];

const categories: string[] = [
  "před rokem (listopad\u00A02021)",
  "letos v létě (červenec\u00A02022)",
  "kdyby nastal 200\u00A0% růst cen energií",
  "při zastropování cen energií (s\u00A0fixací)",
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
          data: [9, 13, 27, 17],
          color: "#dd505b",
          name: "do 100 Kč na osobu a den",
        },
        {
          data: [42, 42, 39, 41],
          color: "#673349",
          name: "100 až 330 Kč",
        },
        {
          data: [49, 45, 35, 43],
          color: "#1ea3aa",
          name: "nad 330 Kč",
        },
      ],
    },
  ],
  [
    {
      title: "Domácnosti pod hranicí chudoby (<\u00A060\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [34, 52, 71, 57],
          color: "#dd505b",
          name: "do 100 Kč na osobu a den",
        },
        {
          data: [57, 45, 28, 41],
          color: "#673349",
          name: "100 až 330 Kč",
        },
        {
          data: [9, 3, 1, 2],
          color: "#1ea3aa",
          name: "nad 330 Kč",
        },
      ],
    },
    {
      title: "Nízkopříjmové domácnosti (60–100\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [6, 11, 31, 14],
          color: "#dd505b",
          name: "do 100 Kč na osobu a den",
        },
        {
          data: [64, 60, 54, 61],
          color: "#673349",
          name: "100 až 330 Kč",
        },
        {
          data: [31, 29, 15, 26],
          color: "#1ea3aa",
          name: "nad 330 Kč",
        },
      ],
    },
    {
      title: "Nadstandardně příjmové domácnosti (101–150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [2, 1, 10, 4],
          color: "#dd505b",
          name: "do 100 Kč na osobu a den",
        },
        {
          data: [23, 24, 33, 26],
          color: "#673349",
          name: "100 až 330 Kč",
        },
        {
          data: [75, 75, 57, 70],
          color: "#1ea3aa",
          name: "nad 330 Kč",
        },
      ],
    },
    {
      title: "Vysokopříjmové domácnosti (nad 150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [0, 0, 3, 2],
          color: "#dd505b",
          name: "do 100 Kč na osobu a den",
        },
        {
          data: [4, 7, 12, 6],
          color: "#673349",
          name: "100 až 330 Kč",
        },
        {
          data: [96, 93, 85, 92],
          color: "#1ea3aa",
          name: "nad 330 Kč",
        },
      ],
    },
  ],
  [
    {
      title: "Domácnosti s dětmi – příjem pod medián",
      series: [
        {
          data: [19, 33, 49, 38],
          color: "#dd505b",
          name: "do 100 Kč na osobu a den",
        },
        {
          data: [69, 62, 47, 57],
          color: "#673349",
          name: "100 až 330 Kč",
        },
        {
          data: [12, 5, 4, 5],
          color: "#1ea3aa",
          name: "nad 330 Kč",
        },
      ],
    },
    {
      title: "Domácnosti s dětmi – příjem nad medián",
      series: [
        {
          data: [1, 0, 11, 2],
          color: "#dd505b",
          name: "do 100 Kč na osobu a den",
        },
        {
          data: [49, 51, 53, 52],
          color: "#673349",
          name: "100 až 330 Kč",
        },
        {
          data: [50, 48, 36, 46],
          color: "#1ea3aa",
          name: "nad 330 Kč",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem pod medián",
      series: [
        {
          data: [16, 23, 43, 29],
          color: "#dd505b",
          name: "do 100 Kč na osobu a den",
        },
        {
          data: [54, 49, 40, 46],
          color: "#673349",
          name: "100 až 330 Kč",
        },
        {
          data: [30, 28, 17, 25],
          color: "#1ea3aa",
          name: "nad 330 Kč",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem nad medián",
      series: [
        {
          data: [1, 0, 8, 2],
          color: "#dd505b",
          name: "do 100 Kč na osobu a den",
        },
        {
          data: [19, 22, 29, 25],
          color: "#673349",
          name: "100 až 330 Kč",
        },
        {
          data: [80, 77, 63, 74],
          color: "#1ea3aa",
          name: "nad 330 Kč",
        },
      ],
    },
  ],
  [
    {
      title: "Vlastníci a družstevníci – příjem pod medián",
      series: [
        {
          data: [10, 14, 37, 18],
          color: "#dd505b",
          name: "do 100 Kč na osobu a den",
        },
        {
          data: [66, 56, 46, 55],
          color: "#673349",
          name: "100 až 330 Kč",
        },
        {
          data: [24, 30, 17, 27],
          color: "#1ea3aa",
          name: "nad 330 Kč",
        },
      ],
    },
    {
      title: "Vlastníci a družstevníci – příjem nad medián",
      series: [
        {
          data: [0, 0, 3, 0],
          color: "#dd505b",
          name: "do 100 Kč na osobu a den",
        },
        {
          data: [12, 10, 20, 11],
          color: "#673349",
          name: "100 až 330 Kč",
        },
        {
          data: [88, 90, 78, 89],
          color: "#1ea3aa",
          name: "nad 330 Kč",
        },
      ],
    },
    {
      title: "Nájemníci a podnájemníci – příjem pod medián",
      series: [
        {
          data: [31, 28, 42, 32],
          color: "#dd505b",
          name: "do 100 Kč na osobu a den",
        },
        {
          data: [64, 55, 49, 55],
          color: "#673349",
          name: "100 až 330 Kč",
        },
        {
          data: [5, 17, 9, 12],
          color: "#1ea3aa",
          name: "nad 330 Kč",
        },
      ],
    },
    {
      title: "Nájemníci a podnájemníci – příjem nad medián",
      series: [
        {
          data: [0, 1, 5, 2],
          color: "#dd505b",
          name: "do 100 Kč na osobu a den",
        },
        {
          data: [20, 16, 24, 21],
          color: "#673349",
          name: "100 až 330 Kč",
        },
        {
          data: [80, 83, 71, 77],
          color: "#1ea3aa",
          name: "nad 330 Kč",
        },
      ],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(
    "paq_zbyvajici_prijmy"
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
        {`Kolik jim zbude po zaplacení jídla a bydlení`}
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
                ymax={100}
                categories={categories}
                tooltipSuffix={tooltipSuffix}
                legend={true}
                stacking={"normal"}
              ></BarChart>
            </div>
          );
        }
      )}
      <p className="text-xs text-right">
        Zdroj dat:{" "}
        <a
          href="https://data.irozhlas.cz/zivot/zbyvajici-prijmy/"
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
