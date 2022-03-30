const mysql = require('mysql');

const db = mysql.createConnection({
	host :process.env.DATABASE_HOST,
	user :process.env.DATABASE_USER,
	password :process.env.DATABASE_PASS,
	database : process.env.DATABASE
});
//Sản phẩm mới nhất
const getAllNewProduct = function(sanPhamMoiNhat) {
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
getAllNewProduct.getAllNewProduct =function(result){
	db.query('SELECT * FROM product_ ORDER BY id_sanPham_ DESC LIMIT 5',function(err,sanPhamMoiNhat){
			if (err) {
				result (null);
			}else{
				result (sanPhamMoiNhat);
			}
	});

}
module.exports = getAllNewProduct;