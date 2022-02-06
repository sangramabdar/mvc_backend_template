import { initServer, app } from "./config/initserver";

initServer().then(_ => {
  app.listen(5050, () => {
    console.log("server is started ");
  });
});
