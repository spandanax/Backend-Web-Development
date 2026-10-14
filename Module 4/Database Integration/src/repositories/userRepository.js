const prisma = require('../lib/prisma');
const { createRepository, numericId } = require('../lib/createRepository');

module.exports = createRepository({
  delegate: prisma.user,
  fields: ['name'],
  whereForId: numericId,
  orderBy: { id: 'asc' }
});
