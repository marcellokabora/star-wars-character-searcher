import { LitElement, html, css } from "lit";

/**
 * Search input component with debouncing
 * @element sw-search-input
 * @fires search - Dispatched when the debounced search should be performed
 */
export class SwSearchInput extends LitElement {
  static properties = {
    _value: { type: String, state: true },
  };

  static styles = css`
    :host {
      display: block;
    }

    .search-container {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      max-width: 600px;
    }

    .search-icon {
      position: absolute;
      left: 36px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      color: #ffe81f;
    }

    input {
      width: 100%;
      max-width: 500px;
      padding: 16px 16px 16px 48px;
      font-size: 1.1rem;
      border: 2px solid #ffe81f;
      border-radius: 4px;
      background: #000000;
      color: #ffffff;
      outline: none;
      transition: box-shadow 0.3s ease;
      letter-spacing: 1px;
    }

    input::placeholder {
      color: #666;
      letter-spacing: 1px;
    }

    input:focus {
      box-shadow:
        0 0 10px rgba(255, 232, 31, 0.5),
        0 0 20px rgba(255, 232, 31, 0.3),
        inset 0 0 10px rgba(255, 232, 31, 0.1);
    }
  `;

  constructor() {
    super();
    this._value = "";
    this._debounceTimer = null;
  }

  _handleInput(e) {
    this._value = e.target.value;

    // Clear existing timer
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
    }

    // Set new debounce timer (300ms)
    this._debounceTimer = setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent("search", {
          detail: { query: this._value.trim() },
          bubbles: true,
          composed: true,
        }),
      );
    }, 300);
  }

  render() {
    return html`
      <div class="search-container">
        <svg
          class="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
        <input
          id="search-input"
          type="text"
          placeholder="Search for a character..."
          .value=${this._value}
          @input=${this._handleInput}
        />
      </div>
    `;
  }
}

customElements.define("sw-search-input", SwSearchInput);
