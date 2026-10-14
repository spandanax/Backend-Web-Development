const prisma = require('../lib/prisma');
const { compositeId, createRepository } = require('../lib/createRepository');

module.exports = createRepository({
  delegate: prisma.vote,
  fields: ['postId', 'userId'],
  whereForId: compositeId(['postId', 'userId']),
  orderBy: [{ postId: 'asc' }, { userId: 'asc' }]
});
