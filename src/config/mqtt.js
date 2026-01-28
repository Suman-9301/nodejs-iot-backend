const mqtt = require("mqtt");
const SensorReading = require("../models/SensorReading");

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on("connect", () => {
  console.log("MQTT connected");
  client.subscribe("iot/sensor/+/temperature");
});

client.on("message", async (topic, message) => {
  const deviceId = topic.split("/")[2];
  const temperature = parseFloat(message.toString());

  if (!isNaN(temperature)) {
    await SensorReading.create({
      deviceId,
      temperature
    });
  }
});

module.exports = client;
