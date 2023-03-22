const { Company } = require("../db");

const CompanyAlls = async () => {
  try {
    const all = await Company.findAll();
    const res = all.map((e) => e.name);
    return res;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { CompanyAlls };
