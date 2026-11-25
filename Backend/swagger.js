const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
   definition: {
    openapi: "3.0.0",
    info: {
      title: "My Node.js API",
      version: "1.0.0",
      description: "API documentation for my backend",
    },
     servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security:[
        {
            BearerAuth: []
        }
    ],
  },
      
      apis: ["./users/*.js", "./auth/*.js", "./Task_Board/*.js"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;