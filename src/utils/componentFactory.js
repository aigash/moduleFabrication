export function createCustomElement(name, observedAttributes, renderFunction) {
    class CustomElement extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      }
  
      connectedCallback() {
        this.render();
      }
  
      static get observedAttributes() {
        return observedAttributes;
      }
  
      attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
          this.render();
        }
      }
  
      render() {
        renderFunction.call(this);
      }
    }
  
    customElements.define(name, CustomElement);
}