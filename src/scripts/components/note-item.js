class NoteItem extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'body', 'createdat'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.delete-btn')?.addEventListener('click', () => this.remove());
        this.shadowRoot.querySelector('h3')?.addEventListener('click', this.editTitle.bind(this));
        this.shadowRoot.querySelector('p.body')?.addEventListener('click', this.editBody.bind(this));
    }

    editTitle(event) {
        const h3 = event.target;
        const originalText = h3.textContent;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalText;

        input.addEventListener('blur', () => {
            this.setAttribute('title', input.value);
        });

        h3.replaceWith(input);
        input.focus();
    }

    editBody(event) {
        const p = event.target;
        const originalText = p.textContent;

        const textarea = document.createElement('textarea');
        textarea.value = originalText;

        textarea.addEventListener('blur', () => {
            this.setAttribute('body', textarea.value);
        });

        p.replaceWith(textarea);
        textarea.focus();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background-color: #FCDC94;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    position: relative;
                }
                h3 {
                    margin: 0;
                    cursor: pointer;
                }
                p {
                    margin: 10px 0 0;
                    cursor: pointer;
                }
                .date {
                    font-size: 0.9rem;
                    color: #78ABA8;
                    margin-top: 5px;
                }
                .delete-btn {
                    position: flex; /* Tambahkan posisi absolute */
                    down: 5px;
                    right: 10px;
                    background-color: #FF6F61;
                    border:#007bff;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 2px;
                    cursor: pointer;
                }
            </style>
            <div>
                <h3>${this.getAttribute('title')}</h3>
                <p class="body">${this.getAttribute('body')}</p>
                <p class="date">${this.getAttribute('createdat')}</p>
                <button class="delete-btn">Delete</button>
            </div>
        `;
    }
}

customElements.define('note-item', NoteItem);
