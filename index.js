const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt([{ name: "user", message: "Github Profile Name?" }])
  .then(({ user }) => axios.get(`https://api.github.com/users/${user}`))

  .then(({ data }) => {

    const PDFDocument = require("pdfkit");
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream("output.pdf"));

    doc.fontSize(20)

    doc.rect(0, 0, 610, 400)
      .lineWidth(3)
      .fillOpacity(0.8)
      .fillAndStroke("#76c9d4")
    
    doc
      .rect(235, 20, 130, 130)
      .lineWidth(3)
      .stroke();

    doc
      .fillColor('black')
      .text("Hello...", 100, 170, {
        width: 412,
        align: "center"
      })
      .fillColor('black')
      .moveDown()
      .text(`My name is ${data.name}`, 100, 212, {
        width: 412,
        align: "center"
      })
      .moveDown();

    if (data.company) {
      doc.text(`Currently with ${data.company}`, 100, 254, {
        width: 412,
        align: "center"
      });
    } else {
      doc.text('Currently looking for work', 100, 254, {
        width: 412,
        align: "center"
      });
    }
    doc
      .text(`${data.location}`, 170, 296, {
        width: 412,
        align: "left"
      })
      .text(`Github`, 135, 296, {
        link: `${data.html_url}`,
        width: 412,
        align: "center"
      })
      .text(`Blog`, 20, 296, {
        link: `${data.blog}`,
        width: 412,
        align: "right"
      });

    doc
      .lineJoin("round")
      .rect(50, 450, 220, 100)
      .text("Repositories", 400, 470, 250, 150)
      .moveDown()
      .text(`${data.public_repos}`, 440, 510, 250, 150)
      .stroke();

    doc
      .lineJoin("round")
      .rect(340, 450, 220, 100)
      .text("Followers", 120, 470, 250, 150)
      .moveDown()
      .text(`${data.followers}`, 155, 510, 250, 150)
      .stroke();

    doc
      .lineJoin("round")
      .rect(50, 600, 220, 100)
      .text("Github Stars", 100, 620, 250, 150)
      .stroke();

    doc
      .lineJoin("round")
      .rect(340, 600, 220, 100)
      .text("Following", 410, 620, 250, 150)
      .moveDown()
      .text(`${data.following}`, 445, 660, 250, 150)
      .stroke();

  
    axios
      .get(`${data.avatar_url}`, { responseType: "arraybuffer" })
      .then(({ data }) => {
        doc
          .image(data, 235, 20, {
            height: 130,
            width: 130
          })
          .stroke();

        doc.end();
      });
  })
  .catch(err => console.error(err));
