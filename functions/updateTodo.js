const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB()

module.exports.handler = async (event) => {
    const id = event.arguments.id
    const name = event.arguments.name
    const description = event.arguments.description

    const params = {
      ExpressionAttributeNames: {
          "#n": "name",
          "#d": "description"          
      },
      ExpressionAttributeValues: {
          ":n": {
              S: name
          },
          ":d": {
              S: description
          }
      },
      Key: {
          "id": {
              S: id
          }
      },
      ReturnValues: "ALL_NEW",
      TableName: process.env.TODO_TABLE_NAME,
      UpdateExpression: "SET #n = :n, #d = :d"
  }

  return dynamodb.updateItem(params).promise()
      .then(data => {
          const body = data.Attributes
          return {
            id: body.id.S,
            name: body.name.S,
            description: body.description.S
          }
      })
      .catch(err => {
        console.log(err)
      })
};