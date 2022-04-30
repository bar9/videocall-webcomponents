import AppState from "./services/AppState.js";

import Participants from "./components/Participants.js";

window.AppState = AppState;

window.customElements.define("app-participants", Participants);
