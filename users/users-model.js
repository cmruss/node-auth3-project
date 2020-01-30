const db = require('../data/db-config');

module.exports = {
    add,
    find,
    findBy,
    findById
};

async function add(user) {
    const [id] = await db('users')
        .insert(user);

    return findById(id)
};

function find() {
    return db('users')
        .select('id', 'username', 'password', 'department');
};

function findBy(prop) {
    return db('users')
        .where(prop);
};

function findById(id) {
    return db('users')
        .where({ id })
        .first();
};