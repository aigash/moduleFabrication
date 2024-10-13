import { createCustomElement } from '../utils/componentFactory.js';

function renderCustomBouton() {
  const id = this.getAttribute('id') || '';
  const css = this.getAttribute('css') || '';
  const onClick = this.getAttribute('onClick') || '';
  const texte = this.innerHTML;

  const bouton = document.createElement('button');
  bouton.id = id;
  bouton.className = css;
  bouton.innerHTML = texte;
  
  if (onClick) {
    bouton.addEventListener('click', () => {
      eval(onClick);
    });
  }

  // Effacer le contenu précédent et ajouter le nouveau bouton
  this.shadowRoot.innerHTML = '';
  this.shadowRoot.appendChild(bouton);

  const style = document.createElement('style');
  style.textContent = `
    @import url('css/config.css');
    @import url('css/components/sg-btn.css');
  `;
  
  this.shadowRoot.appendChild(style);
}

createCustomElement('sg-btn', ['id', 'css', 'onclick', 'text'], renderCustomBouton);