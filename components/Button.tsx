const Button = (props: {
  text: string;
  setActiveButton: any;
  length: number;
  index: number;
}) => {
  const handleButtonClick = (event: any) => {
    props.setActiveButton(Number(event.target.value));
  };

  const rounded: string =
    props.index === 0
      ? "rounded-l-md"
      : props.index === props.length - 1
      ? "rounded-r-md"
      : "";

  return (
    <button
      type="button"
      className={`${rounded} relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-xs text-grey-700 dark:text-black font-medium hover:bg-gray-50 focus:z-10 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 focus:text-red-600`}
      value={props.index}
      onClick={handleButtonClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
