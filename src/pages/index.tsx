import { PageHeader } from "antd";
import moment from "moment";
import React, { useMemo } from "react";

const Home: React.FC = () => {
  const getWelcomeWords = useMemo(() => {
    const time = Number(moment().format("HH"));
    let prefix = "";
    if (time >= 5 && time < 12) {
      prefix = "上午";
    } else if (time >= 12 && time < 14) {
      prefix = "中午";
    } else if (time >= 14 && time <= 18) {
      prefix = "下午";
    } else {
      prefix = "晚上";
    }
    return `${prefix}好`;
  }, []);

  return (
    <div>
      <PageHeader title={`${getWelcomeWords}`} />
    </div>
  );
};

export default Home;
