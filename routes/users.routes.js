import { Router } from "express";
import UserController from "../controllers/users.controller";
import { bodySchemaValidator } from "../middlewares/schema.validator";
import { UpdateUser } from "../schemas/user";

const userRouter = Router({ mergeParams: true });

const userController = new UserController();

userRouter.get("/", userController.getAllUsers);

userRouter.get("/profile", userController.getUserProfile);

userRouter.get("/:id", userController.getUserById);

userRouter.patch(
  "/:id",
  bodySchemaValidator(UpdateUser),
  userController.updateUser,
);

userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
