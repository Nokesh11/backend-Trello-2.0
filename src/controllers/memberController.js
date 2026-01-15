const memberService = require('../services/memberService');

const memberController = {
  async getAllMembers(req, res, next) {
    try {
      const members = await memberService.getAllMembers();
      res.json(members);
    } catch (error) {
      next(error);
    }
  },

  async getMemberById(req, res, next) {
    try {
      const { id } = req.params;
      const member = await memberService.getMemberById(id);
      if (!member) {
        return res.status(404).json({ error: { message: 'Member not found' } });
      }
      res.json(member);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = memberController;
