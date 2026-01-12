import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Hotel from "../models/Hotel.js";
import generateToken from "../utils/generateToken.js";

export const registerHotel = async (req, res) => {
  try {
    const {
      hotelName,
      email,
      contactPhone,
      locationText,
      peakDays,
      category,
      password,
      confirmPassword,
      acceptedTerms,
    } = req.body;

    // 1. Basic validation
    if (
      !hotelName ||
      !email ||
      !contactPhone ||
      !locationText ||
      !category ||
      !password ||
      !confirmPassword
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    if (!acceptedTerms) {
      return res.status(400).json({
        message: "You must accept the Terms and Privacy Policy",
      });
    }

    // 2. Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create User
    const user = await User.create({
      name: hotelName,
      email,
      password: hashedPassword,
      role: "HOTEL",
      authProvider: "LOCAL",
      termsAcceptance: {
        accepted: true,
      },
    });

    // 5. Create Hotel Profile
    await Hotel.create({
      user: user._id,
      hotelName,
      contactPhone,
      locationText,
      peakDays,
      category,
    });

    // 6. Generate token
    const token = generateToken(user);

    // 7. Respond
    res.status(201).json({
      message: "Hotel account created successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
