# User Authentication System

A simple and modular user authentication system built with **Node.js** and **TypeScript**. It includes user registration and login functionalities using **JWT**, password encryption with **bcryptjs**, and MongoDB integration via **Mongoose**.

---

## Deployment

- To clone this project

```bash
  git clone https://github.com/ShreyashSalian/user-authenication.git
```

- Go to the folder user-authenication

```bash
  cd user-authentication
```

- Initialize Git (If Required)

```bash
  git init
```

- Install NPM Packages

```bash
  npm install
```

- Setup Environment Variables,
  PORT=5000,
  MONGODB_URI=your_mongodb_connection_string,
  ACCESS_TOKEN=your_jwt_access_secret,
  REFRESH_TOKEN=your_jwt_refresh_secret,

- Build the Project (Compile TypeScript). Compiles .ts files to .js inside the dist/ directory.

```bash
  npm run build
```

- Run the compiled version:

```bash
  npm run start
```

- Run Unit Tests

```bash
  npm jest
```
