class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
            </style>
            <form id="note-form">
                <input type="text" id="title" placeholder="Note Title" required>
                <textarea id="body" placeholder="Note Content" rows="5" required></textarea>
                <button type="submit">Add Note</button>
            </form>
        `;

        this.shadowRoot.querySelector('form').addEventListener('submit', this._addNote.bind(this));
    }

    _addNote(event) {
        event.preventDefault();
        const title = this.shadowRoot.querySelector('#title').value;
        const body = this.shadowRoot.querySelector('#body').value;

        if (title && body) {
            const noteItem = document.createElement('note-item');
            noteItem.setAttribute('title', title);
            noteItem.setAttribute('body', body);
            document.getElementById('notes-list').appendChild(noteItem);

            this.shadowRoot.querySelector('#note-form').reset();
        }
    }
}

customElements.define('note-form', NoteForm);
