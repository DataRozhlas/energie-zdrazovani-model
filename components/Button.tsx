import { useRef, useEffect } from "react";

const Button = (props: {
  index: number;
  text: string;
  length: number;
  activeButton: number;
  setActiveButton: any;
}) => {
  const ref: any = useRef();

  useEffect(() => {
    ref.current && ref.current.focus();
  }, []);

  const handleButtonClick = (event: any) => {
    props.setActiveButton(Number(event.target.value));
  };

  if (props.index === 0) {
    return (
      <button
        ref={ref}
        type="button"
        autoFocus={true}
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-xs text-grey-700 font-medium hover:bg-gray-50 focus:z-10 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 focus:text-red-600"
        value={props.index}
        onClick={handleButtonClick}
      >
        {props.text}
      </button>
    );
  }

  if (props.index === props.length - 1) {
    return (
      <button
        type="button"
        className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-xs text-grey-700 font-medium hover:bg-gray-50 focus:z-10 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 focus:text-red-600"
        value={props.index}
        onClick={handleButtonClick}
      >
        {props.text}{" "}
      </button>
    );
  }

  return (
    <button
      type="button"
      className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-xs text-grey-700 font-medium hover:bg-gray-50 focus:z-10 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 focus:text-red-600"
      value={props.index}
      onClick={handleButtonClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
