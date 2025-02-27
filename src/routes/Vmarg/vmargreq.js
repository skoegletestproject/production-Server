

const {Log,Realtime} = require("../../DB/models/Vmarg")

const DeviceLogs= async (req, res) => {
    try {
      const { deviceName, latitude, longitude, date, time } = req.body;
  
      // Create a new log entry
      const newLog = new Log({ deviceName, latitude, longitude, date, time });
      await newLog.save();
  
      res.status(201).json({ message: "Log created successfully", log: newLog });
    } catch (error) {
      res.status(500).json({ message: "Error creating log", error });
    }
  };
  
  

const addDeviceRealtime= async (req, res) => {
    try {
      const { deviceName, latitude, longitude, date, time } = req.body;
  
        const checkdevice = await Realtime.findOne({deviceName})
        if(checkdevice){
          return res.send("Device Exists")
        }
  
  
     
      const newLog = new Realtime({ deviceName, latitude, longitude, date, time });
      await newLog.save();
  
      res.status(201).json({ message: "Log created successfully", log: newLog });
    } catch (error) {
      res.status(500).json({ message: "Error creating log", error });
    }
  };
  
  const DeviceRealTime = async (req, res) => {
    try {
      const { deviceName } = req.params;
      const { latitude, longitude, date, time } = req.body;
  
      const updatedRealtime = await Realtime.findOneAndUpdate(
        { deviceName }, // Find real-time entry by deviceName
        { latitude, longitude, date, time }, // Update fields
        { new: true, upsert: true } // Return the updated document and create it if it doesn't exist
      );
  
      res.status(200).json({ message: "Real-time data updated", realtime: updatedRealtime });
    } catch (error) {
      res.status(500).json({ message: "Error updating real-time data", error });
    }
  };
  
 const GetDeviceLogs= async (req, res) => {
    const { deviceName, fromDate, toDate, fromTime, toTime } = req.query;
  
    try {
      const query = { ...(deviceName && { deviceName }) };
  
      if (fromDate && toDate) {
        query.date = {
          $gte: fromDate,
          $lte: toDate
        };
      }
  
      if (fromTime && toTime) {
        query.time = {
          $gte: fromTime,
          $lte: toTime
        };
      }
  
      console.log("Query:", query); // Debugging the query being sent
  
      const logs = await Log.find(query).sort({ date: 1, time: 1 }).select("deviceName latitude longitude date time");
  
      res.status(200).json(logs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching logs", error });
    }
  };
  
  // Get Route (GET /logs)
//   app.get("/logs", async (req, res) => {
//     try {
//       const logs = await Log.find(); // Fetch all logs
//       res.status(200).json(logs);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching logs", error });
//     }
//   });
  
  
  const GetRealtime =async(req,res)=>{
  
    const deviceName = req.params.deviceName;
  
    const result = await Realtime.findOne({deviceName:deviceName})
  
  
    res.send(result)
  }
  

  module.exports = {DeviceLogs,DeviceRealTime,GetDeviceLogs,GetRealtime,addDeviceRealtime}