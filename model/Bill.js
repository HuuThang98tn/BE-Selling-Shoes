const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});
//Hoá đơn
const mBill = function (hoaDon) {
  this.id_HoaDon_ = hoaDon.id_HoaDon_;
  this.hoTenNn_Sp_ = hoaDon.hoTenNn_Sp_;
  this.sdt_hd_ = hoaDon.sdt_hd_;
  this.tinh_thanh_pho = hoaDon.tinh_thanh_pho;
  this.quan_huyen = hoaDon.quan_huyen;
  this.phuong_xa = hoaDon.phuong_xa;
  this.dia_chi_cuThe = hoaDon.dia_chi_cuThe;
  this.tinh_trang_ = hoaDon.tinh_trang_;
  this.id_user_ = hoaDon.id_user_;
};
mBill.getBill = function (result) {
  db.query("SELECT * FROM bill_product_", function (err, hoaDon) {
    if (err) {
      result(null);
    } else {
      result(hoaDon);
      console.hoaDon;
    }
  });
};
mBill.billUsert = function (id_user_, result) {
  //	console.log(id_user_);
  db.query(
    "SELECT * FROM bill_product_ WHERE id_user_ = ?",
    id_user_,
    function (err, hoaDon) {
      if (err) {
        result(null);
      } else {
        result(hoaDon);
      }
    }
  );
};
mBill.insertBill = function (data, result) {
  //	console.log(data);
  db.query("INSERT INTO bill_product_ SET ? ", data, function (err, hoaDon) {
    if (err) {
      result(null);
      console.log(err);
      message: "Thêm thất bại";
    } else {
      result({ id_HoaDon_: hoaDon.insertId, ...data });
      //console.log(hoaDon)
      message: "Thêm thành công";
    }
  });
};
//Xoá loại Sản phẩm
mBill.deleteBill = function (id_HoaDon_, result) {
  db.query(
    "DELETE FROM bill_product_ WHERE id_HoaDon_ = ?",
    id_HoaDon_,
    function (err, hoaDon) {
      if (err) {
        result(null);
      } else {
        result("Xoá sản phẩm có " + id_HoaDon_ + " thành công");
      }
    }
  );
};
mBill.updateBill = function (data, result) {
  db.query(
    "UPDATE bill_product_ SET tinh_trang_=? WHERE id_HoaDon_=?",
    [data.tinh_trang_, data.id_HoaDon_],
    function (err, hoaDon) {
      if (err) {
        result(null);
      } else {
        result(data);
      }
    }
  );
};
module.exports = mBill;
