const express = require("express");
const path =require('path');
const dotenv = require('dotenv');
const mysql = require("mysql");
const cookieParser =require('cookie-parser');


const bodyParser = require('body-parser');

dotenv.config({path:'./.env'});

const app = express();


const db = mysql.createConnection({
	host :process.env.DATABASE_HOST,
	user :process.env.DATABASE_USER,
	password :process.env.DATABASE_PASS,
	database : process.env.DATABASE
});

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)

 app.use(express.json());	

 app.use(cookieParser());

app.set('view engine','hbs');

db.connect((error)=>{
	if (error) {
		console.log(error);
	}else{
		console.log("Kết nối cơ sở dữ liệu thành công");
	}
});
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

app.listen(process.env.PORT|| 3000,()=>{
	console.log("Server running");
});