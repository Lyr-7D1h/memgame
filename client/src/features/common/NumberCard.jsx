import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";

const NumberCard = ({ value, onClick, style }) => {
  return (
    <div
      className="ant-card"
      onClick={() => onClick(value)}
      style={{
        height: "25vh",
        display: "flex",
        justifyContent: "center",
        ...style,
      }}
    >
      <Row type="flex" align="middle">
        <Col>
          <div
            style={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Title>{value}</Title>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NumberCard;
