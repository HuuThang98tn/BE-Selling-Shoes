const mysql = require('mysql');

const db = mysql.createConnection({
	host :process.env.DATABASE_HOST,
	user :process.env.DATABASE_USER,
	password :process.env.DATABASE_PASS,
	database : process.env.DATABASE
});
//Hoá đơn 
const detailBill = function(chiTietHoaDon){
	this.id_hdct_ =chiTietHoaDon.id_hdct_ ; 
	this.tenSanPham_hdct  =chiTietHoaDon.tenSanPham_hdct  ; 
	this.donGiaNn_Sp_  =chiTietHoaDon.donGiaNn_Sp_; 
	this.soLuogNn_Sp_  =chiTietHoaDon.soLuogNn_Sp_; 
	this.ngayDh_sp  =chiTietHoaDon.ngayDh_sp  ; 
	this.mau_giay  =chiTietHoaDon.mau_giay  ; 
	this.size_giay  =chiTietHoaDon.size_giay  ; 
	this.id_HoaDon_=chiTietHoaDon.id_HoaDon_; 
	this.id_sanPham_   =chiTietHoaDon.id_sanPham_; 
}
detailBill.getAllChiTietHoaDon =function(result){
	db.query('SELECT * FROM detail_bill  ',function(err,chiTietHoaDon){
		if (err) {
			result (null);
		}else{
			result (chiTietHoaDon);
			console.chiTietHoaDon ; 
		}
	});
}
detailBill.userDetailBill= function(id_HoaDon_,result){
//	console.log(id_user_);
db.query('SELECT * FROM detail_bill WHERE id_HoaDon_ = ?',id_HoaDon_,function(err,chiTietHoaDon){
	if (err) {
		result(null);
	}else{
		result(chiTietHoaDon);
	}
});
}
detailBill.insertDetailBill = function(data,result){
	 //console.log(data);
	 if (typeof data !=='undefined') {
	 	data = JSON.parse(data);
	 }
	 for (var i = 0; i < data.length; i++) {
		// console.log(data[i])
		let dt_insert = []
		dt_insert.push(null)
		for (const [key, value] of Object.entries(data[i])) {
			dt_insert.push(value)
		}
		db.query("INSERT INTO detail_bill VALUE (?) ",[dt_insert],function(err,chiTietHoaDon){
			if (err) {
				console.log(err);
				message:'Lỗi mua hàng';
			}else{
				console.log(data);
				message:'Mua hàng thành công';
			}

		});
	}
}
//Xoá loại Sản phẩm 
detailBill.deleteDetailBill = function(id_hdct_,result){
	db.query("DELETE FROM detail_bill WHERE id_hdct_ = ?", id_hdct_, function(err,chiTietHoaDon){
		if (err) {
			result(null)
		}else{
			result("Xoá sản phẩm có "+id_hdct_+" thành công");	
		}
	});
}
//Cập nhật loại sản phẩm 
detailBill.updateDetailBill = function(data,result){
	db.query("UPDATE detail_bill SET tenSanPham_hdct=? , donGiaNn_Sp_=?,soLuogNn_Sp_=?,ngayDh_sp=?,id_HoaDon_=?,id_sanPham_=?  WHERE id_hdct_=?",[data.tenSanPham_hdct,data.donGiaNn_Sp_,data.soLuogNn_Sp_,data.ngayDh_sp,data.id_HoaDon_,data.id_sanPham_,data.id_hdct_],function(err,loaiSanPham){
		if (err) {
			result(null);

		}else{
			result(data);
		}
	});
}
module.exports  = detailBill;
