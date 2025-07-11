const mongoose = require('mongoose');

const vaultSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    site: String,
    siteUsername: String,
    sitePassword: String
});

module.exports = mongoose.model('Vault', vaultSchema);
