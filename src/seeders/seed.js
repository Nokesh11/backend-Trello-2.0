const { sequelize, Board, List, Card, Label, Member, Checklist, ChecklistItem } = require('../models');

const seedDatabase = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Create sample members (team for assignment demonstration)
    const members = await Member.bulkCreate([
      {
        name: 'Alex Johnson',
        email: 'alex@company.com',
        initials: 'AJ',
        color: '#0079bf',
      },
      {
        name: 'Sarah Chen',
        email: 'sarah@company.com',
        initials: 'SC',
        color: '#61bd4f',
      },
      {
        name: 'Mike Rodriguez',
        email: 'mike@company.com',
        initials: 'MR',
        color: '#eb5a46',
      },
      {
        name: 'Emily Davis',
        email: 'emily@company.com',
        initials: 'ED',
        color: '#c377e0',
      },
      {
        name: 'David Kim',
        email: 'david@company.com',
        initials: 'DK',
        color: '#ff9f1a',
      },
    ]);
    console.log('Members created');

    // ============================================
    // BOARD 1: Product Development (Main Demo Board)
    // ============================================
    const board1 = await Board.create({
      title: 'Product Development Sprint',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    });

    // Labels for Board 1
    const labels1 = await Label.bulkCreate([
      { name: 'Bug', color: '#eb5a46', boardId: board1.id },
      { name: 'Feature', color: '#61bd4f', boardId: board1.id },
      { name: 'High Priority', color: '#ff9f1a', boardId: board1.id },
      { name: 'In Progress', color: '#f2d600', boardId: board1.id },
      { name: 'Needs Review', color: '#c377e0', boardId: board1.id },
      { name: 'Documentation', color: '#0079bf', boardId: board1.id },
      { name: 'Design', color: '#00c2e0', boardId: board1.id },
      { name: 'Backend', color: '#51e898', boardId: board1.id },
      { name: 'Frontend', color: '#ff78cb', boardId: board1.id },
      { name: 'Blocked', color: '#344563', boardId: board1.id },
    ]);

    // Lists for Board 1
    const backlogList = await List.create({ title: 'Backlog', position: 0, boardId: board1.id });
    const todoList = await List.create({ title: 'To Do', position: 1, boardId: board1.id });
    const inProgressList = await List.create({ title: 'In Progress', position: 2, boardId: board1.id });
    const reviewList = await List.create({ title: 'Code Review', position: 3, boardId: board1.id });
    const doneList = await List.create({ title: 'Done ✓', position: 4, boardId: board1.id });

    // Cards for Backlog
    const card1 = await Card.create({
      title: 'Implement dark mode toggle',
      description: 'Add a toggle in settings to switch between light and dark themes. Should persist user preference in localStorage.',
      position: 0,
      listId: backlogList.id,
    });

    const card2 = await Card.create({
      title: 'Add keyboard shortcuts',
      description: 'Implement keyboard shortcuts for common actions:\n- Ctrl+N: New card\n- Ctrl+Enter: Save card\n- Esc: Cancel/Close modal\n- Arrow keys: Navigate between cards',
      position: 1,
      listId: backlogList.id,
    });

    const card3 = await Card.create({
      title: 'Export board to JSON',
      position: 2,
      listId: backlogList.id,
    });

    // Cards for To Do
    const card4 = await Card.create({
      title: 'Fix drag and drop lag on mobile',
      description: 'Users report that drag and drop is sluggish on mobile devices. Need to optimize touch event handling and reduce re-renders.',
      position: 0,
      listId: todoList.id,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    });

    const card5 = await Card.create({
      title: 'Add card cover images',
      description: 'Allow users to add cover images to cards. Support:\n- Image upload\n- URL input\n- Color covers',
      position: 1,
      listId: todoList.id,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    });

    const card6 = await Card.create({
      title: 'Implement card search functionality',
      description: 'Add a search bar in the header that filters cards across all lists by title and description.',
      position: 2,
      listId: todoList.id,
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // tomorrow
    });

    // Cards for In Progress
    const card7 = await Card.create({
      title: 'Build notification system',
      description: 'Create a notification system for:\n- Due date reminders\n- Card assignments\n- Mentions in comments\n\nUse toast notifications for real-time updates.',
      position: 0,
      listId: inProgressList.id,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      cover: '#00c2e0',
    });

    const card8 = await Card.create({
      title: 'Redesign card modal',
      description: 'Update the card detail modal to match latest Trello design:\n- Better spacing\n- Improved activity feed\n- Larger description area',
      position: 1,
      listId: inProgressList.id,
    });

    const card9 = await Card.create({
      title: 'API rate limiting implementation',
      description: 'Implement rate limiting on all API endpoints to prevent abuse. Use express-rate-limit middleware.',
      position: 2,
      listId: inProgressList.id,
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // OVERDUE - yesterday
    });

    // Cards for Code Review
    const card10 = await Card.create({
      title: 'Checklist feature - PR #142',
      description: 'Review the checklist feature implementation. Key areas to check:\n- State management\n- API integration\n- UI/UX consistency',
      position: 0,
      listId: reviewList.id,
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    });

    const card11 = await Card.create({
      title: 'Bug fix: Cards disappearing on drag',
      description: 'Fix for issue #87 where cards would sometimes disappear during drag operations.',
      position: 1,
      listId: reviewList.id,
    });

    // Cards for Done
    const card12 = await Card.create({
      title: 'Set up CI/CD pipeline',
      description: 'Configured GitHub Actions for:\n- Automated testing on PR\n- Deploy to staging on merge to develop\n- Deploy to production on merge to main',
      position: 0,
      listId: doneList.id,
    });

    const card13 = await Card.create({
      title: 'Database schema design',
      description: 'Designed and implemented the database schema with PostgreSQL:\n- Boards, Lists, Cards tables\n- Labels and Members with many-to-many relationships\n- Checklists and ChecklistItems',
      position: 1,
      listId: doneList.id,
    });

    const card14 = await Card.create({
      title: 'Implement drag and drop',
      description: 'Implemented smooth drag and drop using @hello-pangea/dnd library. Supports:\n- Reordering lists\n- Moving cards between lists\n- Reordering cards within lists',
      position: 2,
      listId: doneList.id,
    });

    const card15 = await Card.create({
      title: 'Board background customization',
      description: 'Added ability to change board backgrounds with gradient presets and custom colors.',
      position: 3,
      listId: doneList.id,
    });

    console.log('Cards created for Board 1');

    // Add labels to cards
    await card4.addLabels([labels1[0], labels1[2], labels1[8]]); // Bug, High Priority, Frontend
    await card5.addLabels([labels1[1], labels1[6]]); // Feature, Design
    await card6.addLabels([labels1[1], labels1[8]]); // Feature, Frontend
    await card7.addLabels([labels1[1], labels1[3], labels1[7]]); // Feature, In Progress, Backend
    await card8.addLabels([labels1[6], labels1[3]]); // Design, In Progress
    await card9.addLabels([labels1[7], labels1[2], labels1[9]]); // Backend, High Priority, Blocked
    await card10.addLabels([labels1[4]]); // Needs Review
    await card11.addLabels([labels1[0], labels1[4]]); // Bug, Needs Review
    await card12.addLabels([labels1[5]]); // Documentation
    await card13.addLabels([labels1[7], labels1[5]]); // Backend, Documentation
    await card14.addLabels([labels1[1], labels1[8]]); // Feature, Frontend
    await card15.addLabels([labels1[1], labels1[6]]); // Feature, Design
    console.log('Labels assigned to cards');

    // Add members to cards
    await card4.addMembers([members[0], members[2]]); // Alex, Mike
    await card5.addMembers([members[1]]); // Sarah
    await card6.addMembers([members[0]]); // Alex
    await card7.addMembers([members[2], members[3]]); // Mike, Emily
    await card8.addMembers([members[1], members[3]]); // Sarah, Emily
    await card9.addMembers([members[4]]); // David
    await card10.addMembers([members[0], members[1], members[2]]); // Alex, Sarah, Mike
    await card11.addMembers([members[2]]); // Mike
    await card12.addMembers([members[4]]); // David
    await card13.addMembers([members[0], members[4]]); // Alex, David
    await card14.addMembers([members[0], members[1]]); // Alex, Sarah
    await card15.addMembers([members[1], members[3]]); // Sarah, Emily
    console.log('Members assigned to cards');

    // Create checklists
    const checklist1 = await Checklist.create({
      title: 'Implementation Tasks',
      position: 0,
      cardId: card7.id,
    });
    await ChecklistItem.bulkCreate([
      { text: 'Design notification component', completed: true, position: 0, checklistId: checklist1.id },
      { text: 'Create notification service', completed: true, position: 1, checklistId: checklist1.id },
      { text: 'Add toast animations', completed: true, position: 2, checklistId: checklist1.id },
      { text: 'Implement due date reminders', completed: false, position: 3, checklistId: checklist1.id },
      { text: 'Add assignment notifications', completed: false, position: 4, checklistId: checklist1.id },
      { text: 'Test on all browsers', completed: false, position: 5, checklistId: checklist1.id },
    ]);

    const checklist2 = await Checklist.create({
      title: 'Testing Checklist',
      position: 1,
      cardId: card7.id,
    });
    await ChecklistItem.bulkCreate([
      { text: 'Unit tests', completed: false, position: 0, checklistId: checklist2.id },
      { text: 'Integration tests', completed: false, position: 1, checklistId: checklist2.id },
      { text: 'E2E tests', completed: false, position: 2, checklistId: checklist2.id },
    ]);

    const checklist3 = await Checklist.create({
      title: 'UI Updates',
      position: 0,
      cardId: card8.id,
    });
    await ChecklistItem.bulkCreate([
      { text: 'Update modal header', completed: true, position: 0, checklistId: checklist3.id },
      { text: 'Improve description editor', completed: true, position: 1, checklistId: checklist3.id },
      { text: 'Add activity timeline', completed: false, position: 2, checklistId: checklist3.id },
      { text: 'Responsive design fixes', completed: false, position: 3, checklistId: checklist3.id },
    ]);

    const checklist4 = await Checklist.create({
      title: 'Search Features',
      position: 0,
      cardId: card6.id,
    });
    await ChecklistItem.bulkCreate([
      { text: 'Add search input to header', completed: false, position: 0, checklistId: checklist4.id },
      { text: 'Implement fuzzy search', completed: false, position: 1, checklistId: checklist4.id },
      { text: 'Highlight matching text', completed: false, position: 2, checklistId: checklist4.id },
      { text: 'Add keyboard navigation', completed: false, position: 3, checklistId: checklist4.id },
    ]);

    const checklist5 = await Checklist.create({
      title: 'Code Review Checklist',
      position: 0,
      cardId: card10.id,
    });
    await ChecklistItem.bulkCreate([
      { text: 'Code follows style guide', completed: true, position: 0, checklistId: checklist5.id },
      { text: 'No console.log statements', completed: true, position: 1, checklistId: checklist5.id },
      { text: 'Error handling implemented', completed: true, position: 2, checklistId: checklist5.id },
      { text: 'Tests passing', completed: false, position: 3, checklistId: checklist5.id },
      { text: 'Documentation updated', completed: false, position: 4, checklistId: checklist5.id },
    ]);

    console.log('Checklists created for Board 1');

    // ============================================
    // BOARD 2: Marketing Campaign
    // ============================================
    const board2 = await Board.create({
      title: 'Q1 Marketing Campaign',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    });

    const labels2 = await Label.bulkCreate([
      { name: 'Content', color: '#61bd4f', boardId: board2.id },
      { name: 'Social Media', color: '#0079bf', boardId: board2.id },
      { name: 'Email', color: '#c377e0', boardId: board2.id },
      { name: 'Urgent', color: '#eb5a46', boardId: board2.id },
      { name: 'Approved', color: '#00c2e0', boardId: board2.id },
    ]);

    const ideaList = await List.create({ title: 'Ideas', position: 0, boardId: board2.id });
    const planningList = await List.create({ title: 'Planning', position: 1, boardId: board2.id });
    const creatingList = await List.create({ title: 'Creating', position: 2, boardId: board2.id });
    const publishedList = await List.create({ title: 'Published', position: 3, boardId: board2.id });

    await Card.create({
      title: 'Product launch video',
      description: 'Create a 2-minute product launch video for social media',
      position: 0,
      listId: ideaList.id,
    });

    await Card.create({
      title: 'Customer testimonial series',
      position: 1,
      listId: ideaList.id,
    });

    const marketingCard1 = await Card.create({
      title: 'Email newsletter - January',
      description: 'Monthly newsletter featuring:\n- Product updates\n- Customer success story\n- Tips and tricks\n- Upcoming events',
      position: 0,
      listId: planningList.id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await Card.create({
      title: 'Blog post: 10 Productivity Tips',
      position: 1,
      listId: planningList.id,
    });

    const marketingCard2 = await Card.create({
      title: 'Instagram campaign assets',
      description: 'Design assets for Instagram:\n- 5 carousel posts\n- 10 story templates\n- Profile highlight covers',
      position: 0,
      listId: creatingList.id,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });

    await Card.create({
      title: 'Holiday promotion graphics',
      position: 0,
      listId: publishedList.id,
    });

    await marketingCard1.addLabels([labels2[2], labels2[0]]); // Email, Content
    await marketingCard2.addLabels([labels2[1], labels2[3]]); // Social Media, Urgent
    await marketingCard1.addMembers([members[3]]); // Emily
    await marketingCard2.addMembers([members[1], members[3]]); // Sarah, Emily

    console.log('Board 2 (Marketing) created');

    // ============================================
    // BOARD 3: Personal Tasks
    // ============================================
    const board3 = await Board.create({
      title: 'Personal Tasks',
      background: '#519839',
    });

    const labels3 = await Label.bulkCreate([
      { name: 'Home', color: '#61bd4f', boardId: board3.id },
      { name: 'Work', color: '#0079bf', boardId: board3.id },
      { name: 'Health', color: '#eb5a46', boardId: board3.id },
      { name: 'Learning', color: '#c377e0', boardId: board3.id },
    ]);

    const todayList = await List.create({ title: 'Today', position: 0, boardId: board3.id });
    const thisWeekList = await List.create({ title: 'This Week', position: 1, boardId: board3.id });
    const laterList = await List.create({ title: 'Later', position: 2, boardId: board3.id });
    const completedList = await List.create({ title: 'Completed', position: 3, boardId: board3.id });

    const personalCard1 = await Card.create({
      title: 'Finish online course - React Advanced',
      description: 'Complete remaining modules:\n- Custom hooks\n- Performance optimization\n- Testing',
      position: 0,
      listId: todayList.id,
      dueDate: new Date(Date.now() + 0.5 * 24 * 60 * 60 * 1000), // Later today
    });

    await Card.create({
      title: 'Schedule dentist appointment',
      position: 1,
      listId: todayList.id,
    });

    await Card.create({
      title: 'Prepare presentation for Monday',
      position: 0,
      listId: thisWeekList.id,
      dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    });

    await Card.create({
      title: 'Go grocery shopping',
      position: 1,
      listId: thisWeekList.id,
    });

    await Card.create({
      title: 'Plan weekend trip',
      position: 0,
      listId: laterList.id,
    });

    await Card.create({
      title: 'Read "Clean Code" book',
      position: 1,
      listId: laterList.id,
    });

    await Card.create({
      title: 'Morning workout routine',
      position: 0,
      listId: completedList.id,
    });

    await personalCard1.addLabels([labels3[1], labels3[3]]); // Work, Learning

    const personalChecklist = await Checklist.create({
      title: 'Course Progress',
      position: 0,
      cardId: personalCard1.id,
    });
    await ChecklistItem.bulkCreate([
      { text: 'Module 1: Introduction', completed: true, position: 0, checklistId: personalChecklist.id },
      { text: 'Module 2: Custom Hooks', completed: true, position: 1, checklistId: personalChecklist.id },
      { text: 'Module 3: Context API', completed: true, position: 2, checklistId: personalChecklist.id },
      { text: 'Module 4: Performance', completed: false, position: 3, checklistId: personalChecklist.id },
      { text: 'Module 5: Testing', completed: false, position: 4, checklistId: personalChecklist.id },
      { text: 'Final Project', completed: false, position: 5, checklistId: personalChecklist.id },
    ]);

    console.log('Board 3 (Personal) created');

    console.log('\n✅ Database seeded successfully!');
    console.log(`Main Board ID: ${board1.id}`);
    console.log(`Total: 3 boards, 5 members, multiple lists, cards, labels, and checklists`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
