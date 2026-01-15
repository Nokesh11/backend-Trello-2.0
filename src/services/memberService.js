const { Member } = require('../models');

const memberService = {
  async getAllMembers() {
    return Member.findAll({
      order: [['name', 'ASC']],
    });
  },

  async getMemberById(id) {
    return Member.findByPk(id);
  },
};

module.exports = memberService;
