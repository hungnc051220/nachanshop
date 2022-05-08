const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Notification = require("./models/notification");
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    httpServer.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}`)
    )
  )
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/mail", require("./routes/mail"));
app.use("/api/users", require("./routes/users"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/ghtk", require("./routes/ghtk"));
app.use("/api/gen", require("./routes/gen"));
app.use("/api/notifications", require("./routes/notifications"));

// Socket
const io = new Server(httpServer, {
  cors: {
    origin: process.env.SOCKET_URL,
  },
});

io.on("connection", (socket) => {
  console.log("User connected!");

  Notification.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      socket.emit("getAllNotification", result);
    });

  socket.on("setNotification", ({ name, total }) => {
    const notification = new Notification({ name, total, mark: false });
    notification.save().then((response) => {
      io.emit("getNotification", response);
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected!");
  });
});
