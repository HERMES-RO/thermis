const express = require("express");
const db = require("./config/db");
require("dotenv").config();
const app = express();
const userRoutes = require("./users/user.route");
const authRoutes = require("./auth/auth.routes");
const task_routes = require("./Task_Board/taskboard.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./swagger")


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
)
const apiRouter = express.Router();

apiRouter.use("/user", userRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/task_board", task_routes);

app.use("/api", apiRouter);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listing on : ${PORT}`);
});
