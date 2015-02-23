# dynamodb-conn
AWS DyamoDB conection sample

##Dependencies
NodeJS:
````
brew install nodejs
````
Mocha
````
npm install mocha
````

##Installation
Download the repository:

````
git clone git@github.com:4yopping/dynamodb-conn.git && cd dynamodb-conn
````
Install:
````
npm install
````


##Documentation
This example is using [vogels](https://github.com/ryanfitz/vogels). and [Joi](https://github.com/hapijs/joi). Read the full documentation after you touch the models.

##Configuration
As you can see there is no AWS credentials configuration because it implies that you have the credentials configured at _~/.aws/credentials_. You need to be sure about use the right credentials checking if you have the correct iam policy, an example of that policy need to be something like this:

````
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DynamoDBSample1",
      "Effect": "Allow",
      "Action": [
        "dynamodb:*"
      ],
      "Resource": [
        "arn:aws:dynamodb:us-east-1:079577709174:table/*"
      ]
    },
    {
      "Sid": "DynamoDBSample2",
      "Effect": "Allow",
      "Action": [
        "dynamodb:ListTables"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
````

##4yopping AWS Databases Conection Convention
If you want to connect to some DynamoDB database you should create a nodejs __private__ module hosted in the [official 4yoping github repository](https://github.com/4yopping). If you don't have the permissions to do that request them to some 4yopping administrator.

The node module should contain every single model corresponding to the database schema in the models folder. Eventough, if you have some stored procedures, hacks, custom queries or related utilities to the DynamoDB table you need to put them, ordered in the module.

The module needs to be well configured in it's package.json file with the right 4yopping repositories, authors, tags and without any open source licensing.

##Licence
This projects and it's consequent projects, modules and connections will not be under any open source licence until the 4yopping CTO communicates the contrary in a formal way.
