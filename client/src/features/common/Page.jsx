import { Col, Layout, Row } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import { BarChartOutlined } from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

const Page = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ height: "50px" }}>
        <Row>
          <Col span={5}>
            <Link to="/">
              <Title style={{ color: "white", textAlign: "center" }}>
                MemGame
              </Title>
            </Link>
          </Col>
          <Col span={16}>
            <Nav
              items={[{ icon: <BarChartOutlined />, title: "Scoreboard" }]}
            />
          </Col>
          <Col span={3}>
            <Paragraph
              style={{
                color: "white",
                lineHeight: "50px",
                textAlign: "center",
              }}
            >
              Made with &lt;3 by Ivo
            </Paragraph>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: "20px", paddingTop: "50px" }}>
        {children}
      </Content>
    </Layout>
  );
};

export default Page;
