let fabr = document.getElementById('fabr');
let stkTheo = document.getElementById('stkTheo');
let detailCmd = document.getElementById('detailCmd');
let stkCuve = document.getElementById('stkCuve');

let dataFabr = {
    thead: [
        {
            lib: "Article", 
            css: "",
            onclick: ""
        },
        {
            lib: "Qté", 
            css: "nombre",
            onclick: ""
        }
    ],
    tbody: [
        [
            {
                data: "OIGNON BLANC MMP FIL500gx 10If4314 MMP ESPAGNE CAL.5070 CAT.1",
                type: "",
                css: "",
                onclick: "",
                onchange: "",
                onkeydown: ""
            }, 
            {
                data: 170.00,
                type: "",
                css: "nombre",
                onclick: "",
                onchange: "",
                onkeydown: ""
            }
        ],
        [
            {
                data: "AIL NOIR RS BOI2tX6CAR RS ESPAGNE cal.ND cat.",
                type: "",
                css: "",
                onclick: "",
                onchange: "",
                onkeydown: ""
            }, 
            {
                data: 18.00, 
                type: "",
                css: "nombre",
                onclick: "",
                onchange: "",
                onkeydown: ""
            }
        ],
        [
            {
                data: "OIGNON BLANC MMP FIL500gx 10If4314 MMP ESPAGNE CAL.5070 CAT.1",
                type: "",
                css: "",
                onclick: "",
                onchange: "",
                onkeydown: ""
            }, 
            {
                data: 170.00,
                type: "",
                css: "nombre",
                onclick: "",
                onchange: "",
                onkeydown: ""
            }
        ],
        [
            {
                data: "AIL NOIR RS BOI2tX6CAR RS ESPAGNE cal.ND cat.",
                type: "",
                css: "",
                onclick: "",
                onchange: "",
                onkeydown: ""
            }, 
            {
                data: 18.00, 
                type: "",
                css: "nombre",
                onclick: "",
                onchange: "",
                onkeydown: ""
            }
        ],
        [
            {
                data: "OIGNON BLANC MMP FIL500gx 10If4314 MMP ESPAGNE CAL.5070 CAT.1",
                type: "",
                css: "",
                onclick: "",
                onchange: "",
                onkeydown: ""
            }, 
            {
                data: 170.00,
                type: "",
                css: "nombre",
                onclick: "",
                onchange: "",
                onkeydown: ""
            }
        ],
        [
            {
                data: "AIL NOIR RS BOI2tX6CAR RS ESPAGNE cal.ND cat.",
                type: "",
                css: "",
                onclick: "",
                onchange: "",
                onkeydown: ""
            }, 
            {
                data: 18.00, 
                type: "",
                css: "nombre",
                onclick: "",
                onchange: "",
                onkeydown: ""
            }
        ]
    ],
    row: [
        {
            css: "",
            onclick: ""
        }
    ]
};

let dataStkTheo = {
    thead: [
        {lib: "Ent.", css: ""},
        {lib: "Article", css: ""},
        {lib: "Stock en kg", css: "nombre"}
    ],
    tbody: [
        [{data: "Mar", css: ""}, {data: "AIL5 AIL BLANC VRAC IF43146kg VRAC", css: ""}, {data: 3224.00, css: "nombre"}],
        [{data: "Mar", css: ""}, {data: "AIL6 AIL ROSE VRAC IF43146kg VRAC", css: ""}, {data: 3319.68, css: "nombre"}]
    ],
    row: [
        
    ]
};

let dataDetailCmd = {
    thead: [
        { lib: "N° BL", css: "" },
        { lib: "Code", css: "" },
        { lib: "Article", css: "" },
        { lib: "Emb", css: "" },
        { lib: "Pal", css: "nombre" },
        { lib: "T. pal.", css: "" },
        { lib: "Qté", css: "nombre" },
        { lib: "U", css: "" }
    ],
    tbody: [
        [{data: 11, css: ""}, {data:"OIG4", css:""}, {data:"OIGNON BLANC MMP FIL500gx10IF4314 MMP ESPAGNE cal.5070 cat.1", css: ""}, {data:"", css:""}, {data:1, css:"nombre"}, {data:"?", css:""}, {data:56.00, css:"nombre"}, {data:"C", css:""}],
        [{data: 202, css: ""}, {data:"OIG4", css:""}, {data:"OIGNON BLANC MMP FIL500gx10IF4314 MMP ESPAGNE cal.5070 cat.1", css: ""}, {data:"", css:""}, {data:1, css:"nombre"}, {data:"PLB0", css:""}, {data:2.00, css:"nombre"}, {data:"C", css:""}]
    ],
    row: [
        
    ]
}

let dataStkCuve = {
    thead: [
        {lib: "Lot", css: ""},
        {lib: "Cuve N°", css: ""},
        {lib: "Article", css: ""},
        {lib: "Stock en kg", css: ""}
    ],
    tbody: [
        [{data: "0000017", css: ""}, {data: 3, css: "nombre"}, {data: "AIL5 AIL BLANC VRAC IF43146kg VRAC", css: ""}, {data: 3224.00, css: "nombre"}]
    ],
    row: [
        
    ]
}

function updateTableData(tableId, data) {
    const table = document.getElementById(tableId);
    if (table) {
        table.setAttribute('data', JSON.stringify(data));
    }
}

updateTableData('tableFabr', dataFabr);
updateTableData('tableStkTheo', dataStkTheo);
updateTableData('tableDetailCmd', dataDetailCmd);
updateTableData('tableStkCuve', dataStkCuve);