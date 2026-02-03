import { LitElement, html, css } from "lit";
import { searchCharacters } from "../services/swapi-service.js";

/**
 * Main application shell component
 * @element sw-app
 */
export class SwApp extends LitElement {
  static properties = {
    _characters: { type: Array, state: true },
    _loading: { type: Boolean, state: true },
    _error: { type: String, state: true },
    _hasSearched: { type: Boolean, state: true },
  };

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }

    .app-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    header {
      text-align: center;
      margin-bottom: 40px;
    }

    .logo {
      max-width: 400px;
      width: 100%;
      height: auto;
    }

    .search-section {
      margin-bottom: 40px;
    }

    .results-section {
      margin-top: 30px;
    }

    .loading-container,
    .message-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
    }

    .loading-text {
      margin-top: 16px;
      color: #888;
    }

    .message {
      color: #888;
      font-size: 1.1rem;
    }

    .message-icon {
      font-size: 3rem;
      margin-bottom: 16px;
    }

    .error-message {
      background: rgba(255, 77, 77, 0.1);
      border: 1px solid rgba(255, 77, 77, 0.3);
      border-radius: 12px;
      padding: 20px;
      color: #ff6b6b;
      text-align: center;
    }

    .results-count {
      color: #888;
      margin-bottom: 16px;
      font-size: 0.9rem;
    }
  `;

  constructor() {
    super();
    this._characters = [];
    this._loading = false;
    this._error = null;
    this._hasSearched = false;
  }

  async _handleSearch(e) {
    const query = e.detail.query;

    // If query is empty, reset state
    if (!query) {
      this._characters = [];
      this._hasSearched = false;
      this._error = null;
      return;
    }

    this._loading = true;
    this._error = null;
    this._hasSearched = true;

    try {
      this._characters = await searchCharacters(query);
    } catch (err) {
      this._error =
        err.message || "An error occurred while searching. Please try again.";
      this._characters = [];
    } finally {
      this._loading = false;
    }
  }

  _renderResults() {
    // Loading state
    if (this._loading) {
      return html`
        <div class="loading-container">
          <sw-spinner></sw-spinner>
          <p class="loading-text">Searching the galaxy...</p>
        </div>
      `;
    }

    // Error state
    if (this._error) {
      return html`
        <div class="error-message">
          <p>⚠️ ${this._error}</p>
        </div>
      `;
    }

    // Initial state (no search yet)
    if (!this._hasSearched) {
      return html`
        <div class="message-container">
          <div class="message-icon">🔍</div>
          <p class="message">Search for a character above</p>
        </div>
      `;
    }

    // No results state
    if (this._characters.length === 0) {
      return html`
        <div class="message-container">
          <div class="message-icon">😈</div>
          <p class="message">No characters found</p>
        </div>
      `;
    }

    // Results state
    return html`
      <p class="results-count">
        ${this._characters.length}
        character${this._characters.length !== 1 ? "s" : ""} found
      </p>
      <sw-character-list .characters=${this._characters}></sw-character-list>
    `;
  }

  render() {
    return html`
      <div class="app-container">
        <header>
          <img
            src="/src/assets/star-wars-logo.png"
            alt="Star Wars"
            class="logo"
          />
        </header>

        <section class="search-section">
          <sw-search-input @search=${this._handleSearch}></sw-search-input>
        </section>

        <section class="results-section">${this._renderResults()}</section>
      </div>
    `;
  }
}

customElements.define("sw-app", SwApp);
