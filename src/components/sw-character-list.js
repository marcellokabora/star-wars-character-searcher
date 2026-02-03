import { LitElement, html, css } from 'lit';

/**
 * Character list component with inline details
 * @element sw-character-list
 * @property {Array} characters - Array of character objects to display
 */
export class SwCharacterList extends LitElement {
  static properties = {
    characters: { type: Array },
    _selectedUrl: { type: String, state: true }
  };

  static styles = css`
    :host {
      display: block;
    }

    .character-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .character-item {
      background: #000000;
      border: 1px solid #ffe81f;
      border-radius: 4px;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .character-item:hover {
      box-shadow: 
        0 0 10px rgba(255, 232, 31, 0.4),
        inset 0 0 20px rgba(255, 232, 31, 0.05);
    }

    .character-item.selected {
      box-shadow: 
        0 0 15px rgba(255, 232, 31, 0.5),
        0 0 30px rgba(255, 232, 31, 0.3);
    }

    .character-header {
      padding: 16px 20px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .character-name {
      font-size: 1.2rem;
      font-weight: 600;
      color: #ffe81f;
      letter-spacing: 1px;
    }

    .expand-icon {
      width: 24px;
      height: 24px;
      color: #ffe81f;
      transition: transform 0.3s ease;
    }

    .character-item.selected .expand-icon {
      transform: rotate(180deg);
    }

    .character-details {
      padding: 0 20px 20px;
      border-top: 1px solid rgba(255, 232, 31, 0.3);
      animation: slideDown 0.3s ease;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }

    .detail-item {
      background: rgba(255, 232, 31, 0.05);
      border: 1px solid rgba(255, 232, 31, 0.3);
      padding: 12px;
      border-radius: 4px;
    }

    .detail-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: #ffe81f;
      margin-bottom: 4px;
      letter-spacing: 2px;
    }

    .detail-value {
      font-size: 1rem;
      color: #ffffff;
      font-weight: 500;
    }
  `;

  constructor() {
    super();
    this.characters = [];
    this._selectedUrl = null;
  }

  _toggleCharacter(url) {
    this._selectedUrl = this._selectedUrl === url ? null : url;
  }

  _renderCharacterDetails(character) {
    return html`
      <div class="character-details">
        <div class="detail-grid">
          <div class="detail-item">
            <div class="detail-label">Name</div>
            <div class="detail-value">${character.name}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Birth Year</div>
            <div class="detail-value">${character.birth_year}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Gender</div>
            <div class="detail-value">${character.gender}</div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <ul class="character-list">
        ${this.characters.map(character => {
      const isSelected = this._selectedUrl === character.url;
      return html`
            <li class="character-item ${isSelected ? 'selected' : ''}">
              <div 
                class="character-header" 
                @click=${() => this._toggleCharacter(character.url)}
              >
                <div>
                  <div class="character-name">${character.name}</div>
                </div>
                <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              ${isSelected ? this._renderCharacterDetails(character) : ''}
            </li>
          `;
    })}
      </ul>
    `;
  }
}

customElements.define('sw-character-list', SwCharacterList);
