// Import Schema and Model 
const {Schema, model} = require('../db/connection.js')

// Appointment Schema
const Apmt = new Schema ({
    name: {type: String, required: true},
    date: {type: String, format: "date", required: true},
    type: {type: String, required: true}
})

// Client Schema
const ClientSchema = new Schema ({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    first: {type: String, required: true},
    last: {type: String, required: true},
    color: String,
    type: String,
    apmts: [Apmt]
}, {timestamps: true})

// Client Model
const Client = model("Client", ClientSchema)

// Export
module.exports = Client