import { useEffect, useState } from "react";
import Page from "../common/Page";
import requester from "../utils/requester";
import errorHandler from "../utils/errorHandler";
import { Col, Menu, Row, Table } from "antd";

const columns = [
  { title: "Username", dataIndex: "username" },
  { title: "Score", dataIndex: "score", render: (score) => <b>{score}</b> },
  {
    title: "Played On",
    dataIndex: "createdAt",
    ellipsis: true,
    render: (date) => {
      return new Date(date).toLocaleString();
    },
  },
];

const getScoreboardData = (cardCount, cb) => {
  requester
    .get("scoreboard/" + cardCount)
    .then((data) => {
      cb(data);
    })
    .catch(errorHandler);
  return cb;
};

const ScoreboardPage = () => {
  const [scoreboardData, setScoreboardData] = useState(null);

  useEffect(() => {
    getScoreboardData(4, setScoreboardData);
  }, []);

  const changeData = (cardCount) => {
    getScoreboardData(cardCount, setScoreboardData);
  };

  return (
    <Page>
      <Row style={{ padding: "20px" }} align="middle" justify="center">
        <Menu
          onClick={(e) => changeData(e.key)}
          defaultSelectedKeys={["4"]}
          mode="horizontal"
        >
          <Menu.Item key="4">4 Cards</Menu.Item>
          <Menu.Item key="8">8 Cards</Menu.Item>
          <Menu.Item key="12">12 Cards</Menu.Item>
        </Menu>
      </Row>
      <Row align="middle" justify="center">
        <Col span={12}>
          <Table
            rowKey="id"
            pagination={false}
            columns={columns}
            dataSource={scoreboardData}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default ScoreboardPage;
