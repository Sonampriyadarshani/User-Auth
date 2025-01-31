import csvParser from "csv-parser";
import fs from "fs";
import Item from "../models/Item.js";
import Agent from "../models/Agent.js";

export const uploadCSV = async (req, res) => {
  const file = req.file;  // Assuming multer or another middleware is used to handle file uploads

  if (!file) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  const items = [];
  fs.createReadStream(file.path)
    .pipe(csvParser())
    .on("data", (row) => {
      items.push(row);
    })
    .on("end", async () => {
      try {
        // Save CSV data into the database
        await Item.insertMany(items);

        // Distribute items among agents
        const agents = await Agent.find();
        const itemsPerAgent = Math.floor(items.length / agents.length);
        let distributedItems = [];

        agents.forEach((agent, index) => {
          const agentItems = items.slice(index * itemsPerAgent, (index + 1) * itemsPerAgent);
          distributedItems.push({ agent: agent._id, items: agentItems });
        });

        // Save distributed items in the database (optional)
        // You can save the distribution as per your needs.

        res.json({ message: "File uploaded and tasks distributed successfully", distributedItems });
      } catch (error) {
        res.status(500).json({ message: "Error processing the file", error });
      }
    });
};
