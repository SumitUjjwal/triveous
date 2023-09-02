const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticate = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(token){
            const decode = jwt.verify(token, process.env.SECRET);
            // console.log(decode.userId);
            if(decode){
                req.headers.userID = decode.userID;
                next();
            }
            else{
                res.status(401).json({'error': 'Session expired or invalid'});
            }
        }
        else{
            res.status(401).json({'error': 'Not Authorized'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'error': error.message });
    }
}

module.exports = {
    authenticate
}