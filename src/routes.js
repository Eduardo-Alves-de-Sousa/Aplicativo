import { Router } from "express"; //importr apenas o Routers do express

import User from "./app/models/User";

const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ mensagem: "helo world" });
});

routes.get("/user", async (req, res) => {
  const user = await User.create({
    name: "Eduardo Alves",
    email: "eduardo@uespi.br",
    password_hash: "123456",
  });
  res.json(user);
});

export default routes;