import { Button, Icon, PageHeader } from "antd";
import React, { useEffect, useState } from "react";
import { useActions } from "../../../../hooks/basicPageHooks";
import { changeSearchForm } from "../store/";
import * as styles from "./Header.module.less";
import SearchForm, { initSearchForm } from "./HeaderSearchForm";

const Header: React.FC = () => {
  const [searchForm, setSearchForm] = useState();
  const [collapse, setCollapse] = useState(true);
  const actions = useActions({ changeSearchForm });
  useEffect(() => () => {
    changeSearchForm(initSearchForm);
  });

  const subTitle = (
    <span className={styles.subTitle} onClick={() => setCollapse(!collapse)}>
      {collapse ? "展开" : "收起"}
      <Icon type={collapse ? "down" : "up"} />
    </span>
  );

  const handleRestClick = () => {
    actions.changeSearchForm(initSearchForm);
    if (searchForm) {
      searchForm.props.form.resetFields();
    }
  };

  const handleSearchClick = () => {
    console.log("search");
  };

  return (
    <div className={styles.container}>
      <PageHeader
        backIcon={null}
        title={"待处理划款记录"}
        subTitle={subTitle}
        extra={[
          <Button key="1" onClick={handleRestClick}>
            重置
          </Button>,
          <Button key="2" type={"primary"} onClick={handleSearchClick}>
            查询
          </Button>
        ]}
        className={styles.header}
      >
        {!collapse && (
          <SearchForm
            wrappedComponentRef={(component: React.Component) =>
              setSearchForm(component)
            }
          />
        )}
      </PageHeader>
    </div>
  );
};

export default Header;
