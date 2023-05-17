const app = require("./app");
const { syncAndSeed } = require("./db");
require("dotenv").config();

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () =>
      console.log(`listening on port ${port}`)
    );
  } catch (ex) {
    console.log(ex);
  }
};

init();
