import { Router } from "express";
import { register } from "./user/register.controller";
import { login } from "./user/login.controller";
import getActiveUser from "./user/user.controller";

const appRouter = Router();
appRouter.get("/", (req, res) => {
  res.send("hello");
});
appRouter.post("/user/register", register);
appRouter.post("/user/login", login);
appRouter.get("/user", getActiveUser);

export default appRouter;
