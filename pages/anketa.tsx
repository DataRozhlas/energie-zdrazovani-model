import type { NextPage } from "next";
import { usePostMessageWithHeight } from "../utils/hooks";

const Home: NextPage = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("cro-anketa");

  return (
    <div>
      <iframe
        src="https://projekty.rozhlas.cz/vote7/?i=1320"
        allowTransparency={true}
        frameBorder={0}
        style={{ width: "100%", height: "710px" }}
        className="poll"
      ></iframe>
    </div>
  );
};

export default Home;
