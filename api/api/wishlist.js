let wishlist = [];
let id = 1;

function getAll() {
    return wishlist;
}

function add(data) {
    const item = { id: id++, ...data };
    wishlist.push(item);
    return item;
}

function remove(wishId) {
    wishlist = wishlist.filter(w => w.id !== wishId);
    return { ok: true };
}

module.exports = { getAll, add, remove };