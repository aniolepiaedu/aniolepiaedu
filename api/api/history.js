let history = [];
let id = 1;

function getAll() {
    return history;
}

function add(data) {
    const item = {
        id: id++,
        country: data.country,
        date: new Date().toLocaleString()
    };

    history.push(item);
    return item;
}

module.exports = { getAll, add };