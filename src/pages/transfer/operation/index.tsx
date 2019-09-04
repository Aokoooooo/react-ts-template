import React from "react";
import { injectReducer } from "../../../config/store";
import BasicPageLayout from "../../../layouts/components/basicPageLayout";
import Header from "./components/Header";
import Table from "./components/Table";
import { operationReducer } from "./store";

injectReducer("transferOperation", operationReducer);

const TransferOperation: React.FC = () => {
  return <BasicPageLayout Header={Header} Content={Table} />;
};

export default TransferOperation;
