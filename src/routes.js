import { Router } from "express"; //importr apenas o Routers do express

import UserController from "./app/controllers/UserControler";

import SessionControler from "./app/controllers/SessionControler"

import AuthMiddlware from './app/Middlewares/auth'

import User from "./app/models/User";

import SessionControler from "./app/controllers/SessionControler";

import multer from 'multer';

import FileController from './app/controllers/FileControler';

import multerConfig from './config/multer'

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/file',upload.single('file') , FileController.store)

routes.post("/sessions", SessionControler.store);

routes.post("/user", UserController.store);

routes.use(AuthMiddlware);
//todas as rotas após o middlwares só serão executadas se o ususario estiver logado
routes.put('/user', UserController.update)

routes.get("/", (req, res) => {
  return res.json({ mensagem: "helo world" });
});

routes.post("/sessions", SessionControler.store)

export default routes;