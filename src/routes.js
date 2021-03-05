import { Router } from "express"; //importr apenas o Routers do express

import UserController from "./app/controllers/UserControler";

import SessionControler from "./app/controllers/SessionControler"

import AuthMiddlware from './app/Middlewares/auth'

import User from "./app/models/User";

const routes = new Router();

routes.post("/sessions", SessionControler.store);

routes.post("/user", UserController.store);

routes.use(AuthMiddlware);
//todas as rotas após o middlwares só serão executadas se o ususario estiver logado
routes.put('/user', UserController.update)

routes.get("/", (req, res) => {
  return res.json({ mensagem: "helo world" });
});

export default routes;