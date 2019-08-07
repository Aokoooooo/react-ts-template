const fs = require("fs-extra");

const copyDir = (from, to) => {
  console.log("postBuild started");
  fs.copy(from, to, err => {
    if (err) {
      throw new Error(err);
    }
    console.log("postBuild done");
  });
};

copyDir("./WEB-INF", "./build/WEB-INF");
