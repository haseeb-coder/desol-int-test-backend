import express from "express";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./user/router/index.js";
import vehicleRoutes from "./vehicle/router/index.js";

const app = express();
const corsOptions = {
  origin: 'https://desolint-test.netlify.app',  // Allow only Netlify frontend
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,  // Allow cookies if needed
};
app.use(cors(corsOptions));
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API  DesolInt Test",
      version: "1.0.0",
      description:
        "API documentation for the Node Express application DesolInt Test",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./user/router/index.js", "./vehicle/router/index.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/vehicle", vehicleRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

export default app;
