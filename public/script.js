let currentCountry = null;

// 🔗 MICROSERVICES
const FAVORITES_URL = "https://escolapia-mataro.clickedu.net/favorites";
const HISTORY_URL = "https://escolapia-mataro.clickedu.net/history";
const WISHLIST_URL = "https://escolapia-mataro.clickedu.net/wishlist";

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

    // HISTORY
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
        list.innerHTML += `
            <li>
                ${f.name}
                <button onclick="deleteFavorite(${f.id})">X</button>
            </li>
        `;
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
        list.innerHTML += `<li>${h.country} - ${h.date}</li>`;
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
        list.innerHTML += `
            <li>
                ${w.name}
                <button onclick="deleteWishlist(${w.id})">X</button>
            </li>
        `;
    });
}

async function deleteWishlist(id) {
    await fetch(`${WISHLIST_URL}?id=${id}`, {
        method: "DELETE"
    });

    loadWishlist();
}

// INIT
loadFavorites();
loadHistory();
loadWishlist();