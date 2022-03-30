const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});
//Sản phẩm ưa thích
const favoriteProducts = function (sanPhamUaThich) {
  this.id_HoaDon_ = sanPhamUaThich.id_HoaDon_;
  this.hoTenNn_Sp_ = sanPhamUaThich.hoTenNn_Sp_;
  this.bill_imgSp_ = sanPhamUaThich.bill_imgSp_;
  this.trangThai_bull = sanPhamUaThich.trangThai_bull;
  this.id_user_ = sanPhamUaThich.id_user_;
  this.id_sanPham_ = sanPhamUaThich.id_sanPham_;
};
favoriteProducts.getAllfavoriteProducts = function (result) {
  db.query(
    'SELECT id_sanPham_,COUNT(id_sanPham_) AS "soLuong" FROM bill_product_ GROUP BY id_sanPham_  ORDER BY soLuong DESC',
    function (err, sanPhamUaThich) {
      if (err) {
        result(null);
      } else {
        result(sanPhamUaThich);
        console.log(sanPhamUaThich);
      }
    }
  );
};
module.exports = favoriteProducts;
