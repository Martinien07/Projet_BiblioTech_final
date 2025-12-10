// app.js
// Application logic — preserve original object property names (Name, auteur_name, k, stuff, is_dead, uid)

(function () {

    // --------------------------
    // STATE
    // --------------------------
    let database = [];       // ancien DATA_BASE
    let uidCounter = 0;      // ancien x


    // --------------------------
    // DOM REFERENCES
    // --------------------------
    const inputTitle = document.getElementById("inputTitle");
    const inputAuthor = document.getElementById("inputAuthor");
    const selectCategory = document.getElementById("selectCategory");
    const inputIsbn = document.getElementById("inputIsbn");

    const btnSave = document.getElementById("btn_save");
    const btnDeleteAll = document.getElementById("btn_kill");

    const tableBody = document.getElementById("corps_du_tableau");
    const counterDisplay = document.getElementById("cpt");
    const messageZone = document.getElementById("zone_m");
    const inputSearch = document.getElementById("inp_search");
    const table = document.getElementById("tab");

    // helpers from external files
    const H = window._helpers;//C’est une convention courante
    const C = window._components;//C’est une convention courante



    // --------------------------
    // INITIALIZATION
    // --------------------------
    function launchApp() {

        // charge le localStorage
        database = H.loadData();

        // calcule UID max
        if (database.length > 0) {
            let max = 0;
            for (let i = 0; i < database.length; i++) {
                const current = Number(database[i].uid) || 0;
                if (current > max) max = current;
            }
            uidCounter = max;
        }

        displayBooks();
    }

    // compatibilité avec l'ancien nom
    window.LancerApplication = launchApp;



    // --------------------------
    // SAVE BOOK
    // --------------------------
    function saveBook() {

        const title = H.sanitize(inputTitle.value);
        const author = H.sanitize(inputAuthor.value);
        const categoryValue = selectCategory.value;
        const isbn = H.sanitize(inputIsbn.value);

        // validation
        if (!title) { alert("Erreur Titre"); return; }
        if (!author) { alert("Erreur Auteur"); return; }
        if (!H.isValidISBN(isbn)) { alert("Erreur ISBN"); return; }

        uidCounter = H.nextUid(database);

        // génère la date
        const today = new Date();
        const dateString = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

        // catégorie selon ancien code
        const CATEGORY_MAP = {
        "1": "Science-Fiction",
        "2": "Documentaire",
        "3": "Roman"
        };

        const categoryLabel = CATEGORY_MAP[categoryValue] || "Inconnu";


        // objet sauvegardé — mêmes clefs que le code historique
        const bookObject = {
            uid: uidCounter,
            Name: title,
            auteur_name: author,
            k: categoryLabel,
            stuff: isbn + " | " + dateString,
            is_dead: false
        };

        database.push(bookObject);
        H.saveData(database);

        displayBooks();

        // reset inputs
        inputTitle.value = "";
        inputAuthor.value = "";
        inputIsbn.value = "";

        showMessage("C'est bon");
    }

    //window.Excecute_Save_Data_To_Memory = saveBook;
    // pour la rétrocompatibilité 



    // --------------------------
    // DISPLAY
    // --------------------------
    function displayBooks() {
        tableBody.innerHTML = "";
        let visibleCount = 0;

        for (let i = 0; i < database.length; i++) {
            const book = database[i];
            if (!book.is_dead) {

                visibleCount++;

                const row = C.createRow(book);
                tableBody.appendChild(row);
            }
        }

        counterDisplay.innerHTML = visibleCount;
    }



    // --------------------------
    // DELETE ONE (soft delete)
    // --------------------------
    function deleteBook(uid) {
        if (!confirm("Supprimer ?")) return;

        for (let i = 0; i < database.length; i++) {
            if (database[i].uid == uid) {
                database[i].is_dead = true;
            }
        }

        H.saveData(database);
        displayBooks();
    }

    window.del = deleteBook;



    // --------------------------
    // SEARCH
    // --------------------------
    function searchBooks(value) {

        const filter = (value || "").toUpperCase();

        const rows = table.getElementsByTagName("tr");

        // commence à 1 car tr[0] = header
        for (let i = 1; i < rows.length; i++) {
            const col = rows[i].getElementsByTagName("td")[1];

            if (col) {
                const text = col.textContent || col.innerText;

                if (text.toUpperCase().includes(filter)) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }
        }
    }

    window.regarder = searchBooks;



    // --------------------------
    // DELETE ALL
    // --------------------------
    function deleteAll() {
        if (!confirm("Supprimer toute la base ?")) return;

        H.clearData();
        location.reload();
    }

    window.kill = deleteAll;



    // --------------------------
    // MESSAGE POPUP
    // --------------------------
    function showMessage(msg) {
        messageZone.innerText = msg;
        setTimeout(() => messageZone.innerText = "", 3000);
    }

    window.alert_user = showMessage;



    // --------------------------
    // EVENT LISTENERS
    // --------------------------
    document.addEventListener("DOMContentLoaded", () => {

        btnSave.addEventListener("click", saveBook);
        btnDeleteAll.addEventListener("click", deleteAll);

        inputSearch.addEventListener("input", e => searchBooks(e.target.value));

        launchApp();
    });

})();
