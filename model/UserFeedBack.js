const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});

//Sản phẩm
const Feedback = function (phanHoi) {
  this.id_phanHoi = phanHoi.id_phanHoi;
  this.trang_thai = phanHoi.trang_thai;
  this.phan_hoi = phanHoi.phan_hoi;
  this.id_user_ = phanHoi.id_user_;
};
Feedback.insertFeedback = function (data, result) {
  db.query("INSERT INTO db_phanhoi SET ? ", data, function (err, phanHoi) {
    if (err) {
      result(null);
      message: "Thêm  thất bại";
      console.log(err);
    } else {
      result({ id_phanHoi: phanHoi.insertId, ...data });
      message: "Thêm thành công";
    }
  });
};

Feedback.userFeedback = function (id_user_, result) {
  //	console.log(id_user_);
  db.query(
    "SELECT * FROM db_phanhoi WHERE id_user_ = ?",
    id_user_,
    function (err, phanHoi) {
      if (err) {
        result(null);
      } else {
        result(phanHoi);
      }
    }
  );
};
module.exports = Feedback;
