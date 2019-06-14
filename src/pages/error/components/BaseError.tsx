import { Button } from "antd";
import React from "react";
import history from "../../../config/history";
import styles from "./BaseError.module.less";

export interface IBaseError {
  title: string;
  desc: string;
  img?: string;
  actionConfig?: {
    hideBack?: boolean;
    hideBackHome?: boolean;
  };
}

const BaseError: React.FC<IBaseError> = (props: IBaseError) => {
  const handleBackClick = (): void => {
    if (history.length <= 2) {
      history.push("/");
      return;
    }
    history.goBack();
  };

  const handleBackHomeClick = (): void => {
    history.replace("/");
  };

  const { title, desc, img, actionConfig } = props;
  return (
    <div className={styles.error}>
      <div className={styles.imgBlock}>
        <div
          className={styles.imgEle}
          style={{ backgroundImage: `url(${img})` }}
        />
      </div>
      <div className={styles.content}>
        <h1>{title}</h1>
        <div className={styles.desc}>{desc}</div>
        <div className={styles.actions}>
          {!(actionConfig && actionConfig.hideBack) && (
            <Button onClick={handleBackClick}>后退</Button>
          )}
          {!(actionConfig && actionConfig.hideBackHome) && (
            <Button onClick={handleBackHomeClick} type="primary">
              返回首页
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BaseError;