import React, { useState } from "react";
import { useOnMountAndUnmount } from "../../hooks/basicPageHooks";
import BasicPageLayout from "../../components/basicPageLayout";
import { Card, Skeleton } from "antd";

const SuspenseLoading = () => {
  const [visible, setVisible] = useState(false);
  useOnMountAndUnmount(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  });

  return (
    (visible && (
      <BasicPageLayout
        Header={() => (
          <Card>
            <Skeleton paragraph={false} title={{ width: "50%" }} />
          </Card>
        )}
        Content={() => (
          <Card>
            <Skeleton paragraph={{ rows: 6 }} />
          </Card>
        )}
      />
    )) || <></>
  );
};

export default SuspenseLoading;
