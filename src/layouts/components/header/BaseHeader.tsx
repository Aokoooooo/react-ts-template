import { Icon, Modal, Tooltip } from "antd";
import React from "react";
import styles from "./index.module.less";

const BaseHeader: React.FC = () => {
  const handleLogoutClick = () => {
    Modal.confirm({
      title: "提示",
      content: "确认要登出吗?",
      okText: "确认",
      cancelText: "取消",
      onOk: () => console.log("YES")
    });
  };

  return (
    <div className={styles.right}>
      <Tooltip title="登出">
        <Icon
          className={`${styles.trigger}`}
          type="export"
          onClick={handleLogoutClick}
        />
      </Tooltip>
    </div>
  );
};

export default BaseHeader;
