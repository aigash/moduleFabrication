class CustomTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['id', 'css', 'data', 'title'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const id = this.getAttribute('id') || '';
        const css = this.getAttribute('css') || '';
        const title = this.getAttribute('title') || '';
        const data = JSON.parse(this.getAttribute('data') || '{"thead":[],"tbody":[]}');

        const table = document.createElement('table');
        table.id = id;
        table.className = css;

        // Créer l'en-tête du tableau avec le titre
        const thead = document.createElement('thead');
        if (title) {
            const titleRow = document.createElement('tr');
            const titleCell = document.createElement('th');
            titleCell.textContent = title;
            titleCell.colSpan = data.thead.length;
            titleCell.className = 'titleTable';
            titleRow.appendChild(titleCell);
            thead.appendChild(titleRow);
        }

        // Créer la ligne d'en-tête
        const headerRow = document.createElement('tr');
        data.thead.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header.lib;
            th.className = header.css;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Créer le corps du tableau
        const tbody = document.createElement('tbody');
        data.tbody.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell.data;
                td.className = cell.css;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        // Effacer le contenu précédent et ajouter le nouveau tableau
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(table);
        const style = document.createElement('style');
        style.textContent = `
            @import url('css/config.css');
            @import url('css/components/custom-table.css');
            `;
        
        this.shadowRoot.appendChild(style);
    }
}

// Enregistrer le composant personnalisé
customElements.define('custom-table', CustomTable);