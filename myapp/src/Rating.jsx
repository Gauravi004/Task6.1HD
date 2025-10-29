import { FaStar } from "react-icons/fa";

function Rating({ value }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "14px" }}>
      <FaStar style={{ color: "gold", fontSize: "14px" }} />
      {value}
    </span>
  );
}

export default Rating;
