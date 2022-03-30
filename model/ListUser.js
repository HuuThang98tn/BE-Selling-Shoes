const mysql = require('mysql');

const db = mysql.createConnection({
	host :process.env.DATABASE_HOST,
	user :process.env.DATABASE_USER,
	password :process.env.DATABASE_PASS,
	database : process.env.DATABASE
});

const listUser_ =function(danhSachNguoiDung){
	this.id_user_ =danhSachNguoiDung.id_user_; 
	this.hoTen_ =danhSachNguoiDung.hoTen_; 
	this.email_ =danhSachNguoiDung.email_; 
	this.matKhau_ =danhSachNguoiDung.matKhau_; 
}
listUser_.getAllUser =function(result){
	db.query('SELECT * FROM user_registratiom',function(err,danhSachNguoiDung){
		if (err) {
			result (null) ; 
		}else{
			result (danhSachNguoiDung) ; 
			console.log(danhSachNguoiDung);
		}
	});
}
module.exports = listUser_;