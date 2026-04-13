let currentCountry = null;

const resultDiv = document.getElementById("result");

const FAVORITES_URL = "https://favorites-service.onrender.com";
const HISTORY_URL = "https://history-service.onrender.com";

// Loader
let loader = document.getElementById("loader");
if (!loader) {
    loader = document.createElement("div");
    loader.id = "loader";
    loader.textContent = "Carregant...";
    loader.style.fontWeight = "bold";
    loader.style.color = "green";
    loader.style.display = "none";
    document.body.insertBefore(loader, resultDiv);
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// SEARCH COUNTRY
async function searchCountry() {
    const country = document.getElementById("countryInput").value.trim();
    if (!country) return;

    resultDiv.innerHTML = "";
    loader.style.display = "block";

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        const data = await response.json();

        await wait(2000); // (10s es demasiado, 2s mejor)

        if (!data || data.status === 404) {
            throw new Error("País no trobat ❌");
        }

        const countryData = data[0];
        currentCountry = countryData;

        // 👉 GUARDAR EN HISTORY
        await fetch(`${HISTORY_URL}/history`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: country })
        });

        const languages = Object.values(countryData.languages || {}).join(", ");
        const currencies = Object.values(countryData.currencies || {}).map(c => c.name).join(", ");

        resultDiv.innerHTML = `
            <h3>${countryData.name.common}</h3>
            <p><strong>Capital:</strong> ${countryData.capital ? countryData.capital[0] : "No té"}</p>
            <p><strong>Població:</strong> ${countryData.population.toLocaleString()}</p>
            <p><strong>Regió:</strong> ${countryData.region}</p>
            <p><strong>Subregió:</strong> ${countryData.subregion || "No disponible"}</p>
            <p><strong>Idiomes:</strong> ${languages || "No disponible"}</p>
            <p><strong>Moneda:</strong> ${currencies || "No disponible"}</p>
            <img src="${countryData.flags.png}" width="100">
            <br><br>
            <button onclick="addFavorite()">Afegir a favorits</button>
        `;

    } catch (error) {
        currentCountry = null;
        resultDiv.innerHTML = error.message;
    } finally {
        loader.style.display = "none";
    }
}

// ADD FAVORITE
async function addFavorite() {
    if (!currentCountry) return;

    const response = await fetch(`${FAVORITES_URL}/favorites`);
    const favorites = await response.json();

    const exists = favorites.some(f =>
        f.name.toLowerCase() === currentCountry.name.common.toLowerCase()
    );

    if (exists) {
        alert(`${currentCountry.name.common} ja està als favorits!`);
        return;
    }

    await fetch(`${FAVORITES_URL}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: currentCountry.name.common,
            capital: currentCountry.capital,
            region: currentCountry.region,
            population: currentCountry.population,
            flag: currentCountry.flags.png
        })
    });

    loadFavorites();
}

// LOAD FAVORITES
async function loadFavorites() {
    const response = await fetch(`${FAVORITES_URL}/favorites`);
    const data = await response.json();

    const list = document.getElementById("favorites");
    list.innerHTML = "";

    data.forEach(f => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${f.name}</strong> - ${f.capital} (${f.region}) 
            <img src="${f.flag}" width="50">
            <button onclick="deleteFavorite(${f.id})">Eliminar</button>
        `;
        list.appendChild(li);
    });
}

// DELETE
async function deleteFavorite(id) {
    await fetch(`${FAVORITES_URL}/favorites/${id}`, { method: "DELETE" });
    loadFavorites();
}

loadFavorites();