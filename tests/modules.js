'use strict'

var should = require('chai').should(),
    request = require('supertest'),
    vogels = require('vogels'),
    crypto = require('crypto'),
    sha = crypto.createHash('sha1'),
    randomWords = require('random-words'),
    AWS = vogels.AWS,
    dynamodb = new AWS.DynamoDB({apiVersion: 'latest',region: 'us-east-1'}),
    Customer = require('../models/Customer').Customer,
    randomEmail;

describe('Connection', function connection() {
    before(function before(done){
        AWS.config.update({region: 'us-east-1'});
        Customer.config({dynamodb: dynamodb});
        //Create a random email
        randomEmail = randomWords({exactly:2, join:'@'})+'.com';
        return done();
    });

    it('Scans the customers table looking for the email '+randomEmail+' that doesn\'t have been created yet', function scanNo(done){
        Customer.scan().where('email').equals('randomEmail').exec(function scansYes(err,data){
            if(err) return done(err);

            data.Items.should.be.an('array');
            data.Items.should.be.empty;
            done();
        });
    });

    it('Create a Customer and save it returning a success message', function itCreateCustomer(done){
        var dummie = new Customer({
            cid         : sha.update('Some Random Data'+randomEmail+Date.now).digest('hex'),
            email       : randomEmail,
            firstName   : 'Unit Automated',
            lastName    : 'Tester',
            cp          : 6760,
            address     : 'Zamora en la condesa',
            tags        : ['test','dummie','developer','random']
        });

        dummie.save(function dummieSave(err){
            if(err) return done(err);
            
            var email = dummie.get('email');
            email.should.be.a('string');
            email.should.be.equal(randomEmail);
            done();
        });
    });

    it('Scans the customers table and return an object', function itScans(done){
        Customer.scan().exec(function customerCallback(err,data){
            if(err) return done(err);

            data.should.be.an('object');
            data.Items.should.be.an('array');
            return done();
        });
    });

    it('Scans the customers table looking for '+randomEmail, function itQuery(done){
        Customer.scan().where('email').equals(randomEmail).exec(function scansYes(err,data){
            if(err) return done(err);

            data.should.be.an('object');
            data.Items.should.be.an('array');
            data.Items.should.not.be.empty;
            done();
        });
    });
    after(function after(){
        Customer.destroy({email:randomEmail},function destroy(err){
            if(err) return console.error('Dummie register was not deleted successfully');

            console.log('Dummie register was deleted');
        });
    });

});
