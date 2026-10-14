const prisma = require('../lib/prisma');
const { compositeId, createRepository } = require('../lib/createRepository');

module.exports = createRepository({
  delegate: prisma.follow,
  fields: ['followerId', 'followingId'],
  whereForId: compositeId(['followerId', 'followingId']),
  orderBy: [{ followerId: 'asc' }, { followingId: 'asc' }]
});
