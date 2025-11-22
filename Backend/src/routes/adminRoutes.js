import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import admin from "firebase-admin";
import "dotenv/config";
const router = express.Router();

if (
  !process.env.FIREBASE_PROJECT_ID ||
  !process.env.FIREBASE_CLIENT_EMAIL ||
  !process.env.FIREBASE_PRIVATE_KEY
) {
  throw new Error("Missing Firebase env variables");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n").trim(),
    }),
  });
}

// ===== Route đăng nhập admin =====
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: "Không tìm thấy tài khoản" });
    }

    if (user.password !== password) {
      return res.status(404).send({ message: "Sai mật khẩu" });
    }

    // ✅ JWT chỉ chứa id, username, role
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).send({
      message: "Đăng nhập thành công",
      token,
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Đăng nhập thất bại:", error);
    return res
      .status(500)
      .send({ message: "Đăng nhập thất bại", error: error.message });
  }
});

// ===== Route lấy danh sách Firebase users =====
router.get("/users", async (req, res) => {
  try {
    const list = await admin.auth().listUsers();
    const users = list.users.map((u) => ({
      uid: u.uid,
      name: u.displayName,
      email: u.email,
      phone: u.phoneNumber,
      createdAt: u.metadata.creationTime,
    }));

    res.status(200).json({
      total: users.length,
      users,
    });
  } catch (error) {
    console.error("Lỗi lấy Firebase users:", error);
    res.status(500).json({ message: "Lấy danh sách user thất bại" });
  }
});

export default router;
