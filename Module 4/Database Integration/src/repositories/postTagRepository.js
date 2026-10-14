const prisma = require('../lib/prisma');
const { compositeId, createRepository } = require('../lib/createRepository');

module.exports = createRepository({
  delegate: prisma.postTag,
  fields: ['postId', 'tagId'],
  whereForId: compositeId(['postId', 'tagId']),
  orderBy: [{ postId: 'asc' }, { tagId: 'asc' }]
});
