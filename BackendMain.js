const { google } = require('googleapis');
const express = require('express')
const bodyParser = require("body-parser");
const connection = require("./Connection");
const nodemailer=require('nodemailer')
const app = express()
const verificationCodes = new Map();


const CLIENT_ID =
const CLEINT_SECRET = 
const REDIRECT_URI = 
const REFRESH_TOKEN = 

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


const auth = new google.auth.GoogleAuth({
  credentials: require('./credentials.json'),
  scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'],
});
app.use(bodyParser.json());
app.post('/sign-in/', (req, res) => {
  const { email, password } = req.body
  connection.query("select * from User where email=? and password=?", [email, password], (err, result) => {
    if (err) {
      console.log("error occured")
      return res.status(500).json({ error: "an error occured" })
    }
    if (result.length == 1) {
      return res.status(200).json({ success: true, username: result[0].username })
    }
    return res.status(200).json({ success: false })
  })
})
app.post('/sign-up/', (req, res) => {
  const { email, username, password } = req.body
  connection.query("select * from User where email=?", [email], (err, result) => {
    if (err) {
      console.log("error occured", err)
      return res.status(500).json({ error: "an error occured" })
    }
    else if (result.length === 1) {
      return res.status(200).json({ email: "already exists" })
    }
    else if (result.length === 0) {
      connection.query("insert into User values (?,?,?)", [username, email, password], (errr, resul) => {
        if (errr) {
          console.log("error occured inside")
          return res.status(500).json({ error: "an error occured while inserting the data" })
        }
        return res.status(200).json({ success: true })
      })

    }
    else {
      return res.status(200).json({ success: false })
    }
  })
})
app.post('/create-event/', (req, res) => {
  const { username, email } = req.body;

  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
    summary: `${username} Login Event`,
    start: {
      dateTime: new Date().toISOString(),
      timeZone: 'UTC',
    },
    end: {
      dateTime: new Date(new Date().getTime() + 10 * 60 * 1000).toISOString(),
      timeZone: 'UTC',
    },
    // attendees: [
    //   { email: email },
    // ],
  };

  try {
    const response = calendar.events.insert({
      calendarId: ,
      resource: event,
    });
    console.log("Event created successfully")
    res.status(200).json({ message: 'Event created successfully' });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ message: 'Error creating event' });
  }
});
app.post('/verify-email/', (req, res) => {
  const { email } = req.body
  connection.query("select * from User where email=?", [email], (err, result) => {
    if (err) {
      console.log("error occured")
      return res.status(500).json({ error: "an error occured" })
    }
    if (result.length == 1) {
      return res.status(200).json({ success: true })
    }
    return res.status(200).json({ success: false })
  })
});
app.post('/sendCode/',async(req, res) => {
  const { email } = req.body
  verificationCodes.delete(email);
  const verificationCode = Math.floor(Math.random() * 10000);
  verificationCodes.set(email, verificationCode);

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: ,
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'kamalsaichettipally5535@gmail.com',
      to: email,
      subject: 'GMT verification code',
      text: `Verification code is ${verificationCode}`
    }

    try {
      const info = await transport.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      console.log(verificationCode);
      return res.status(200).json({ message: 'Verification code sent' });
    } catch (error) {
      console.log('Error occurred:', error.message);
      return res.status(500).json({ error: 'Failed to send verification code' });
    }
  } catch (error) {
    return error;
  }
})
app.post('/verifyCode/', (req, res) => {
  const { email, otp } = req.body;
  const expectedCode = verificationCodes.get(email);
  if (!expectedCode) {
    return res.status(400).json({ error: 'Verification code not found' });
  }
  if (otp === expectedCode) {
    verificationCodes.delete(email);
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ success: false, error: 'Invalid verification code' });
  }

})
app.post('/resetPassword/', (req, res) => {
  const { email, password } = req.body
  connection.query('update user set password=? where email=?', [password, email], (err, result) => {
    if (err) {
      console.log("error occured in /reset")
      return res.status(400).json({ error: 'error occured' })
    }
    console.log('password is succesfully updated');
    return res.status(200).json({ success: true })
  })
})
app.post('/auth/password/',(req,res)=>{
  console.log("query is ",req.query)
})
app.listen(9090, () => {
  console.log("server is listening on port 9090");
})
