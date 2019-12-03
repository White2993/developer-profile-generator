const fs = require('fs');
const axios = require('axios');
const inquirer = require('inquirer');

const PDFDocument = require('pdfkit');
const doc = new PDFDocument;


inquirer.prompt([ { name: 'user', message: 'Github Profile Name?' } ])
    .then(({user}) => axios.get(`https://api.github.com/users/${user}`))
    .then(({ data }) => console.log(data))
    .catch(err => console.error(err));