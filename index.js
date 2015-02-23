var vogels = require('vogels'),
    AWS = vogels.AWS,
    crypto = require('crypto'),
    sha = crypto.createHash('sha1'),
    dynamodb = new AWS.DynamoDB({apiVersion: 'latest',region: 'us-east-1'}),
    Customer = require('./models/Customer').Customer;

AWS.config.update({region: 'us-east-1'});
Customer.config({dynamodb: dynamodb});

var fName = "Juan",
    lName = "Doe",
    mail = "juan.doe@4yopping.com",
    address = "Zamora en la Condesa, en la Miguel Hidalgo",
    cp = 11590
    tags= ['dummie','test','developer'];

var juanelo = new Customer({
    cid:        sha.update(fName+lName+Date.now).digest('hex'),
    email:      mail,
    firstName:  fName,
    lastName:   lName,
    cp:         cp,
    address:    address,
    tags:       tags
});

juanelo.save(function(err){
    if(err) return console.error('ERROR:'+err);

    console.log('Customer created:');
    console.log(juanelo.get('firstName') + ' ' + juanelo.get('lastName'));
});

Customer.
    scan().
    where('email').
    beginsWith('quantium@4yopping.com').
    exec(callback);

function callback(err,post){
    if(err) console.error('Error:' + err);
    console.log('Callback');
    console.info(JSON.stringify(post.Items));
}

