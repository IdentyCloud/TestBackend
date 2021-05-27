const mongoose = require("mongoose");

const environmentUri = () => {
  if (process.env.NODE_ENV == "produtions") {
    return process.env.MONGODB_URI_PD;
  } else {
    return process.env.MONGODB_URI_DEV;
  }
};

mongoose
  .connect(environmentUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((db) => console.log("DB is connect"))
  .catch((error) => console.log(error));
