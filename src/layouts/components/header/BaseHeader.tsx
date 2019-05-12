import { Icon } from "antd";
import React from "react";
import styles from "./index.module.less";

const BaseHeader: React.FC = () => {
  return (
    <div className={styles.right}>
      <Icon className={`${styles.trigger}`} type="export" />
    </div>
  );
};

export default BaseHeader;
