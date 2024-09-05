class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                header {
                    background-color: #007bff;
                    color: #fff;
                    padding: 15px;
                    display: flex; 
                    align-items: center; 
                    gap: 10px; 
                }
                .logo {
                    height: 40px; 
                    width: auto; 
                }
                h1 {
                    margin: 0; 
                    font-size: 1.5rem; 
                }
            </style>
            <header>
                <img src="noteslogo.png" alt="Logo" class="logo"> 
                <h1>Notes App</h1>
            </header>
        `;
    }
}

customElements.define('app-header', AppHeader);
