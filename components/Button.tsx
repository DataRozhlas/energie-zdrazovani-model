const Button = (props: {
  index: number;
  text: string;
  length: number;
  activeButton: number;
  setActiveButton: any;
}) => {
  const handleButtonClick = (event: any) => {
    props.setActiveButton(Number(event.target.value));
  };

  const addClass = props.activeButton === props.index ? "text-red-600" : "";

  if (props.index === 0) {
    return (
      <button
        type="button"
        className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 ${addClass}`}
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
        className={`relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 ${addClass}`}
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
      className={`relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 ${addClass}`}
      value={props.index}
      onClick={handleButtonClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
