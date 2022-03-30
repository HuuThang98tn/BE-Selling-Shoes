const mysql = require('mysql');

const db = mysql.createConnection({
	host :process.env.DATABASE_HOST,
	user :process.env.DATABASE_USER,
	password :process.env.DATABASE_PASS,
	database : process.env.DATABASE
});
const typeProduct =function(loaiSanPham){
	this.id_loaiSP_=loaiSanPham.id_loaiSP_; 
	this.ten_loaiSP_ =loaiSanPham.ten_loaiSP_; 
	this.gioi_tinhLSp_ =loaiSanPham.gioi_tinhLSp_; 
}
typeProduct.getAllTypeProduct =function(result){
	db.query('SELECT * FROM loaisanpham_',function(err,loaiSanPham){
		if (err) {
			result (null) ; 
		}else{
			result (loaiSanPham) ; 
			console.log(loaiSanPham);
		}
	});
}
typeProduct.insertTypeProduct = function(data,result){
	db.query("INSERT INTO loaisanpham_ SET ? ",data,function(err,loaiSanPham){
		if (err) {
			result(null);
				message:'Thêm sản phẩm thất bại';
		}else{
				result({id_loaiSP_ : loaiSanPham.insertId, ...data});
				message:'Thêm sản phẩm thành công';
		}
	});
}
//Xoá loại Sản phẩm 
typeProduct.deleteTypeProduct = function(id_loaiSP_,result){
	db.query("DELETE FROM loaisanpham_ WHERE id_loaiSP_ = ?", id_loaiSP_, function(err,loaiSanPham){
		if (err) {
			result(null)
		}else{
			result("Xoá sản phẩm có "+id_loaiSP_+" thành công");	
		}
	});
}
//Cập nhật loại sản phẩm 
typeProduct.updateTypeProduct = function(data,result){
	db.query("UPDATE loaisanpham_ SET ten_loaiSP_=?,gioi_tinhLSp_=?  WHERE id_loaiSP_=?",[data.ten_loaiSP_,data.gioi_tinhLSp_,data.id_loaiSP_],function(err,loaiSanPham){
		if (err) {
			result(null);

		}else{
			result(data);
		}
	});
}
module.exports  = typeProduct;