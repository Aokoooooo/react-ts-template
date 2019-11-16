import { Icon, PageHeader } from "antd";
import { PageHeaderProps } from "antd/lib/page-header";
import React, {
  ComponentType,
  PropsWithChildren,
  useMemo,
  useState
} from "react";
import * as styles from "./index.module.less";

interface IBaseHeaderProps {
  defaultSubtitleStatus?: boolean;
  renderContent?: ComponentType<{ collapse: boolean }>;
}

const BaseHeader: React.FC<
  PropsWithChildren<PageHeaderProps & IBaseHeaderProps>
> = props => {
  const [collapse, setCollapse] = useState(
    typeof props.defaultSubtitleStatus === "undefined"
      ? true
      : props.defaultSubtitleStatus
  );

  const subTitle = useMemo(() => {
    return typeof props.subTitle === "undefined" ? (
      <span className={styles.subTitle} onClick={() => setCollapse(!collapse)}>
        {collapse ? "展开" : "收起"}
        <Icon type={collapse ? "down" : "up"} />
      </span>
    ) : (
      props.subTitle
    );
  }, [props.subTitle]);

  return (
    <div className={styles.container}>
      <PageHeader
        className={styles.header}
        title={props.title}
        subTitle={subTitle}
        avatar={props.avatar}
        backIcon={props.backIcon}
        tags={props.tags}
        extra={props.extra}
        breadcrumb={props.breadcrumb}
        footer={props.footer}
        onBack={props.onBack}
      >
        {
          <div>
            {props.renderContent && <props.renderContent collapse={collapse} />}
          </div>
        }
      </PageHeader>
    </div>
  );
};

export default BaseHeader;
