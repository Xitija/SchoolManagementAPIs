import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "School Management API",
      version: "1.0.0",
      description: "API documentation for the School Management system",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
      {
        url: "https://schoolmanagementapis.onrender.com",
        description: "Production server",
      },
    ],
  },
  apis: ["./*.js", "./routes/*.js"], // Adjust the path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default { swaggerUi, swaggerDocs };
