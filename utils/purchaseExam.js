const { CustomAPIError } = require("../errors");
const purchase = async (examCredit, wallet) => {
  if (wallet < examCredit) {
    throw new CustomAPIError("Insufficent wallet balance");
  }

  return wallet - examCredit;
};
module.exports = {
  purchase,
};
