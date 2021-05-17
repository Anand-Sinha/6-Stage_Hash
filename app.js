//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const Cryptr = require('cryptr');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/decrypt", function(req, res) {
  res.render("decrypt");
});

app.post("/encrypt", function(req, res) {
  // doing multiple encryption for added security
  const cryptr1 = new Cryptr(req.body.first_name);
  const cryptr2 = new Cryptr(req.body.last_name);
  const cryptr3 = new Cryptr(req.body.password_1);
  const cryptr4 = new Cryptr(req.body.password_2);
  const cryptr5 = new Cryptr(req.body.email);
  const cryptr6 = new Cryptr(req.body.mobile);

  const encryptedString1 = cryptr1.encrypt(req.body.seed_phrase);
  const encryptedString2 = cryptr2.encrypt(encryptedString1);
  const encryptedString3 = cryptr3.encrypt(encryptedString2);
  const encryptedString4 = cryptr4.encrypt(encryptedString3);
  const encryptedString5 = cryptr5.encrypt(encryptedString4);
  const encryptedString6 = cryptr6.encrypt(encryptedString5);
  res.render("home0",{result:"Your Resultant Hash",hash:encryptedString6});
});

app.post("/decrypt", function(req, res) {
  const cryptr1 = new Cryptr(req.body.first_name);
  const cryptr2 = new Cryptr(req.body.last_name);
  const cryptr3 = new Cryptr(req.body.password_1);
  const cryptr4 = new Cryptr(req.body.password_2);
  const cryptr5 = new Cryptr(req.body.email);
  const cryptr6 = new Cryptr(req.body.mobile);
try{
  const decryptedString1 = cryptr6.decrypt(req.body.hash);
  const decryptedString2 = cryptr5.decrypt(decryptedString1);
  const decryptedString3 = cryptr4.decrypt(decryptedString2);
  const decryptedString4 = cryptr3.decrypt(decryptedString3);
  const decryptedString5 = cryptr2.decrypt(decryptedString4);
  const decryptedString6 = cryptr1.decrypt(decryptedString5);
  res.render("home0",{result:"Your Resultant Seed Phrase",hash:decryptedString6});
}
catch(err){
  console.log(err);
  res.render("home0",{result:"Error",hash:"Unable to authenticate data or Unsupported state"});
}
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
