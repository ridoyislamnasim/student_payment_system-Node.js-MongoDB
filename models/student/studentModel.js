// username ,useremail,password,confirmpassword

const mongoose = require("mongoose");
const Schema = mongoose.Schema
const studentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        address: {
            type: String,
            // minlength: 5,
            // maxlength: 100,
            // required: true,
        },
        phone: {
            type: Number,
            maxlength: 50,
        },
        month: {
            january: {
                type: Boolean,
                default: false
            },
            february: {
                type: Boolean,
                default: false
            },
            march: {
                type: Boolean,
                default: false
            },
            april: {
                type: Boolean,
                default: false
            },
            may: {
                type: Boolean,
                default: false
            },
            june: {
                type: Boolean,
                default: false
            },
            july: {
                type: Boolean,
                default: false
            },
            august: {
                type: Boolean,
                default: false
            },
            september: {
                type: Boolean,
                default: false
            },
            october: {
                type: Boolean,
                default: false
            },
            november: {
                type: Boolean,
                default: false
            },
            december: {
                type: Boolean,
                default: false
            }
        },
    },
    {
        timestamps: true,
    }
);
// databaseTable name , schema name 
const studentschema = mongoose.model("studentInfo", studentSchema);

module.exports = studentschema;