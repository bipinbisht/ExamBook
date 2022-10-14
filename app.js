require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
// routers
const authRouter = require("./routes/auth");
const examRouter = require("./routes/exam");
const questionRouter = require("./routes/questionRoute");
const adminRouter = require("./routes/adminRoute");
const studentRouter = require("./routes/studentRoute");
const teacherRoute = require("./routes/teacherRoute");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("<h1>Exam Book</h1>");
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/exam", authenticateUser, examRouter);
app.use("/api/v1/question", authenticateUser, questionRouter);
app.use("/api/v1/student", authenticateUser, studentRouter);
app.use("/api/v1/teacher", authenticateUser, teacherRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
