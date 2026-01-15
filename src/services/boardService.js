const { Board, List, Card, Label, Member, Checklist, ChecklistItem } = require('../models');

const boardService = {
  async getAllBoards() {
    return Board.findAll({
      order: [['createdAt', 'DESC']],
    });
  },

  async createBoard({ title, background }) {
    const board = await Board.create({ title, background });
    
    // Create default labels for the board
    const defaultLabels = [
      { name: '', color: '#61bd4f', boardId: board.id },
      { name: '', color: '#f2d600', boardId: board.id },
      { name: '', color: '#ff9f1a', boardId: board.id },
      { name: '', color: '#eb5a46', boardId: board.id },
      { name: '', color: '#c377e0', boardId: board.id },
      { name: '', color: '#0079bf', boardId: board.id },
    ];
    await Label.bulkCreate(defaultLabels);
    
    return board;
  },

  async getBoardById(id) {
    return Board.findByPk(id, {
      include: [
        {
          model: List,
          as: 'lists',
          order: [['position', 'ASC']],
          include: [
            {
              model: Card,
              as: 'cards',
              where: { archived: false },
              required: false,
              order: [['position', 'ASC']],
              include: [
                { model: Label, as: 'labels' },
                { model: Member, as: 'members' },
                {
                  model: Checklist,
                  as: 'checklists',
                  include: [{ model: ChecklistItem, as: 'items' }],
                },
              ],
            },
          ],
        },
        { model: Label, as: 'labels' },
      ],
      order: [
        [{ model: List, as: 'lists' }, 'position', 'ASC'],
        [{ model: List, as: 'lists' }, { model: Card, as: 'cards' }, 'position', 'ASC'],
      ],
    });
  },

  async updateBoard(id, { title, background }) {
    const board = await Board.findByPk(id);
    if (!board) return null;
    
    if (title !== undefined) board.title = title;
    if (background !== undefined) board.background = background;
    await board.save();
    return board;
  },

  async deleteBoard(id) {
    const board = await Board.findByPk(id);
    if (!board) return false;
    await board.destroy();
    return true;
  },

  async getBoardLabels(id) {
    return Label.findAll({
      where: { boardId: id },
      order: [['createdAt', 'ASC']],
    });
  },
};

module.exports = boardService;
