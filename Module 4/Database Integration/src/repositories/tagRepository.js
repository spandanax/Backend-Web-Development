const prisma = require('../lib/prisma');
const { createRepository, numericId } = require('../lib/createRepository');

module.exports = createRepository({
  delegate: prisma.tag,
  fields: ['name'],
  whereForId: numericId,
  orderBy: { id: 'asc' }
});
