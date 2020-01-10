import { Breadcrumb, Icon } from "antd";
import React, { useMemo } from "react";
import { withRouter } from "react-router";
import history from "../../../config/history";
import { menuConfig } from "../../../config/menuConfig";

export default withRouter(props => {
  const config = useMemo(() => {
    const pathes = props.match.path.split("/");
    pathes.splice(0, 1);
    pathes.splice(2, pathes.length - 2);

    const config =
      pathes.length > 0
        ? menuConfig.filter(i => i.path === `/${pathes[0]}`)
        : [];

    if (pathes.length > 1) {
      try {
        const innerConfig = config[0].children!.filter(
          i => i.path === `/${pathes[1]}`
        );
        return { pathes, config, innerConfig };
      } catch (e) {
        return { pathes, config: [] };
      }
    }
    return { pathes, config };
  }, [props.match.path]);

  return (
    <Breadcrumb style={{ backgroundColor: "white", padding: "8px 24px 0" }}>
      <Breadcrumb.Item onClick={() => history.push("/")}>
        <Icon type="home" style={{ cursor: "pointer" }} />
      </Breadcrumb.Item>

      {config.pathes.map((i, k) => {
        const targetPath = `/${config.pathes.join("/")}`;
        return k === 0 ? (
          <Breadcrumb.Item key={String(k)}>
            {config.config[k].title}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item
            key={String(k)}
            onClick={() => {
              if (props.match.path !== targetPath) {
                history.push(targetPath);
              }
            }}
          >
            <span style={{ cursor: "pointer" }}>
              {config.innerConfig![0].title || ""}
            </span>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
});
