const jwt = require('jsonwebtoken');
const generateAuthToken = function(data){
        data  =  JSON.stringify(data);
        const token =  jwt.sign(data , 'payment-portal');
        return token;
    }
    
module.exports  = generateAuthToken;