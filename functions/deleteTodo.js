const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB()

module.exports.handler = async (event) => {
    console.log('event -> ', event)

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
            console.log('deleteItem -> ', data)         
            return {
                data
            }
        })
        .catch(err => {
          console.log(err)
        })
};