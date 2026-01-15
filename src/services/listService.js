const { List, Card } = require('../models');

const listService = {
  async createList({ title, boardId }) {
    // Get max position for the board
    const maxPosition = await List.max('position', { where: { boardId } }) || 0;
    return List.create({
      title,
      boardId,
      position: maxPosition + 1,
    });
  },

  async updateList(id, { title }) {
    const list = await List.findByPk(id);
    if (!list) return null;
    
    if (title !== undefined) list.title = title;
    await list.save();
    return list;
  },

  async deleteList(id) {
    const list = await List.findByPk(id);
    if (!list) return false;
    await list.destroy();
    return true;
  },

  async reorderLists(boardId, listIds) {
    // Update positions based on array order
    const updatePromises = listIds.map((listId, index) =>
      List.update({ position: index }, { where: { id: listId, boardId } })
    );
    await Promise.all(updatePromises);
    return true;
  },
};

module.exports = listService;
