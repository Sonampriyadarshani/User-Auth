import Agent from "../models/Agent.js";

// Add Agent
export const addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const newAgent = new Agent({ name, email, mobile, password });
    await newAgent.save();
    res.status(201).json({ message: "Agent created successfully", agent: newAgent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
