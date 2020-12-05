import NumberCard from "../common/NumberCard";

const MemCard = ({ card, onClick }) => {
  const { status, flipped, clickable, value } = card;

  const handleOnClick = () => {
    if (clickable && flipped) {
      onClick(value);
    }
  };

  let backgroundColor;
  if (status === "correct") {
    backgroundColor = "green";
  } else if (status === "wrong") {
    backgroundColor = "red";
  }

  let cursor;
  if (flipped && status === null) {
    cursor = "pointer";
  } else {
    cursor = "default";
  }

  // Hide value when flipped, also makes it it harder to find what the value is using inspect
  let shownValue = flipped ? "" : value;

  return (
    <NumberCard
      style={{
        backgroundColor,
        cursor,
        color: "white",
      }}
      onClick={handleOnClick}
      value={shownValue}
    />
  );
};

export default MemCard;
