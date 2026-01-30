
const swaggerUi=require('swagger-ui-express')
const swaggerDoc=require('swagger-jsdoc')
const dotenv = require('dotenv');
const express=require('express');
const cors = require('cors');

const app=express();
app.use(cors()); //it is used to allow cross-origin requests from different domains. 
app.use(express.json());

app.use("/api/auth", require("./controller/auth"));
app.use("/api/employees",require("./controller/employees"));


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Employee Management API",
      version: "1.0.0",
      description: "API for managing employees with authentication",
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
    ],

    // 👇 ADD THIS PART
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    // 👇 GLOBAL SECURITY
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./controller/*.js"],
};



const swaggerDocs=swaggerDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const PORT=5000;

app.listen(PORT,()=>{ 
    console.log(`Server is running on port ${PORT}`);
})