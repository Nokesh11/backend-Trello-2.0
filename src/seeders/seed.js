const { sequelize, Board, List, Card, Label, Member, Checklist, ChecklistItem } = require('../models');

const seedDatabase = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Create sample members
    const members = await Member.bulkCreate([
      {
        name: 'John Doe',
        email: 'john@example.com',
        initials: 'JD',
        color: '#0079bf',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        initials: 'JS',
        color: '#61bd4f',
      },
      {
        name: 'Bob Wilson',
        email: 'bob@example.com',
        initials: 'BW',
        color: '#eb5a46',
      },
      {
        name: 'Alice Brown',
        email: 'alice@example.com',
        initials: 'AB',
        color: '#c377e0',
      },
    ]);
    console.log('Members created');

    // Create sample boards
    const board = await Board.create({
      title: 'Project Alpha',
      background: '#0079bf',
    });

    const board2 = await Board.create({
      title: 'Marketing Campaign',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    });

    const board3 = await Board.create({
      title: 'Personal Tasks',
      background: '#519839',
    });
    console.log('Boards created');

    // Create labels for the board
    const labels = await Label.bulkCreate([
      { name: 'Bug', color: '#eb5a46', boardId: board.id },
      { name: 'Feature', color: '#61bd4f', boardId: board.id },
      { name: 'Urgent', color: '#ff9f1a', boardId: board.id },
      { name: 'In Progress', color: '#f2d600', boardId: board.id },
      { name: 'Review', color: '#c377e0', boardId: board.id },
      { name: 'Documentation', color: '#0079bf', boardId: board.id },
    ]);
    console.log('Labels created');

    // Create lists
    const todoList = await List.create({
      title: 'To Do',
      position: 0,
      boardId: board.id,
    });

    const inProgressList = await List.create({
      title: 'In Progress',
      position: 1,
      boardId: board.id,
    });

    const reviewList = await List.create({
      title: 'Review',
      position: 2,
      boardId: board.id,
    });

    const doneList = await List.create({
      title: 'Done',
      position: 3,
      boardId: board.id,
    });
    console.log('Lists created');

    // Create cards in To Do list
    const card1 = await Card.create({
      title: 'Set up project repository',
      description: 'Initialize the Git repository and add the initial project structure with README.',
      position: 0,
      listId: todoList.id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    });

    const card2 = await Card.create({
      title: 'Design database schema',
      description: 'Create the entity relationship diagram and define all tables with their relationships.',
      position: 1,
      listId: todoList.id,
    });

    const card3 = await Card.create({
      title: 'Write API documentation',
      position: 2,
      listId: todoList.id,
    });

    // Create cards in In Progress list
    const card4 = await Card.create({
      title: 'Implement user authentication',
      description: 'Add JWT-based authentication with login and registration endpoints.',
      position: 0,
      listId: inProgressList.id,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    });

    const card5 = await Card.create({
      title: 'Create dashboard UI',
      description: 'Build the main dashboard with all widgets and charts.',
      position: 1,
      listId: inProgressList.id,
    });

    // Create cards in Review list
    const card6 = await Card.create({
      title: 'Fix navigation bug',
      description: 'The side navigation menu does not close properly on mobile devices.',
      position: 0,
      listId: reviewList.id,
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Overdue
    });

    // Create cards in Done list
    const card7 = await Card.create({
      title: 'Project kickoff meeting',
      description: 'Initial meeting with stakeholders to discuss project scope and timeline.',
      position: 0,
      listId: doneList.id,
    });

    const card8 = await Card.create({
      title: 'Requirements gathering',
      position: 1,
      listId: doneList.id,
    });
    console.log('Cards created');

    // Add labels to cards
    await card1.addLabels([labels[1], labels[5]]); // Feature, Documentation
    await card4.addLabels([labels[1], labels[3]]); // Feature, In Progress
    await card6.addLabels([labels[0], labels[2]]); // Bug, Urgent
    await card5.addLabels([labels[3]]); // In Progress
    await card7.addLabels([labels[1]]); // Feature
    console.log('Labels assigned to cards');

    // Add members to cards
    await card1.addMembers([members[0], members[1]]); // John, Jane
    await card4.addMembers([members[0]]); // John
    await card5.addMembers([members[1], members[2]]); // Jane, Bob
    await card6.addMembers([members[2]]); // Bob
    await card7.addMembers([members[0], members[1], members[2], members[3]]); // All
    console.log('Members assigned to cards');

    // Create checklists for card4 (Implement user authentication)
    const checklist1 = await Checklist.create({
      title: 'Backend Tasks',
      position: 0,
      cardId: card4.id,
    });

    await ChecklistItem.bulkCreate([
      { text: 'Create User model', completed: true, position: 0, checklistId: checklist1.id },
      { text: 'Implement JWT tokens', completed: true, position: 1, checklistId: checklist1.id },
      { text: 'Add login endpoint', completed: false, position: 2, checklistId: checklist1.id },
      { text: 'Add registration endpoint', completed: false, position: 3, checklistId: checklist1.id },
      { text: 'Add password reset', completed: false, position: 4, checklistId: checklist1.id },
    ]);

    const checklist2 = await Checklist.create({
      title: 'Frontend Tasks',
      position: 1,
      cardId: card4.id,
    });

    await ChecklistItem.bulkCreate([
      { text: 'Create login form', completed: false, position: 0, checklistId: checklist2.id },
      { text: 'Create registration form', completed: false, position: 1, checklistId: checklist2.id },
      { text: 'Add form validation', completed: false, position: 2, checklistId: checklist2.id },
    ]);

    // Create checklist for card1
    const checklist3 = await Checklist.create({
      title: 'Setup Steps',
      position: 0,
      cardId: card1.id,
    });

    await ChecklistItem.bulkCreate([
      { text: 'Create GitHub repository', completed: false, position: 0, checklistId: checklist3.id },
      { text: 'Add .gitignore file', completed: false, position: 1, checklistId: checklist3.id },
      { text: 'Write initial README', completed: false, position: 2, checklistId: checklist3.id },
    ]);
    console.log('Checklists created');

    console.log('\n✅ Database seeded successfully!');
    console.log(`Board ID: ${board.id}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
