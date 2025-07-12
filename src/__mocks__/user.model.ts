// __mocks__/user.model.ts

export const mockUser = {
  _id: "user123",
  userName: "samrat123",
  fullName: "Samrat KK",
  email: "samrat@example.com",
  contactNumber: "1234567890",
  gender: "male",
  status: "inactive",
  role: "user",
  isDeleted: false,
  comparePassword: jest.fn().mockResolvedValue(true),
  generateAccessToken: jest.fn(() => "fake-token"),
  generateRefreshToken: jest.fn(() => "fake-refresh-token"),
};

export const User = {
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn().mockReturnValue({
    select: jest.fn().mockResolvedValue(mockUser),
  }),
};
