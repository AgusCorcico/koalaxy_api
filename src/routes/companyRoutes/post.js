const { Router } = require("express");
const router = Router();
const { Company } = require("../../db");

router.post("/", async (req, res) => {
    try {
        const { name } = req.body;

        if (name) {
            const findCompany = await Company.findOne({
            where: { name: name }
            })
            if(!findCompany){
                await Company.create( { name: name } );
                res.send("Company created successfully");
            }else{
                res.send('The Company is already created.') 
            }
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;