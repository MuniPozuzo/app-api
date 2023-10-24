var config = require('./dbconfig');
const sql = require('mssql');


async function getMonitoreo() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from Monitoreo_Supervisor");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getMonitoreo(DNI_Beneficiario) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.VarChar, DNI_Beneficiario)
            .query("SELECT * from Monitoreo_Supervisor where DNI_Beneficiario = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


async function addOrder(order) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('Id', sql.Int, order.Id)
            .input('Title', sql.NVarChar, order.Title)
            .input('Quantity', sql.Int, order.Quantity)
            .input('Message', sql.NVarChar, order.Message)
            .input('City', sql.NVarChar, order.City)
            .execute('InsertOrders');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}






module.exports = {
    getMonitoreo: getMonitoreo,
    getOrder : getOrder,
    addOrder : addOrder
}