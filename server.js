const   express = require('express'),
        bodyParser = require('body-parser'),
        request = require('request'),
        nodemailer = require('nodemailer'),
        app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/index.html')
});

app.post('/subscribe', (req, res) => {
    if(
      req.body.captcha === undefined ||
      req.body.captcha === '' ||
      req.body.captcha === null
    ){
      return res.json({"success": false, "msg":"Por favor selecciona el captcha"});
    }
  
    // Secret Key
    const secretKey = '6Lc35J0UAAAAACcLBTcx09yNgmp9XotIr6td_wxo';
  
    // Verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;
  
    // Make Request To VerifyURL
    request(verifyUrl, (err, response, body) => {
      body = JSON.parse(body);
  
      // If Not Successful
      if(body.success !== undefined && !body.success){
        return res.json({"success": false, "msg":"Failed captcha verification"});
      }

      //If Successful
      let contacto = req.body;
      const output = `
      <p>Tienes una nueva solicitud!!!!</p>
      <h3> Detalles de la solicitud de: ${contacto.razonSocial} </h3> 
      <ul>
          <li>Nombre: ${contacto.nombre}</li>
          <li>Teléfono: ${contacto.telefono}</li>
          <li>Correo electrónico: ${contacto.email}</li>
          <li>Descripción o Comentario: ${contacto.desCom}</li>
      </ul>
      `;

        let transporter = nodemailer.createTransport({
            host: 'kepler-oilgas.com.mx',
            port: 587,
            secure: false,
            tls:{
                rejectUnauthorized: false
            },
            auth: {
                user: 'contacto@kepler-oilgas.com.mx',
                pass: '?ra91f9V'
            }
        })

        let mailOptions = {
            from: '"KEPLER CONTACTO" <contacto@kepler-oilgas.com.mx>',
            to: 'contacto@kepler-oilgas.com.mx',
            subject: 'NUEVA SOLICITUD!!!!',
            text: 'Prueba',
            html: output
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return console.log(error);
            }
        })

      return res.json({"success": true, "msg":"Se ha enviado tu información y en breve te contactaremos"});
    });
  });

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Esta vivo")
});