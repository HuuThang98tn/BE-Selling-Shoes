var sanPham = require("../model/product");
var favoriteProducts = require("../model/Favorite");
var getAllNewProduct = require("../model/ListNew");

var listUsers = require("../model/ListUser");
var insertProduct = require("../model/product");
var deleteProduct = require("../model/product");
var updateProduct = require("../model/product");

var getAllTypeProduct = require("../model/typeProduct");
var insertTypeProduct = require("../model/typeProduct");
var deleteTypeProduct = require("../model/typeProduct");
var updateTypeProduct = require("../model/typeProduct");

var getBill = require("../model/Bill");
var insertBill = require("../model/Bill");
var deleteBill = require("../model/Bill");
var updateBill = require("../model/Bill");
var billUsert = require("../model/Bill");

var getdetailBill = require("../model/DetailBill");
var insertDetailBill = require("../model/DetailBill");
var deleteDetailBill = require("../model/DetailBill");
var updateDetailBill = require("../model/DetailBill");
var userDetailBill = require("../model/DetailBill");

var insertFeedback = require("../model/UserFeedBack");
var userFeedback = require("../model/UserFeedBack");
var andmiFeedback = require("../model/AdminFeedBack");
var userAndmiFeedback = require("../model/AdminFeedBack");

const mysql = require("mysql");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});
//Đăng nhập
exports.login_api = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Làm ơn không bỏ trống email hoặc mật khẩu",
      });
    }
    db.query(
      "SELECT * FROM user_registratiom WHERE email_ = ?",
      [email],
      async (error, results) => {
        results = JSON.parse(JSON.stringify(results));
        console.log(results);
        if (
          !results ||
          !(await bcrypt.compare(password, results[0].matKhau_))
        ) {
          console.log("Error");
          return res.status(400).json({
            message: "Email hoặc mật khẩu không chính xác",
          });
        } else {
          return res.status(200).json({
            message: "Đăng nhập thành công",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
// Đăng ký
exports.register_api = async (req, res) => {
  console.log(req.body);
  const { name, email, password, passwordConfirm } = req.body;

  db.query(
    "SELECT * FROM user_registratiom WHERE email_=?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.status(400).json({
          message: "Email đã có trong hệ thống",
        });
      } else if (password !== passwordConfirm) {
        return res.status(400).json({
          message: "Mật khẩu không khớp",
        });
      } else if (password.length < 8 || passwordConfirm.length < 8) {
        return res.status(400).json({
          message: "Mật khẩu phải lớn hơn 8 ký tự",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      db.query(
        "INSERT INTO user_registratiom SET ?",
        { hoTen_: name, email_: email, matKhau_: hashedPassword },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            return res.status(200).json({
              message: "Đăng ký tài khoản thành công",
            });
          }
        }
      );
    }
  );
};
//Danh sách người dùng
exports.getAllUser = function (req, res) {
  listUsers.getAllUser(function (data) {
    res.send({ results: data });
  });
};
//Sản phẩm
exports.product = function (req, res) {
  sanPham.getAll(function (data) {
    res.send({ results: data });
  });
};
//Sản phẩm ưa thích
exports.favoriteProducts = function (req, res) {
  favoriteProducts.getAllfavoriteProducts(function (data) {
    res.send({ results: data });
  });
};
//Sản phẩm mới nhất
exports.getAllNewProduct = function (req, res) {
  getAllNewProduct.getAllNewProduct(function (data) {
    res.send({ results: data });
  });
};
//Thêm sản phẩm
exports.insertProduct = function (req, res) {
  var data = req.body;
  console.log(data);
  insertProduct.insertProduct(data, function (response) {
    res.send({ result: response });
  });
};
//Xoá Sản phẩm
exports.deleteProduct = function (req, res) {
  var data = req.params.id_sanPham_;
  deleteProduct.deleteProduct(data, function (response) {
    res.send({ result: response });
  });
};
//cập nhật sản phẩm
exports.updateProduct = function (req, res) {
  var data = req.body;
  updateProduct.updateProduct(data, function (response) {
    res.send({ result: response });
  });
};
//Loại sản phẩm
exports.getAllTypeProduct = function (req, res) {
  getAllTypeProduct.getAllTypeProduct(function (data) {
    res.send({ results: data });
  });
};
exports.insertTypeProduct = function (req, res) {
  var data = req.body;
  console.log(data);
  insertTypeProduct.insertTypeProduct(data, function (response) {
    res.send({ result: response });
  });
};
exports.deleteTypeProduct = function (req, res) {
  var data = req.params.id_loaiSP_;
  deleteTypeProduct.deleteTypeProduct(data, function (response) {
    res.send({ result: response });
  });
};
exports.updateTypeProduct = function (req, res) {
  var data = req.body;
  updateTypeProduct.updateTypeProduct(data, function (response) {
    res.send({ result: response });
  });
};
//Hoá đơn
exports.getBill = function (req, res) {
  getBill.getBill(function (data) {
    res.send({ results: data });
  });
};
exports.billUsert = function (req, res) {
  billUsert.billUsert(req.params.id_user_, function (response) {
    res.send({ results: response });
  });
};
exports.insertBill = function (req, res) {
  var data = req.body;
  insertBill.insertBill(data, function (response) {
    res.send({ result: response });
  });
};
exports.deleteBill = function (req, res) {
  var data = req.params.id_HoaDon_;
  deleteBill.deleteBill(data, function (response) {
    res.send({ result: response });
  });
};
exports.updateBill = function (req, res) {
  var data = req.body;
  updateBill.updateBill(data, function (response) {
    res.send({ result: response });
  });
};
//chi tiết hoá đơn
exports.getdetailBill = function (req, res) {
  getdetailBill.getdetailBill(function (data) {
    res.send({ results: data });
  });
};
exports.insertDetailBill = function (req, res) {
  var data = req.body.result;
  insertDetailBill.insertDetailBill(data, function (response) {
    res.send({ result: response });
  });
};
exports.deleteDetailBill = function (req, res) {
  var data = req.params.id_hdct_;
  deleteDetailBill.deleteDetailBill(data, function (response) {
    res.send({ result: response });
  });
};
exports.updateDetailBill = function (req, res) {
  var data = req.body;
  updateDetailBill.updateDetailBill(data, function (response) {
    res.send({ result: response });
  });
};
exports.userDetailBill = function (req, res) {
  userDetailBill.userDetailBill(req.params.id_HoaDon_, function (response) {
    res.send({ results: response });
  });
};
//phản hồi
exports.insertFeedback = function (req, res) {
  var data = req.body;
  console.log(data);
  insertFeedback.insertFeedback(data, function (response) {
    res.send({ result: response });
  });
};
exports.userFeedback = function (req, res) {
  userFeedback.userFeedback(req.params.id_user_, function (response) {
    res.send({ results: response });
  });
};
//AdminPhanHoi
exports.andmiFeedback = function (req, res) {
  var data = req.body;
  // data = JSON.parse(JSON.stringify(data));
  console.log(data);
  andmiFeedback.andmiFeedback(data, function (response) {
    res.send({ result: response });
  });
};
exports.userAndmiFeedback = function (req, res) {
  userAndmiFeedback.userAndmiFeedback(req.params.id_user_, function (response) {
    res.send({ results: response });
  });
};
