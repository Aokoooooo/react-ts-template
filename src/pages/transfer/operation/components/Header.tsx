import { Button, Icon, PageHeader } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { changeSearchForm, IChangeSearchFormAction } from "../store/action";
import * as styles from "./Header.module.less";
import SearchForm, { initSearchForm, ISearchForm } from "./HeaderSearchForm";

interface IHeader {
  changeSearchForm: (payload: ISearchForm) => IChangeSearchFormAction;
}

const Header: React.FC<IHeader> = (props: IHeader) => {
  const { changeSearchForm } = props;
  const [searchForm, setSearchForm] = useState();
  const [collapse, setCollapse] = useState(true);

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
    changeSearchForm(initSearchForm);
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

const mapAction = (dispatch: Dispatch) => {
  return bindActionCreators({ changeSearchForm }, dispatch);
};

export default connect(
  null,
  mapAction
)(Header);
