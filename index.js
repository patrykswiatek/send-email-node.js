const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.post('/sendemail', (req, res, next) => {
  console.log(req.body)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // Get from env file
    auth: {
      user: '',
      pass: '',
    },
  })

  const mailOptions = {
    // Get from env file
    from: '',
    to: '',
    subject: `Contact name: ${req.body.name}`,
    html: `<h1>Contact details</h1>
      <h2> name:${req.body.name} </h2><br>
      <h2> email:${req.body.email} </h2><br>
      <h2> phonenumber:${req.body.phonenumber} </h2><br>
      <h2> message:${req.body.message} </h2><br>`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      res.send('error')
    } else {
      console.log('Email sent: ' + info.response)
      res.send('Sent Successfully')
    }
  })
})

app.listen(1234)
