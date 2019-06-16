import { Alert, Button, Card, Pagination, Table } from "antd";
import React, { useState } from "react";
import * as styles from "./Table.module.less";

const OperationTable: React.FC = () => {
  const columns = [
    { title: "指令编号" },
    { title: "监管号" },
    { title: "资金属性" },
    { title: "划出金额" },
    { title: "收款人姓名" },
    { title: "收款银行名称" },
    { title: "交换号" },
    { title: "收款银行账号" },
    { title: "详情" }
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSelectRowKeysChange = (selectRowKeys: any) => {
    setSelectedRowKeys(selectRowKeys);
  };

  const rowSelection = {
    onChange: handleSelectRowKeysChange,
    selectedRowKeys
  };

  return (
    <Card className={styles.card}>
      <div className={styles.toolbar}>
        <Button type="primary">划出</Button>
        <Button type="danger">不划出</Button>
        <Alert
          className={styles.alert}
          message="划款笔数: 总金额:"
          type="info"
        />
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        scroll={{ x: 991 }}
      />
      <Pagination className={styles.pagination} />
    </Card>
  );
};

export default OperationTable;
