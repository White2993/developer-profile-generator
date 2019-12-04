const fs = require('fs');
const axios = require('axios');
const inquirer = require('inquirer');

/*inquirer.prompt([ { name: 'user', message: 'Github Profile Name?' } ])
    .then(({user}) => axios.get(`https://api.github.com/users/${user}`))
    .then(({ data }) => console.log(data))
    .catch(err => console.error(err));*/

const PDFDocument = require('pdfkit');
const doc = new PDFDocument;

doc.pipe(fs.createWriteStream('output.pdf')); 

doc.fontSize(30)

doc.circle(280, 100, 50)
   .lineWidth(3)
   .stroke()

doc.text('Hello...', 80, 170,{
    width: 412,
    align: 'center'
  })
   .moveDown()
   .text('My name is', 80, 212,{
    width: 412,
    align: 'center'
  })


  

doc.end();