var vogels = require('vogels'),
    joi = require('joi');

module.exports.Customer = vogels.define('Customer',{
    hashKey: 'cid',
    rangeKey: 'email',
    timestamps: true,
    schema: {
        cid: joi.string(),
        email: joi.string().email(),
        active: joi.boolean().default(true),
        firstName: joi.string().trim(),
        lastName: joi.string().trim(),
        cp: joi.number(),
        address: joi.string().trim(),
        tags: vogels.types.stringSet()
    },
    indexes : [{
        hashKey : 'email',
        rangeKey : 'cid',
        name : 'emailIndex',
        type : 'global'
    }]
});

