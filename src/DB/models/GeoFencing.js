
const mongoose = require('mongoose');
const geoFencingSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    deviceName: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

const GeoFencing = mongoose.model('GeoFencing', geoFencingSchema);
module.exports = GeoFencing