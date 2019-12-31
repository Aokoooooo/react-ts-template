import { Icon, PageHeader } from "antd";
import { PageHeaderProps } from "antd/lib/page-header";
import React, {
  FunctionComponent,
  PropsWithChildren,
  useMemo,
  useState
} from "react";
import * as styles from "./index.module.less";

interface IHeaderProps {
  defaultSubtitleStatus?: boolean;
  renderContent?: FunctionComponent<{ collapse: boolean }>;
}

const BasicHeader: React.FC<
  PropsWithChildren<PageHeaderProps & IHeaderProps>
> = props => {
  const [collapse, setCollapse] = useState(
    typeof props.defaultSubtitleStatus === "undefined"
      ? true
      : props.defaultSubtitleStatus
  );

  const subTitle = useMemo(() => {
    return typeof props.subTitle === "undefined" ? (
      <span className={styles.subTitle} onClick={() => setCollapse(!collapse)}>
        <span>{collapse ? "展开" : "收起"}</span>
        <Icon className={collapse ? styles.subIconDown : ""} type="up" />
      </span>
    ) : (
      props.subTitle
    );
  }, [props.subTitle, collapse]);

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
            {props.renderContent ? (
              <div className={styles.collapseComponent}>
                {props.renderContent({ collapse })}
              </div>
            ) : (
              props.children
            )}
          </div>
        }
      </PageHeader>
    </div>
  );
};

export default BasicHeader;
