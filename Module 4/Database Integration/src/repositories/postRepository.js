const prisma = require('../lib/prisma');
const { createRepository, numericId } = require('../lib/createRepository');

module.exports = createRepository({
  delegate: prisma.post,
  fields: ['title', 'body', 'authorId'],
  updateFields: ['title', 'body'],
  whereForId: numericId,
  orderBy: { id: 'asc' },
  prepareCreate: (values, data) => ({
    ...data,
    body: (values && values.body) || ''
  })
});
