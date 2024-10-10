function createFormField(label, id, input, inputAttr = '', inputCss = '', css = '') {
    let html = `<div class='${css}'>
                    <label for='${id}'>${label}</label>
                    <input class='${inputCss}' id='${id}' type='${input}' ${inputAttr}>
                </div>`;

    return html;
}

// baisse la date d'un jour
function lessDate(id) {
    let date = new Date(document.getElementById(id).value);
    date.setDate(date.getDate() - 1);
    let datePrepa = document.getElementById(id);
    datePrepa.value = date.toISOString().substring(0,10);
}

// augmente la date d'un jour
function moreDate(id) {
    let date = new Date(document.getElementById(id).value);
    date.setDate(date.getDate() + 1);
    let datePrepa = document.getElementById(id);
    datePrepa.value = date.toISOString().substring(0,10);
}

// Met la date à aujourd'hui
function today(id) {
    let date = new Date();
    let datePrepa = document.getElementById(id);
    datePrepa.value = date.toISOString().substring(0,10);
}

function table(id, css, data, title) {
    let html = `<table class="${css}" id="${id}">
                    <thead>
                        <tr><th colspan="${data.thead.length}">${title}</th></tr>
                        <tr>`;
    data.thead.forEach(val => {
        html += `<th>${val}</th>`;
    });

    html += `</tr>
        </thead>
        <tbody>`;

    data.tbody.forEach(val => {
        html += `<tr>`;
        val.forEach(val2 => {
            html += `<td>${val2}</td>`;
        });
        html += `</tr>`;
    });

    html += `</tbody></table>`;

    return html;
}




