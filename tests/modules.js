'use strict'

var should = require('chai').should(),
    request = require('supertest'),
    vogels = require('vogels'),
    AWS = vogels.AWS,
    dynamodb = new AWS.DynamoDB({apiVersion: 'latest',region: 'us-east-1'}),
    Customer = require('../models/Customer').Customer;

describe('Connection', function connection() {
    before(function before(done){
        AWS.config.update({region: 'us-east-1'});
        Customer.config({dynamodb: dynamodb});
        return done();
    });

    it('Scans the customers table and return an object', function itScans(done){
        Customer.scan().exec(function customerCallback(err,data){
            if(err) return done(err);

            data.should.be.an('object');
            data.Items.should.be.an('array');
            return done();

        });
    });
});


