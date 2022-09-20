import type { NextPage } from "next";
import Buttons from "../components/Buttons";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold leading-7 mb-4">
        Kolik procent z příjmů utratí za bydlení
      </h1>
      <Buttons></Buttons>
    </div>
  );
};

export default Home;
