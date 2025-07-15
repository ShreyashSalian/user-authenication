export const mockUser = {
  _id: "user123",
  email: "samrat@example.com",
  userName: "samrat123",
  password: "user@123",
  isDeleted: false,
  comparePassword: jest.fn().mockResolvedValue(true),
  generateAccessToken: jest.fn().mockReturnValue("fake-access-token"),
  generateRefreshToken: jest.fn().mockReturnValue("fake-refresh-token"),
};

export const User = {
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn().mockImplementation(() => ({
    ...mockUser, // Direct return from findById has methods too
    select: jest.fn().mockResolvedValue(mockUser),
  })),
};
