import request from "supertest";
import app from "../app";

import { Login } from "../__mocks__/login.model";
import { registrationMail } from "../__mocks__/sendEmail";
import { mockUser, User } from "../__mocks__/user.model";

jest.mock("../models/user.model", () => ({
  User: require("../__mocks__/user.model").User,
  __esModule: true,
}));

jest.mock("../models/login.model", () => ({
  Login: require("../__mocks__/login.model").Login,
  __esModule: true,
}));

jest.mock("../utils/sendEmail", () => ({
  registrationMail: require("../__mocks__/sendEmail").registrationMail,
  __esModule: true,
}));

jest.setTimeout(10000);

afterEach(() => {
  jest.clearAllMocks();
});

describe("Register & Login APIs", () => {
  describe("User Registration", () => {
    it("should register user successfully", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockResolvedValue(mockUser);
      (registrationMail as jest.Mock).mockResolvedValue(undefined);

      const res = await request(app).post("/api/v1/users/register").send({
        userName: "samrat123",
        fullName: "Samrat KK",
        email: "samrat@example.com",
        password: "password",
        contactNumber: "1234567890",
        gender: "male",
      });

      expect(res.status).toBe(200);
      expect(User.create).toHaveBeenCalled();
    });

    it("should fail to register if user already exists", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).post("/api/v1/users/register").send({
        userName: "samrat123",
        fullName: "Samrat KK",
        email: "samrat@example.com",
        password: "password",
        contactNumber: "1234567890",
        gender: "male",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("User already exists");
    });
  });

  describe("User Login", () => {
    it("should login successfully with correct credentials", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      mockUser.comparePassword.mockResolvedValue(true);

      const res = await request(app).post("/api/v1/auth/login").send({
        userNameOrEmail: "samrat@example.com",
        password: "password",
      });

      expect(res.status).toBe(200);
      expect(res.body.data.accessToken).toBe("fake-access-token");
    });

    it("should fail login with incorrect password", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      mockUser.comparePassword.mockResolvedValue(false);

      const res = await request(app).post("/api/v1/auth/login").send({
        userNameOrEmail: "samrat@example.com",
        password: "wrongpassword",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid password");
    });

    it("should fail login if user does not exist", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const res = await request(app).post("/api/v1/auth/login").send({
        userNameOrEmail: "notfound@example.com",
        password: "pass",
      });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("User not found");
    });
  });
});
