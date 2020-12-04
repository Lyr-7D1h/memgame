import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = ({ items }) => {
  const [Items, setItems] = useState([]);
  const { pathname } = useLocation();
  const selected = pathname.split("/")[1];

  useEffect(() => {
    setItems(
      items.map((item) => {
        let title, route, icon;
        if (typeof item === "object") {
          title = item.title;
          icon = item.icon;
          route = item.route ? item.route : title.toLowerCase();
        } else {
          title = item;
          route = item.toLowerCase();
          icon = "";
        }
        return (
          <Menu.Item icon={icon} key={route}>
            <Link to={route}>{title}</Link>
          </Menu.Item>
        );
      })
    );
  }, [pathname, items]);

  return (
    <Menu
      style={{
        height: "50px",
        width: "100%",
        marginRight: "20px",
        border: "none",
        lineHeight: "50px",
      }}
      defaultSelectedKeys={[selected]}
      mode="horizontal"
      theme="dark"
    >
      {Items}
    </Menu>
  );
};

export default Nav;
