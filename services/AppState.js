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

export class Observer {
    constructor(cb) {
        this.cb = cb;
    };
    signal = (subject) => {
        this.cb(subject);
    }
}

export default AppState;