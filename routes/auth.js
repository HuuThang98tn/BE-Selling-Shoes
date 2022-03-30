const express = require("express");

const authController = require("../controller/auth");

const router = express.Router();

router.post("/register_api", authController.register_api);

router.post("/login_api", authController.login_api);

router.get("/danhSachNguoiDung", authController.getAllUser);

//sản phẩm
router.get("/sanPham", authController.product);

router.get("/sanPhamMoiNhat", authController.getAllNewProduct);

router.post("/themSanPham", authController.insertProduct);

router.delete("/xoaSanPham/:id_sanPham_", authController.deleteProduct);

router.put("/capNhatSanPham", authController.updateProduct);

//loại sản phẩm
router.get("/loaiSanPham", authController.getAllTypeProduct);

router.post("/themLoaiSanPham", authController.insertTypeProduct);

router.delete("/xoaLoaiSanPham/:id_loaiSP_", authController.deleteTypeProduct);

router.put("/capNhatLoaiSanPham", authController.updateTypeProduct);

//hoaDon
router.get("/sanPhamUaThich", authController.favoriteProducts);

router.get("/hoaDon", authController.getBill);

router.post("/themHoaDon", authController.insertBill);

router.delete("/xoaHoaDon/:id_HoaDon_", authController.deleteBill);

router.put("/capNhatHoaDon", authController.updateBill);

router.get("/getSanPhamTheoUser/:id_user_", authController.billUsert);

//Hoá đơn chi tiết
router.get("/chiTietHoaDon", authController.getdetailBill);

router.post("/themHoaDonChiTiet", authController.insertDetailBill);

router.delete("/xoaHoaDonChiTiet/:id_hdct_", authController.deleteDetailBill);

router.put("/capNhatHoaDonChiTiet", authController.updateDetailBill);

router.get(
  "/getHoaDonChiTietTheoidHoaDon/:id_HoaDon_",
  authController.userDetailBill
);

//phanHoi
router.post("/phanHoi", authController.insertFeedback);

router.get("/phanHoigetAll/:id_user_", authController.userFeedback);

router.post("/phanHoiAdmin", authController.andmiFeedback);

router.get("/adminphanHoigetAll/:id_user_", authController.userAndmiFeedback);

module.exports = router;
