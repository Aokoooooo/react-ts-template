import React from "react";
import BasicPageLayout from "../../../layouts/components/basicPageLayout";
import Header from "./components/Header";
import Table from "./components/Table";

const TransferOperation: React.FC = () => {
  return <BasicPageLayout Header={Header} Content={Table} />;
};

export default TransferOperation;
