const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});

//Sản phẩm
const userFeedback = function (phanHoiUser) {
  this.id_phanHoi_admin = phanHoiUser.id_phanHoi_admin;
  this.phanHoi_admin = phanHoiUser.phanHoi_admin;
  this.id_user_ = phanHoiUser.id_user_;
};
userFeedback.andmiFeedback = function (data, result) {
  db.query(
    "INSERT INTO db_phanhoi_user SET ? ",
    data,
    function (err, phanHoiUser) {
      if (err) {
        result(null);
        message: "Thêm  thất bại";
        console.log(err);
      } else {
        result({ id_phanHoi_admin: phanHoiUser.insertId, ...data });
        message: "Thêm thành công";
      }
    }
  );
};
userFeedback.userAndmiFeedback = function (id_user_, result) {
  db.query(
    "SELECT * FROM db_phanhoi_user WHERE id_user_ = ?",
    id_user_,
    function (err, phanHoiUser) {
      if (err) {
        result(null);
      } else {
        result(phanHoiUser);
      }
    }
  );
};
module.exports = userFeedback;
