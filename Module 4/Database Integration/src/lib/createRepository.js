const {
  executeDatabaseOperation
} = require('./databaseErrors');

function createRepository({
  delegate,
  fields,
  updateFields = fields,
  whereForId,
  orderBy,
  prepareCreate
}) {
  function pickFields(values) {
    return Object.fromEntries(
      fields
        .filter((field) => values && values[field] !== undefined)
        .map((field) => [field, values[field]])
    );
  }

  async function findAll() {
    return executeDatabaseOperation(() =>
      delegate.findMany(orderBy ? { orderBy } : undefined)
    );
  }

  async function findById(id) {
    return executeDatabaseOperation(() =>
      delegate.findUnique({ where: whereForId(id) })
    );
  }

  async function create(values) {
    const data = prepareCreate
      ? prepareCreate(values, pickFields(values))
      : pickFields(values);

    return executeDatabaseOperation(() =>
      delegate.create({ data })
    );
  }

  async function update(id, patch) {
    try {
      return await executeDatabaseOperation(() =>
        delegate.update({
          where: whereForId(id),
          data: Object.fromEntries(
            updateFields
              .filter((field) => patch && patch[field] !== undefined)
              .map((field) => [field, patch[field]])
          )
        })
      );
    } catch (error) {
      if (error.statusCode === 404) {
        return null;
      }

      throw error;
    }
  }

  async function remove(id) {
    try {
      await executeDatabaseOperation(() =>
        delegate.delete({ where: whereForId(id) })
      );
      return true;
    } catch (error) {
      if (error.statusCode === 404) {
        return false;
      }

      throw error;
    }
  }

  return { findAll, findById, create, update, remove };
}

function numericId(id) {
  return { id: Number(id) };
}

function compositeId(fields) {
  const key = fields.join('_');
  return (id) => {
    const values = {};
    for (const field of fields) {
      values[field] = Number(id[field]);
    }
    return { [key]: values };
  };
}

module.exports = { compositeId, createRepository, numericId };
