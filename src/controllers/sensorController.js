const SensorReading = require("../models/SensorReading");


exports.ingestReading = async (req, res) => {
  try {
    const { deviceId, temperature, timestamp } = req.body;

    if (!deviceId || temperature === undefined) {
      return res.status(400).json({
        message: "deviceId and temperature are required"
      });
    }

    const reading = await SensorReading.create({
      deviceId,
      temperature,
      timestamp: timestamp || Date.now()
    });

    res.status(201).json(reading);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getLatestReading = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const latest = await SensorReading.findOne({ deviceId })
      .sort({ timestamp: -1 });

    if (!latest) {
      return res.status(404).json({ message: "No readings found" });
    }

    res.json(latest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
