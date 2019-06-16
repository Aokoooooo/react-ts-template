import React from "react";
import { withReducer } from "../../../utils/decorators";
import Header from "./components/Header";
import Table from "./components/Table";
import reducer from "./store/reducer";

@withReducer("transferOperation", reducer)
class TransferOperation extends React.Component {
  public render() {
    return (
      <div>
        <Header />
        <Table />
      </div>
    );
  }
}

export default TransferOperation;
