export const swaggersDocuments = {
  openapi: "3.0.0",
  info: {
    title: "This is a user authenication.",
    version: "1.0.0",
    description:
      "This is the swagger documentation for the SHREYASH PROJECT API.",
  },
  servers: [
    {
      url: "http://localhost:8000/",
      description: "This is the staging server.",
    },
    {
      url: "http://localhost:8000/",
      description: "This is the live server.",
    },
  ],

  tags: [
    {
      name: "User",
      description: "The users collection.",
    },
    {
      name: "login",
      description: "The login model description",
    },
    {},
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: {
            type: "integer",
            description: "This field is auto generated by mongoDB.",
          },

          email: {
            type: "string",
            description: "This field store's the email of the user.",
            example: "xyz@gmail.com",
          },
          fullName: {
            type: "string",
            description: "This field store's the full name.",
            example: "xyz xyz",
          },
          UserName: {
            type: "string",
            description: "This field store's the userName.",
            example: "xyz xyz",
          },
          gender: {
            type: "string",
            description: "This field store's the gender.",
            example: "male / female",
          },
          contactNumber: {
            type: "string",
            description: "This field store's the contact number.",
            example: "xyz xyz",
          },
          password: {
            type: "string",
            description: "This field store's the password of the user.",
            example: "Xyz@123456",
          },
          status: {
            type: "string",
            description: "This field store's the status.",
            example: "active / inactive",
          },
          role: {
            type: "string",
            description:
              "This field store's the role of the person whether it is admin or user",
            example: "admin",
          },
          isDeleted: {
            type: "boolean",
            description:
              "This field status of the employee whether he has resigned or has been removed",
            example: "admin",
          },

          created_at: {
            type: "string",
            format: "date",
            description: "This field store the creation time details.",
          },
          updated_at: {
            type: "string",
            format: "date",
            description: "The field store the update time details.",
          },
        },
      },
      Login: {
        type: "object",
        properties: {
          _id: {
            type: "integer",
            description: "This field is auto generated by mongoDB.",
          },
          userId: {
            type: "string",
            description: "This field store's the user id for reference.",
            example: "123567885fgfg",
          },
          email: {
            type: "string",
            description: "This field store's the email of the user.",
            example: "xyz@gmail.com",
          },
          accessToken: {
            type: "string",
            description: "This field store's the login token of the user.",
          },
          refreshToken: {
            type: "string",
            description:
              "This field stores the reset password token of the user.",
          },
          createdAt: {
            type: "string",
            format: "date",
            description: "This field store the creation time details.",
          },
          updatedAt: {
            type: "string",
            format: "date",
            description: "The field store the update time details.",
          },
        },
      },
      Error: {
        type: "object", //data type
        properties: {
          message: {
            type: "string", // data type
            description: "Error message", // desc
            example: "Not found", // example of an error message
          },
          internal_code: {
            type: "string", // data type
            description: "Error internal code", // desc
            example: "Invalid parameters", // example of an error internal code
          },
        },
      },
    },
    securitySchemes: {
      JWT: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
  },
  paths: {
    "/api/v1/auth/login": {
      post: {
        tags: ["Users"],
        consumes: {},
        summary: "Allow the admin to login.",
        description: "Allow the admin to login.",
        // security: [
        //   {
        //     JWT: [],
        //   },
        // ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userNameOrEmail: {
                    type: "string",
                    example: "abc@gmail.com",
                  },
                  password: {
                    type: "string",
                    example: "abc@123",
                  },
                },
              },
            },
          },
        },

        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    type: "string",
                  },
                },
              },
            },
          },
          401: {
            description: "UnAuthorized error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    message: "Please enter the valid email and password.",
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    message: "Please enter the valid email and password.",
                  },
                },
              },
            },
          },
          500: {
            description: "forbidden error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    message: "Sorry there is some error",
                  },
                },
              },
            },
          },
          default: {
            description: "Unexpected error",
          },
        },
      },
    },
    "/api/v1/auth/logout": {
      get: {
        tags: ["Users"],
        consumes: {},
        summary: "Allow the admin to logout.",
        description: "Allow the admin to logout.",
        security: [
          {
            JWT: [],
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    type: "string",
                  },
                },
              },
            },
          },
          401: {
            description: "UnAuthorized error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    message: "Please enter the valid email and password.",
                  },
                },
              },
            },
          },
          500: {
            description: "forbidden error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    message: "Sorry there is some error",
                  },
                },
              },
            },
          },
          default: {
            description: "Unexpected error",
          },
        },
      },
    },
    "/api/v1/users": {
      post: {
        tags: ["Users"],
        consumes: {},
        summary: "Allow the user to register.",
        description: "Allow the user to register.",
        // security: [
        //   {
        //     JWT: [],
        //   },
        // ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    example: "abc@gmail.com",
                  },
                  userName: {
                    type: "string",
                    example: "abc@gmail.com",
                  },
                  fullName: {
                    type: "string",
                    example: "abc@gmail.com",
                  },
                  contactNumber: {
                    type: "string",
                    example: "abc@gmail.com",
                  },
                  gender: {
                    type: "string",
                    example: "abc@gmail.com",
                  },
                  password: {
                    type: "string",
                    example: "abc@123",
                  },
                },
              },
            },
          },
        },

        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    type: "string",
                  },
                },
              },
            },
          },
          401: {
            description: "UnAuthorized error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    message: "Please enter the valid email and password.",
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    message: "Please enter the valid email and password.",
                  },
                },
              },
            },
          },
          500: {
            description: "forbidden error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    message: "Sorry there is some error",
                  },
                },
              },
            },
          },
          default: {
            description: "Unexpected error",
          },
        },
      },
      get: {
        tags: ["Users"],
        consumes: {},
        summary: "Get the detail of login user",
        description: "Get the detail of login user.",
        security: [
          {
            JWT: [],
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    type: "string",
                  },
                },
              },
            },
          },
          401: {
            description: "UnAuthorized error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    message: "Please enter the valid email and password.",
                  },
                },
              },
            },
          },
          500: {
            description: "forbidden error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    message: "Sorry there is some error",
                  },
                },
              },
            },
          },
          default: {
            description: "Unexpected error",
          },
        },
      },
    },
  },
};
