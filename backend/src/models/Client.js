const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    entity_type: {
      type: String,
      required: [true, 'Entity type is required'],
      enum: ['Pvt Ltd', 'LLC', 'LLP', 'Sole Proprietor', 'Partnership', 'Other'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Client', clientSchema);