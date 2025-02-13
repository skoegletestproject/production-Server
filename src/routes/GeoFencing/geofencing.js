const GeoFencing = require("../../DB/models/Geofencing");

const CreateGeoFencing= async (req, res) => {
    const { customerId, deviceName, latitude, longitude } = req.body;


const findDevice = await GeoFencing.findOne({ deviceName });
if (findDevice) {
    return res.status(400).send({ message: `GeoFencing already exists for Divice ${findDevice?.deviceName}` });
}

    const geoFencing = new GeoFencing({ customerId, deviceName, latitude, longitude });
    try {
        await geoFencing.save();
        res.status(201).send(geoFencing);
    } catch (error) {
        res.status(400).send(error);
    }
};


const GetGeoFencing= async (req, res) => {
    try {
        const geoFencings = await GeoFencing.find();
        res.status(200).send(geoFencings);
    } catch (error) {
        res.status(500).send(error);
    }
};


const UpdateGeoFencing= async (req, res) => {
    const { id } = req.params;
    const { customerId, deviceName, latitude, longitude } = req.body;
    try {
        const geoFencing = await GeoFencing.findByIdAndUpdate(id, { customerId, deviceName, latitude, longitude }, { new: true, runValidators: true });
        if (!geoFencing) {
            return res.status(404).send();
        }
        res.status(200).send(geoFencing);
    } catch (error) {
        res.status(400).send(error);
    }
};


const DeleteGeoFencing= async (req, res) => {
    const { id } = req.params;
    try {
        const geoFencing = await GeoFencing.findByIdAndDelete(id);
        if (!geoFencing) {
            return res.status(404).send();
        }
        res.status(200).send(geoFencing);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports={CreateGeoFencing,GetGeoFencing,UpdateGeoFencing,DeleteGeoFencing}