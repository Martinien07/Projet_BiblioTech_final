// bookRow.js
// crée une ligne <tr> pour un objet livre (utilise mêmes propriétés que l'original)

function createRow(book) {
    const tr = document.createElement("tr");

    // Num
    const tdNum = document.createElement("td");
    tdNum.textContent = "#" + book.uid;
    tr.appendChild(tdNum);

    // Info Livre (Titre en bold, Auteur en italique)
    const tdInfo = document.createElement("td");
    const b = document.createElement("b");
    b.textContent = (book.Name || "").toUpperCase();
    const br = document.createElement("br");
    const it = document.createElement("i");
    it.textContent = book.auteur_name || "";
    tdInfo.appendChild(b);
    tdInfo.appendChild(br);
    tdInfo.appendChild(it);
    tr.appendChild(tdInfo);

    // Type (badge: blanc fond + texte noir, comme avant)
    const tdType = document.createElement("td");
    const span = document.createElement("span");
    span.textContent = book.k || "";
    span.style.background = "white";
    span.style.color = "black";
    span.style.padding = "2px";
    tdType.appendChild(span);
    tr.appendChild(tdType);

    // Détails (isbn + date stored in 'stuff')
    const tdDetails = document.createElement("td");
    tdDetails.textContent = book.stuff || "";
    tr.appendChild(tdDetails);

    // Option: bouton delete
    const tdOpt = document.createElement("td");
    const btn = document.createElement("button");
    btn.className = "btn-del";
    btn.type = "button";
    btn.textContent = "X";
    // when clicked call global del() function (keeps same behavior)
    btn.addEventListener("click", function () {
        if (typeof window.del === "function") window.del(book.uid);
    });
    tdOpt.appendChild(btn);
    tr.appendChild(tdOpt);

    return tr;
}

/* expose globally */
window._components = {
    createRow
};


/*
const book = {
  Name: "Le Petit Prince",
  auteur_name: "Antoine de Saint-Exupéry",
  k: "Roman",
  stuff: "123456789 | 07/12/2025",
  is_dead: false,
  uid: 1
};


const tr = document.createElement("tr");

const tdInfo = document.createElement("td");

const b = document.createElement("b");
b.textContent = (book.Name || "").toUpperCase();


const br = document.createElement("br");


const it = document.createElement("i");
it.textContent = book.auteur_name || "";


tdInfo.appendChild(b);
tdInfo.appendChild(br);
tdInfo.appendChild(it);



<td>
  <b>LE PETIT PRINCE</b><br>
  <i>Antoine de Saint-Exupéry</i>
</td>


tr.appendChild(tdInfo);


<tr>
  <td>
    <b>LE PETIT PRINCE</b><br>
    <i>Antoine de Saint-Exupéry</i>
  </td>
</tr>
*/