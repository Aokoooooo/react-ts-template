import { Icon, PageHeader } from "antd";
import { PageHeaderProps } from "antd/lib/page-header";
import React, {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState
} from "react";
import { safeBack } from "../../../utils";
import BreadcrumbBar from "./BreadcrumbBar";
import * as styles from "./index.module.less";

interface IHeaderProps {
  defaultSubtitleStatus?: boolean;
  renderContent?: FunctionComponent<{ collapse: boolean }>;
  showBackIcon?: boolean;
  hideBreadMenu?: boolean;
}

const BasicHeader: React.FC<
  PropsWithChildren<Omit<PageHeaderProps, "breadcrumb"> & IHeaderProps>
> = props => {
  const { onBack } = props;

  const [collapse, setCollapse] = useState(
    typeof props.defaultSubtitleStatus === "undefined"
      ? true
      : props.defaultSubtitleStatus
  );

  const subTitle = useMemo(() => {
    return typeof props.subTitle === "undefined" ? (
      <span className={styles.subTitle} onClick={() => setCollapse(!collapse)}>
        <span className={styles.subTitleText}>
          {collapse ? "展开" : "收起"}
        </span>
        <Icon className={collapse ? styles.subIconDown : ""} type="up" />
      </span>
    ) : (
      props.subTitle
    );
  }, [props.subTitle, collapse]);

  const goBack = useCallback(
    e => {
      typeof onBack === "function" ? onBack(e) : safeBack();
    },
    [onBack]
  );

  return (
    <div className={styles.container}>
      {!props.hideBreadMenu && <BreadcrumbBar />}
      <PageHeader
        className={styles.header}
        title={props.title}
        subTitle={subTitle}
        avatar={props.avatar}
        backIcon={
          props.showBackIcon
            ? props.backIcon || <Icon type="arrow-left" />
            : false
        }
        tags={props.tags}
        extra={props.extra}
        footer={props.footer}
        onBack={goBack}
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
