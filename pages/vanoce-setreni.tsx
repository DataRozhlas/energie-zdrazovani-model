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
  "Podle typu domácnosti",
  "Podle ekonomického statusu",
];

const categories: string[] = [
  "Vánoční dárky pro dospělé",
  "Oslavy (jídlo, pití, návštěvy příbuzných)",
  "Vánoční dárky pro děti",
];

const tooltipSuffix: string = " %";

const color: string = "#dd505b";

const data: any = [
  [
    {
      title: "",
      series: [
        {
          data: [{ y: 29.1 }, { y: 18.8 }, { y: 14.8 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
  ],
  [
    {
      title: "Domácnosti pod hranicí chudoby (<\u00A060\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [{ y: 39.6 }, { y: 35.4 }, { y: 31.4 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
    {
      title: "Nízkopříjmové domácnosti (60–100\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [{ y: 39 }, { y: 25.8 }, { y: 21 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
    {
      title: "Nadstandardně příjmové domácnosti (101–150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [{ y: 27.4 }, { y: 15.8 }, { y: 11.7 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
    {
      title: "Vysokopříjmové domácnosti (nad 150\u00A0%\u00A0mediánu)",
      series: [
        {
          data: [{ y: 13.3 }, { y: 7.8 }, { y: 4.1 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
  ],
  [
    {
      title: "Domácnosti s dětmi – příjem pod medián",
      series: [
        {
          data: [{ y: 37.9 }, { y: 19.6 }, { y: 15.8 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
    {
      title: "Domácnosti s dětmi – příjem nad medián",
      series: [
        {
          data: [{ y: 19.5 }, { y: 8.1 }, { y: 6 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem pod medián",
      series: [
        {
          data: [{ y: 40.2 }, { y: 34.2 }, { y: 29 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
    {
      title: "Domácnosti bez dětí – příjem nad medián",
      series: [
        {
          data: [{ y: 23.7 }, { y: 14.7 }, { y: 10.1 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
  ],
  [
    {
      title: "Úplná s dětmi",
      series: [
        {
          data: [{ y: 28 }, { y: 12.6 }, { y: 9 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
    {
      title: "Dospělí bez dětí",
      series: [
        {
          data: [{ y: 24.6 }, { y: 16.2 }, { y: 12.4 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
    {
      title: "Samoživitelka s dětmi",
      series: [
        {
          data: [{ y: 37.1 }, { y: 26.2 }, { y: 30.2 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
    {
      title: "Samostatně žijící dospělý",
      series: [
        {
          data: [{ y: 41 }, { y: 32.5 }, { y: 26.1 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
  ],
  [
    {
      title: "Zaměstnanci",
      series: [
        {
          data: [{ y: 27.3 }, { y: 14.8 }, { y: 11.2 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
    {
      title: "OSVČ",
      series: [
        {
          data: [{ y: 21.9 }, { y: 12.6 }, { y: 13 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
    {
      title: "Studenti",
      series: [
        {
          data: [{ y: 6.6 }, { y: 3.6 }, { y: 3.6 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
    {
      title: "Na mateřské/rodičovské dovolené",
      series: [
        {
          data: [{ y: 38.7 }, { y: 29.4 }, { y: 8.6 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
    {
      title: "Důchodci",
      series: [
        {
          data: [{ y: 37.6 }, { y: 28.3 }, { y: 22.6 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
    {
      title: "Nezaměstnaní",
      series: [
        {
          data: [{ y: 24 }, { y: 16.8 }, { y: 24 }],
          color: "#dd505b",
          name: "podíl domácností, které na nich budou šetřit",
        },
      ],
    },
  ],
];

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("paq_vanoce_setreni");

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
        {`Budete letos výrazně šetřit na následujících výdajích?`}
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
                ymax={75}
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
