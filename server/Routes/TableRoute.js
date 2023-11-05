const { SaveData, getTableData, getEditData, updateRow, deleteData } = require("../Controllers/TableController");

const { userVerification } = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();

router.post("/", userVerification);
router.post("/savetable", SaveData);
router.get("/table", getTableData);
router.get("/table-edit/:tableId", getEditData);
router.post("/update-table", updateRow);
router.delete("/delete-data/:id", deleteData);

module.exports = router;