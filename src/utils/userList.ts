interface userList {
  userName: string;
  email: string;
  password: string;
  contactNumber: string;
  role: string;
  gender: string;
  fullName: string;
}

export const addUser: userList[] = [
  {
    fullName: "ShreyashSalian",
    email: "admin@gmail.com",
    password: "Admin@123",
    userName: "ShreyashSalian",
    role: "admin",
    gender: "male",
    contactNumber: "1234567890",
  },
  {
    fullName: "Admin Admin",
    email: "admin123@gmail.com",
    userName: "AdminAdmin",
    password: "Admin@123",
    role: "admin",
    gender: "male",
    contactNumber: "987654321",
  },

  {
    fullName: "Derran sam",
    email: "sam123@gmail.com",
    userName: "DarrenSam",
    password: "Derran@123",
    gender: "male",
    role: "user",
    contactNumber: "987654322",
  },
];
