import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashPassword,
      firstName,
      lastName,
    });
    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Error creating user" });
  }
};
