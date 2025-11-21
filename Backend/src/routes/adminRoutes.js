import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import serviceAccount from "../serviceAccountKey.json.json" assert { type: "json" };
import admin from "firebase-admin";

const router = express.Router();


// Khởi tạo Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });
    if (!admin) {
      return res.status(404).send({
        message: "Không tìm thấy tài khoản trên",
      });
    }
    if (admin.password !== password) {
      return res.status(404).send({ message: "Sai mật khẩu" });
    }
    const token = jwt.sign({
      id: admin.id,
      username: admin.username,
      password: admin.password,
      role: admin.role, 
    },
    process.env.JWT_SECRET,
    {expiresIn: "1h"},
  );
  return res.status(200).send({
    message: "Đăng nhập thành công",
    token: token,
    user: {
      username: admin.username,
      role: admin.role,
    }
  })
  } catch (error) {
    console.log("Đăng nhập thất bại",error);
    return res.status(500).send({ message: "Đăng nhập bằng quản trị viên thất bại", error});
  }
});

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
