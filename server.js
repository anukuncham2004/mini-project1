console.log("START");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const ticketRoutes = require("./routes/ticketsRoutes");
app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});