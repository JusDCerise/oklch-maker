class ColorCreator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="color-result" style="background-color: oklch(50% 0.37 265 / 1);"></div>
      <div class="color-input">
        <input type="text" value="oklch(50% 0.37 265 / 1)" readonly>
        <span class="color-copy">Copy</span>
      </div>
      <button class="btn" id="randomize">Randomize</button>
      <div class="color-ranges">
        <label>Lightness</label>
        <input type="range" class="lightness" value="50" min="0" max="100" step="0.1">
      </div>
      <div class="color-ranges">
        <label>Chroma</label>
        <input type="range" class="chroma" value="0.37" min="0" max="0.37" step="0.001">
      </div>
      <div class="color-ranges">
        <label>Hue</label>
        <input type="range" class="hue" value="265" min="0" max="360" step="1">
      </div>
      <div class="color-ranges">
        <label>Alpha</label>
        <input type="range" class="alpha" value="1" min="0" max="1" step="0.01">
      </div>
    `;
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  addEventListeners() {
    const colorInput = this.querySelector(".color-input input");
    const colorCopy = this.querySelector(".color-input span");
    const lightnessInput = this.querySelector(".lightness");
    const chromaInput = this.querySelector(".chroma");
    const hueInput = this.querySelector(".hue");
    const alphaInput = this.querySelector(".alpha");
    const randomizeButton = this.querySelector("#randomize");

    lightnessInput.addEventListener("input", this.updateColor.bind(this));
    chromaInput.addEventListener("input", this.updateColor.bind(this));
    hueInput.addEventListener("input", this.updateColor.bind(this));
    alphaInput.addEventListener("input", this.updateColor.bind(this));
    colorInput.addEventListener("input", this.updateColor.bind(this));

    colorCopy.addEventListener("click", this.copyColor.bind(this));
    randomizeButton.addEventListener("click", this.randomizeValues.bind(this));
  }

  updateColor() {
    const { lightness, chroma, hue, alpha } = this.inputValues();

    const { lightnessInput, chromaInput, hueInput, alphaInput } = this.inputs();

    const colorResult = this.querySelector(".color-result");
    const colorInput = this.querySelector(".color-input input");

    colorResult.style.backgroundColor = `oklch(${lightness}% ${chroma} ${hue} / ${alpha})`;
    colorInput.value = `oklch(${lightness}% ${chroma} ${hue} / ${alpha})`;

    lightnessInput.style.background = `linear-gradient(90deg, oklch(0% ${chroma} ${hue} / ${alpha}) 0%, oklch(100% ${chroma} ${hue} / ${alpha}) 100%)`;
    chromaInput.style.background = `linear-gradient(90deg, oklch(${lightness}% 0 ${hue} / ${alpha}) 0%, oklch(${lightness}% 0.37 ${hue} / ${alpha}) 100%)`;
    hueInput.style.background = `linear-gradient(90deg, oklch(${lightness}% ${chroma} 0 / ${alpha}) 0%, oklch(${lightness}% ${chroma} 36 / ${alpha}) 10%, oklch(${lightness}% ${chroma} 72 / ${alpha}) 20%, oklch(${lightness}% ${chroma} 108 / ${alpha}) 30%, oklch(${lightness}% ${chroma} 144 / ${alpha}) 40%, oklch(${lightness}% ${chroma} 180 / ${alpha}) 50%, oklch(${lightness}% ${chroma} 216 / ${alpha}) 60%, oklch(${lightness}% ${chroma} 252 / ${alpha}) 70%, oklch(${lightness}% ${chroma} 288 / ${alpha}) 80%, oklch(${lightness}% ${chroma} 324 / ${alpha}) 90%, oklch(${lightness}% ${chroma} 360 / ${alpha}) 100%)`;
    alphaInput.style.background = `linear-gradient(90deg, oklch(${lightness}% ${chroma} ${hue} / 0) 0%, oklch(${lightness}% ${chroma} ${hue} / 1) 100%)`;
  }

  copyColor() {
    const { lightness, chroma, hue, alpha } = this.inputValues();

    const colorInput = this.querySelector(".color-input input");
    const colorCopyButton = this.querySelector(".color-copy");

    colorInput.select();
    // colorInput.setSelectionRange(0, 99999);

    document.execCommand("copy");

    colorCopyButton.innerHTML = "Success !";
    colorCopyButton.style.backgroundColor = `oklch(${lightness}% ${chroma} ${hue} / ${alpha})`;
    setTimeout(() => {
      colorCopyButton.innerHTML = "Copy";
      colorCopyButton.style.backgroundColor = "black";
    }, 1000);

    window.getSelection().removeAllRanges();
  }

  randomizeValues() {
    const { lightnessInput, chromaInput, hueInput, alphaInput } = this.inputs();

    lightnessInput.value = this.getRandomValue(lightnessInput.min, lightnessInput.max);
    chromaInput.value = this.getRandomValue(chromaInput.min, chromaInput.max);
    hueInput.value = this.getRandomValue(hueInput.min, hueInput.max);
    alphaInput.value = this.getRandomValue(alphaInput.min, alphaInput.max);

    this.updateColor();
  }

  getRandomValue(min, max) {
    return Math.random() * (max - min) + parseFloat(min);
  }

  inputValues() {
    const lightness = this.querySelector(".lightness").value;
    const chroma = this.querySelector(".chroma").value;
    const hue = this.querySelector(".hue").value;
    const alpha = this.querySelector(".alpha").value;

    return { lightness, chroma, hue, alpha };
  }

  inputs() {
    const lightnessInput = this.querySelector(".lightness");
    const chromaInput = this.querySelector(".chroma");
    const hueInput = this.querySelector(".hue");
    const alphaInput = this.querySelector(".alpha");

    return { lightnessInput, chromaInput, hueInput, alphaInput };
  }
}

customElements.define("color-creator", ColorCreator);
