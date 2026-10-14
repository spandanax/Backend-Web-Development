const prisma = require('../lib/prisma');
const { createRepository, numericId } = require('../lib/createRepository');

module.exports = createRepository({
  delegate: prisma.comment,
  fields: ['body', 'postId', 'authorId'],
  whereForId: numericId,
  orderBy: { id: 'asc' }
});
