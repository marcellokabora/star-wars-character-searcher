import { LitElement, html, css } from "lit";

/**
 * Loading spinner component
 * @element sw-spinner
 */
export class SwSpinner extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 3px solid transparent;
      border-top-color: #ffe81f;
      border-bottom-color: #ffe81f;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      box-shadow:
        0 0 10px rgba(255, 232, 31, 0.3),
        inset 0 0 10px rgba(255, 232, 31, 0.1);
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  render() {
    return html`<div class="spinner"></div>`;
  }
}

customElements.define("sw-spinner", SwSpinner);
