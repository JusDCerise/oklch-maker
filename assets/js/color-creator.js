class ColorCreator extends HTMLElement {
  static get observedAttributes() {}

  attributeChangedCallback(attr, oldVal, newVal) {}

  connectedCallback() {
    this.innerHTML = `
    <div class="color-result" style="background-color: $inputValue;"></div>
    <input type="text" class="color-input"></input>
    <input type="range"></input>
    `;
    this.render();
  }
  disconnectedCallback() {}

  render() {}
}

customElements.define("color-creator", ColorCreator);
