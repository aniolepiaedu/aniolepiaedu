let favorites = [];
let id = 1;

function getAll() {
    return favorites;
}

function add(data) {
    const item = { id: id++, ...data };
    favorites.push(item);
    return item;
}

function remove(favId) {
    favorites = favorites.filter(f => f.id !== favId);
    return { ok: true };
}

module.exports = { getAll, add, remove };