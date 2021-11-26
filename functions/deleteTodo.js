const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB()

module.exports.handler = async (event) => {
    const id = event.arguments.id

    const params = {
      Key: {
          "id": {
              S: id
          }
      },
      TableName: process.env.TODO_TABLE_NAME
    }


    return dynamodb.deleteItem(params).promise()
        .then(data => {            
            return {
                id
            }
        })
        .catch(err => {
          console.log(err)
        })
};