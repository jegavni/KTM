import express from "express";
import Member from "../models/Member.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

router.post("/", async (req, res) => {
  const newMember = new Member(req.body);
  await newMember.save();
  res.json(newMember);
});

router.put("/:id", async (req, res) => {
  const updated = await Member.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.json({ message: "Member deleted" });
});

export default router;