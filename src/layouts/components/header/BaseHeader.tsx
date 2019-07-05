import { Icon, Modal } from "antd";
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
      <Icon
        className={`${styles.trigger}`}
        type="export"
        onClick={handleLogoutClick}
      />
    </div>
  );
};

export default BaseHeader;
