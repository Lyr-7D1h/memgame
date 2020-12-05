import { Col, Row, Typography } from "antd";
import NumberCard from "../common/NumberCard";

const SelectAmountCards = ({ options, onClick }) => {
  return (
    <>
      <Typography.Title style={{ textAlign: "center", paddingBottom: "20px" }}>
        How Many Cards
      </Typography.Title>
      <Row
        style={{ margin: 0 }}
        justify="center"
        gutter={{ xs: 16, sm: 32, md: 48 }}
      >
        {options.map((option) => (
          <Col key={option} span={4}>
            <NumberCard
              onClick={() => onClick(option)}
              style={{ cursor: "pointer" }}
              value={option}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default SelectAmountCards;
