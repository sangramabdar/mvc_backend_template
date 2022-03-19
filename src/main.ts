require("dotenv").config();
import { initServer, app } from "./config/initServer";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5050;

initServer().then(_ => {
  app.listen(PORT, () => {
    console.log("server is started ");
  });
});
