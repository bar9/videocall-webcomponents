// App state

let participants = [
    { name: "Roland" },
    { name: "Anyone?"}
];

let stream = null;

let observers = [];

const AppState = {
    participants,
    addParticipant: (p) => {
        participants.push(p);
        observers.forEach(o => {
            o.signal(participants);
        })
    },
    startVideo: async () => {
        stream = await navigator.mediaDevices.getUserMedia({video: true});
        const videoElements = document.getElementsByClassName("videoElement");
        for (const videoElement of videoElements) {
            videoElement.srcObject = stream;
        }
    },
    stopVideo: () => {
        stream.getTracks().forEach(t => t.stop());
    },
    addObserver: (o) => observers.push(o),
    init: () => observers.forEach(o => o.signal(participants))
};

class Observer {
    constructor(cb) {
        this.cb = cb;
    };
    signal = (subject) => {
        this.cb(subject);
    }
}

//Components

// class Room extends HTMLElement {
//     constructor() {
//         const template = document.createElement('template');
//         template.innerHTML = `
//             <div class="app-room">
//                 <slot></slot>
//             </div>
//         `.trim();
//         super();
//         this.attachShadow({mode: 'open'});
//         this.shadowRoot.appendChild(template.content.cloneNode(true));
//     }
// }
// window.customElements.define("app-room", Room);

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
window.customElements.define("app-participants", Participants);
