const Table = require("../Models/TableModel");


module.exports.SaveData = async (req, res, next) => {
    try {
        const { col1, col2, col3, col4, col5, createdAt } = req.body.inputData;
        console.log(req.body);

        const tableData = await Table.create({ col1, col2, col3, col4, col5, createdAt });

        res
      .status(201)
      .json({ message: "Table Data successfully", success: true, tableData });
       next();

    } catch (error) {
        console.error(error);
      }
};

module.exports.getTableData = async (req, res) => {
  try {
    const tableData = await Table.find().sort({createdAt: 1});

    res.status(200).json({tableData}); // passing as a response
  } catch (error){
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

module.exports.getEditData = async (req, res) => {
  try {
    const { tableId } = req.params;

    const tabledata = await Table.findById(tableId);

    res.status(200).json({tabledata}); //passing response as user
  } catch (error){
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

module.exports.updateRow = async (req, res) => {
  try {
    const {col1, col2, col3, col4, col5, tableIds} = req.body.inputData;
    console.log(col4)

    const updateData = await Table.findOneAndUpdate(
      { _id: tableIds }, // This is the filter criteria
      { $set: { col1: col1, col2: col2, col3: col3, col4: col4, col5: col5 } }, // This is the update
      { new: true } // This option returns the updated document
    );
    if(!updateData) {
      return res.status(404).json({ message: "data not found" });
    }

    res.json({ message: "Table data updated successfully", tabledata: updateData, success: true });
  } catch (error){
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
};

module.exports.deleteData = async (req, res) => { // admin deleting the user
  try {
    const dataId = req.params.id;

    const datas = await Table.findById(dataId);

    
    const deletedData = await Table.findByIdAndDelete(dataId);
    
    if (!deletedData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    

    return res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting data', error });
  }
};