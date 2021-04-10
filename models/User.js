// Import Schema and Model 
const {Schema, model} = require('../db/connection.js')

// Appointment Schema
const Appointment = new Schema ({
    name: {type: String, required: true},
    date: {type: String, require: true},
    process: {enum: ['Consultation', 'Cut', 'Color', 'Cut & Color'], required: true}
})