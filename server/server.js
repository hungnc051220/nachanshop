const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  )
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/mail", require("./routes/mail"));
app.use('/api/users', require("./routes/users"));
app.use('/api/dashboard', require("./routes/dashboard"));
app.use('/api/ghtk', require("./routes/ghtk"));
app.use('/api/gen', require('./routes/gen'));
