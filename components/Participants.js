import {Observer} from "../services/AppState.js";

class Participants extends HTMLElement {
    constructor() {
        super();
        AppState.addObserver(
            new Observer(
                () => this.innerHTML =
                    '<div id="room">'
                    + AppState.participants.map(p => `
                        <div class="participant">
                            ${p.name}
                            <video 
                                autoplay="true" 
                                class="videoElement">
                            </video>
                        </div>
                    `.trim()).join('')
                    + '</div>'
            )
        );
        //default
        AppState.init();
    }
}

export default Participants;
