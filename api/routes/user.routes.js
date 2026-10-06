import express from "express";

const router = express.Router();

router.get("/user", (req, res) => {
  res.json({ message: "User route active" });
});

export default router;
