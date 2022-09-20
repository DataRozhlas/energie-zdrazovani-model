const ActiveButton = (props: {
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
      className={`${rounded} relative inline-flex items-center border bg-white px-4 py-2 text-xs font-medium hover:bg-gray-50 z-10 border-red-600 outline-none ring-1 ring-red-600 text-red-600`}
      value={props.index}
      onClick={handleButtonClick}
    >
      {props.text}
    </button>
  );
};

export default ActiveButton;
