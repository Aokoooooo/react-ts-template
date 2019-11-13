import { Button, Icon, PageHeader } from "antd";
import Bus from "aqua-message";
import React, { useEffect, useState } from "react";
import { createAsyncAction } from "redux-aqua";
import { StoreState } from "../../../../config/store";
import { useActions, useMessage } from "../../../../hooks/basicPageHooks";
import { changeIsMobile, changeSpining } from "../../../../layouts/store";
import { changeSearchForm } from "../store/";
import * as styles from "./Header.module.less";
import SearchForm, { initSearchForm } from "./HeaderSearchForm";

export const test = (types: string) =>
  createAsyncAction<StoreState>((dispatch, getState) => {
    console.log(types);
    const state = getState().transferOperation;
    console.log(state);
    dispatch(changeIsMobile(false));
    dispatch(changeSpining());
    new Promise<string>((res, rej) => {
      setTimeout(() => {
        res("2s later");
      }, 2000);
    }).then(r => {
      console.log(r);
      dispatch(changeSpining());
    });
  });

const Header: React.FC = () => {
  const [searchForm, setSearchForm] = useState();
  const [collapse, setCollapse] = useState(true);
  const actions = useActions({ changeSearchForm, test });

  useEffect(() => () => {
    actions.changeSearchForm(initSearchForm);
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

  const sub = useMessage(Bus, {
    test: (msg: any) => {
      console.log(msg);
    },
    0: () => {
      console.log("???");
    }
  });

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
          </Button>,
          <Button key="3" onClick={() => actions.test("TTTT")}>
            TEST
          </Button>,
          <Button key="4" onClick={() => sub.emit("test", "TEST MSG")}>
            TEST MSG
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
