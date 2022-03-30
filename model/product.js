const mysql = require('mysql');

const db = mysql.createConnection({
	host :process.env.DATABASE_HOST,
	user :process.env.DATABASE_USER,
	password :process.env.DATABASE_PASS,
	database : process.env.DATABASE
});

//Sản phẩm
const mProduct =function(sanPham){
	this.id_sanPham_=sanPham.id_sanPham_; 
	this.tenSp_ =sanPham.tenSp_; 
	this.nhaSX_ =sanPham.nhaSX_; 
	this.imgSP_ =sanPham.imgSP_; 
	this.giaTienSP_  =sanPham.giaTienSP_; 
	this.mieuTaSP_ =sanPham.mieuTaSP_; 
	this.binhLuanSP_ =sanPham.binhLuanSP_; 
	this.trang_thai_hang =sanPham.trang_thai_hang; 
	this.ngay_san_xuat =sanPham.ngay_san_xuat; 
	this.id_loaiSP_  =sanPham.id_loaiSP_; 
}
//lấy dữ liệu
mProduct.getAll =function(result){
	db.query('SELECT * FROM product_',function(err,sanPham){
		if (err) {
			result (null) ; 
		}else{
			result (sanPham) ; 
			console.log(sanPham);
		}
	});
}
//Thêm dữ liệu 
mProduct.insertProduct = function(data,result){
	db.query("INSERT INTO product_ SET ? ",data,function(err,sanPham){
		if (err) {
			result(null);
				message:'Thêm sản phẩm thất bại';
		}else{
				result({id_sanPham_: sanPham.insertId, ...data});
				message:'Thêm sản phẩm thành công';
		}
	});
}
//Xoá Sản phẩm 
mProduct.deleteProduct = function(id_sanPham_,result){
	db.query("DELETE FROM product_ WHERE id_sanPham_ = ?", id_sanPham_, function(err,sanPham){
		if (err) {
				result(null)
		}else{
			result("Xoá sản phẩm có "+id_sanPham_+" thành công");	
		}
	});
}
//Cập nhật sản phẩm 
mProduct.updateProduct = function(data,result){
	db.query("UPDATE product_ SET tenSp_=?,nhaSX_=? ,giaTienSP_=?,mieuTaSP_=?,binhLuanSP_=?,trang_thai_hang=?,ngay_san_xuat=? WHERE id_sanPham_=?",[data.tenSp_,data.nhaSX_,data.giaTienSP_,data.mieuTaSP_,data.binhLuanSP_,data.trang_thai_hang,data.ngay_san_xuat,data.id_sanPham_],function(err,sanPham){
				if (err) {
					result(null);
					console.log(error);

				}else{
					result(data);
					console.log(data)
				}
	});
}
module.exports  = mProduct;

