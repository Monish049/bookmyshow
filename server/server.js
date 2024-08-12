const express = require("express");
const path = require("path");
const cors = require("cors");

require('dotenv').config();  // to access the environment variales.

const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRouter")
const movieRouter = require("./routes/movieRoute");
const theatreRouter = require("./routes/theatreRoute");
const showRouter = require("./routes/showRoute");
const bookingRouter = require("./routes/bookingRoute");

const app = express();
const clientBuildPath = path.join(__dirname, "../client/build");
console.log(clientBuildPath);

app.use(express.static(clientBuildPath)); // 8081 -> localhost:8081 -> index,html
app.use(
    cors({
        origin: ["http://localhost:3000", "https://book-my-show-w98p.onrender.com"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

// app.use("/api/bookings/verify", express.raw({ type: "application/json" }));
app.use(express.json());

connectDB();


/** Routes */
app.use('/api/users', userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Page not found" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server is running on port PORT");
})