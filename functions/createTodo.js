const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB()

module.exports.handler = async (event) => {    
    const id = event.arguments.id
    const name = event.arguments.name
    const description = event.arguments.description    

    const params = {
        Item: {
            "id": {
                S: id
            },
            "name": {
                S: name
            },
            "description": {
                S: description
            }            
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: process.env.TODO_TABLE_NAME
    }

    return dynamodb.putItem(params).promise()
        .then(data => {            
            return {
                id,
                name,
                description
            }
        })
        .catch(err => {
            console.log(err)
        })
};