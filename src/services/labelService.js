const { Label } = require('../models');

const labelService = {
  async createLabel({ name, color, boardId }) {
    return Label.create({ name, color, boardId });
  },

  async updateLabel(id, { name, color }) {
    const label = await Label.findByPk(id);
    if (!label) return null;
    
    if (name !== undefined) label.name = name;
    if (color !== undefined) label.color = color;
    await label.save();
    return label;
  },

  async deleteLabel(id) {
    const label = await Label.findByPk(id);
    if (!label) return false;
    await label.destroy();
    return true;
  },
};

module.exports = labelService;
