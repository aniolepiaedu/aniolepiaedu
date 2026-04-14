let currentCountry = null;

const API_URL = "https://repositori2.onrender.com";

const FAVORITES_URL = `${API_URL}/api/favorites`;
const HISTORY_URL = `${API_URL}/api/history`;
const WISHLIST_URL = `${API_URL}/api/wishlist`;

// =======================
// SEARCH COUNTRY
// =======================
async function searchCountry() {
    const country = document.getElementById("countryInput").value.trim();
    if (!country) return;

    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();

    if (!data || data.status === 404) {
        alert("País no encontrado");
        return;
    }

    currentCountry = data[0];

    document.getElementById("result").innerHTML = `
        <h3>${currentCountry.name.common}</h3>
        <p>${currentCountry.capital?.[0] || "Sin capital"}</p>
        <button onclick="addFavorite()">Añadir favorito</button>
        <button onclick="addWishlist()">Añadir wishlist</button>
    `;

    await fetch(HISTORY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: currentCountry.name.common })
    });

    loadHistory();
}

// =======================
// FAVORITES
// =======================
async function addFavorite() {
    await fetch(FAVORITES_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: currentCountry.name.common,
            capital: currentCountry.capital?.[0],
            region: currentCountry.region
        })
    });

    loadFavorites();
}

async function loadFavorites() {
    const res = await fetch(FAVORITES_URL);
    const data = await res.json();

    const list = document.getElementById("favorites");
    list.innerHTML = "";

    data.forEach(f => {
        const li = document.createElement("li");
        li.textContent = f.name;

        const btn = document.createElement("button");
        btn.textContent = "X";
        btn.onclick = () => deleteFavorite(f.id);

        li.appendChild(btn);
        list.appendChild(li);
    });
}

async function deleteFavorite(id) {
    await fetch(`${FAVORITES_URL}?id=${id}`, {
        method: "DELETE"
    });

    loadFavorites();
}

// =======================
// HISTORY
// =======================
async function loadHistory() {
    const res = await fetch(HISTORY_URL);
    const data = await res.json();

    const list = document.getElementById("history");
    list.innerHTML = "";

    data.forEach(h => {
        const li = document.createElement("li");
        li.textContent = `${h.country} - ${h.date}`;
        list.appendChild(li);
    });
}

// =======================
// WISHLIST
// =======================
async function addWishlist() {
    await fetch(WISHLIST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: currentCountry.name.common
        })
    });

    loadWishlist();
}

async function loadWishlist() {
    const res = await fetch(WISHLIST_URL);
    const data = await res.json();

    const list = document.getElementById("wishlist");
    list.innerHTML = "";

    data.forEach(w => {
        const li = document.createElement("li");
        li.textContent = w.name;

        const btn = document.createElement("button");
        btn.textContent = "X";
        btn.onclick = () => deleteWishlist(w.id);

        li.appendChild(btn);
        list.appendChild(li);
    });
}

async function deleteWishlist(id) {
    await fetch(`${WISHLIST_URL}?id=${id}`, {
        method: "DELETE"
    });

    loadWishlist();
}

// INIT
window.addEventListener("DOMContentLoaded", () => {
    loadFavorites();
    loadHistory();
    loadWishlist();
});