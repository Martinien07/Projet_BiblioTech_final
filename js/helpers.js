// helpers.js
// Chargement/sauvegarde/sanitisation et utilitaires

const STORAGE_KEY = "biblio_db_final";

/* ❌ Avant : eval(...) was used */
/* ✅ Après : JSON.parse with try/catch and fallback */
function loadData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
        // try to parse JSON safely
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
        return [];
    } catch (e) {
        console.error("Invalid localStorage data:", e);
        return [];
    }
}

function saveData(db) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
        return true;
    } catch (e) {
        console.error("Failed to save data:", e);
        return false;
    }
}

function clearData() {
    // ❌ Avant : localStorage.clear() — supprimait toutes les données du navigateur
    // ✅ Après : removeItem sur la clé du projet seulement
    localStorage.removeItem(STORAGE_KEY);
}

/* sanitize: retire crochets < > pour éviter injection simple, trim */
function sanitize(str) {
    if (typeof str !== "string") return "";
    return str.replace(/[<>]/g, "").trim();
}

/* valid ISBN simple: longueur > 3 (conserve ancienne règle) */
function isValidISBN(s) {
    if (typeof s !== "string") return false;

    //La fonction trim() est une méthode native des chaînes de caractères en JavaScript.

    //  Ce qu’elle fait :

    //  Supprime tous les espaces blancs au début et à la fin d’une chaîne.

    // Ne touche pas aux espaces situés au milieu de la chaîne.
    return s.trim().length > 3;
}

/* nextUid: calcule le max uid existant + 1 pour robustesse */
function nextUid(db) {
    let max = 0;
    for (let i = 0; i < db.length; i++) {
        const n = Number(db[i].uid) || 0;
        if (n > max) max = n;
    }
    return max + 1;
}

/* Export to the global scope so app.js can use easily (non-module) */
window._helpers = {
    loadData,
    saveData,
    clearData,
    sanitize,
    isValidISBN,
    nextUid
};
