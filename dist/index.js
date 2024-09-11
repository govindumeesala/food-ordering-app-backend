"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const MyUserRoute_1 = __importDefault(require("./routes/MyUserRoute"));
const MyRestaurantRoute_1 = __importDefault(require("./routes/MyRestaurantRoute"));
const cloudinary_1 = require("cloudinary");
const RestaurantRoute_1 = __importDefault(require("./routes/RestaurantRoute"));
const OrderRoute_1 = __importDefault(require("./routes/OrderRoute"));
const app = (0, express_1.default)();
// Database connection
mongoose_1.default
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Connected to the database"))
    .catch((error) => console.error("Database connection error:", error));
// Cloudinary configuration
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Middleware
app.use((0, cors_1.default)());
app.use("/api/order/checkout/webhook", express_1.default.raw({ type: "*/*" }));
app.use(express_1.default.json());
// Routes
app.use("/api/my/user", MyUserRoute_1.default);
app.use("/api/my/restaurant", MyRestaurantRoute_1.default);
app.use("/api/restaurant", RestaurantRoute_1.default);
app.use("/api/order", OrderRoute_1.default);
app.get("/health", (req, res) => {
    res.send({ message: "Health OK!" });
});
// Export the handler for Vercel
exports.default = (req, res) => {
    app(req, res);
};
