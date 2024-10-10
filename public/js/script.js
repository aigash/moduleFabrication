let fabr = document.getElementById('fabr');
let stkTheo = document.getElementById('stkTheo');
let detailCmd = document.getElementById('detailCmd');
let stkCuve = document.getElementById('stkCuve');

let dataFabr = {
    thead: [
        "Article",
        "Qté"
    ],
    tbody: [
        ["test3", "2"],
        ["test","5"]
    ]
};
fabr.innerHTML = table('tableFabr', 'sgTable', dataFabr, 'À Fabriquer');