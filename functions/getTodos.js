const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB()

module.exports.handler = async (event) => {

    const params = {        
        TableName: process.env.TODO_TABLE_NAME
    }

    return dynamodb.scan(params).promise()
        .then(data => {            
            const todoList = [];
            for (let i = 0; i < data.Items.length; i++) {
                todoList.push({
                    id: data.Items[i].id.S,
                    name: data.Items[i].name.S,
                    description: data.Items[i].description.S
                });        
            }
            return todoList;            
        })
        .catch(err => {
            console.log(err)
        })
};