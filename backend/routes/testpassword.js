const bcrypt = require("bcryptjs");

const generateHashedPassword = async () => {
  const password = "yourpassword"; // Change this to the password you want to hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("Hashed Password:", hashedPassword);
};

generateHashedPassword();
