import { Button } from "antd";
import Bus, { useMessage } from "aqua-message";
import React, { useRef } from "react";
import { createAsyncAction } from "redux-aqua";
import PageHeader from "../../../../components/basic/pageHeader";
import { StoreState } from "../../../../config/store";
import { useActions } from "../../../../hooks/basicPageHooks";
import { changeIsMobile, changeSpining } from "../../../../layouts/store";
import {
  bindFormRef,
  FormComponent,
  getFormFieldsValue,
  resetFormFields
} from "../../../../utils/form";
import { changeSearchForm } from "../store/";
import SearchForm from "./HeaderSearchForm";

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
  const searchForm = useRef<FormComponent>(null);
  const actions = useActions({ changeSearchForm, test });

  const handleRestClick = () => {
    resetFormFields(searchForm);
  };

  const handleSearchClick = () => {
    console.log(getFormFieldsValue(searchForm));
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
    <PageHeader
      title={"待处理划款记录"}
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
      renderContent={({ collapse }) => (
        <div className={`${collapse ? "collapsed" : ""}`}>
          <SearchForm
            wrappedComponentRef={(component: FormComponent) => {
              bindFormRef(component, searchForm);
            }}
          />
        </div>
      )}
      defaultSubtitleStatus={false}
    />
  );
};

export default Header;
