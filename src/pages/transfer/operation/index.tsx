import React, { useEffect } from "react";
import { injectReducer } from "../../../config/store";
import Header from "./components/Header";
import Table from "./components/Table";
import reducer from "./store/reducer";

const TransferOperation: React.FC = () => {
  useEffect(() => injectReducer("transferOperation", reducer), []);
  return (
    <div>
      <Header />
      <Table />
    </div>
  );
};

export default TransferOperation;
