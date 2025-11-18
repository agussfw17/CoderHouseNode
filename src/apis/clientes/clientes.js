const db = require("../../config/db");

exports.getClientes = (req,res) => {
    db.query("SELECT * FROM CLIENTE", (error,results) => {
        if (error){
            console.error(error);
            return res.status(500).json({ error: "Error consultando" }); 
        }
        res.json(results);
    })
};