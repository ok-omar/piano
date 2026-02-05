"use strict";
///////////////////////////////////////////////////////////
// Alumnes: 
///////////////////////////////////////////////////////////
const KEY_TO_NOTE = {
    // White keys
    'A': 'c1',
    'S': 'd1',
    'D': 'e1',
    'F': 'f1',
    'G': 'g1',
    'H': 'a1',
    'J': 'b1',
    'R': 'c2',
    'T': 'd2',
    'Y': 'e2',
    'U': 'f2',
    'I': 'g2',
    'O': 'a2',
    'P': 'b2',
    // Black keys
    '1': 'c1s',
    '2': 'd1s',
    '3': 'f1s',
    '4': 'g1s',
    '5': 'a1s',
    '6': 'c2s',
    '7': 'd2s',
    '8': 'f2s',
    '9': 'g2s',
    '0': 'a2s',
    // Duplicate mappings
    'K': 'c2', // K = R
    'L': 'd2', // L = T
    'Ñ': 'e2', // Ñ = Y
    'Q': 'g1', // Q = G
    'W': 'a1', // W = H
    'E': 'b1' // E = J
};
const NOTE_TO_KEY_ID = {
    'c1': 'k65', // A
    'd1': 'k83', // S
    'e1': 'k68', // D
    'f1': 'k70', // F
    'g1': 'k71', // G
    'a1': 'k72', // H
    'b1': 'k74', // J
    'c2': 'k82', // R
    'd2': 'k84', // T
    'e2': 'k89', // Y
    'f2': 'k85', // U
    'g2': 'k73', // I
    'a2': 'k79', // O
    'b2': 'k80', // P
    'c1s': 'k49', // 1
    'd1s': 'k50', // 2
    'f1s': 'k51', // 3
    'g1s': 'k52', // 4
    'a1s': 'k53', // 5
    'c2s': 'k54', // 6
    'd2s': 'k55', // 7
    'f2s': 'k56', // 8
    'g2s': 'k57', // 9
    'a2s': 'k48' // 0
};
const KEY_ID_TO_NOTE = {
    'k65': 'c1',
    'k83': 'd1',
    'k68': 'e1',
    'k70': 'f1',
    'k71': 'g1',
    'k72': 'a1',
    'k74': 'b1',
    'k82': 'c2',
    'k84': 'd2',
    'k89': 'e2',
    'k85': 'f2',
    'k73': 'g2',
    'k79': 'a2',
    'k80': 'b2',
    'k49': 'c1s',
    'k50': 'd1s',
    'k51': 'f1s',
    'k52': 'g1s',
    'k53': 'a1s',
    'k54': 'c2s',
    'k55': 'd2s',
    'k56': 'f2s',
    'k57': 'g2s',
    'k48': 'a2s'
};
// Set for pressed keyboard keys
const pressedKeys = new Set();
// Set for active notes in html
const activeNotes = new Map();
const piano = document.getElementById("piano");
// Prevent browser gestures (zoom, scroll, context menu) on the piano area
if (piano) {
    piano.style.touchAction = "none";
    piano.addEventListener("contextmenu", e => e.preventDefault());
    piano.addEventListener("touchstart", e => e.preventDefault(), { passive: false });
    piano.addEventListener("touchmove", e => e.preventDefault(), { passive: false });
}
document.addEventListener('keydown', (event) => {
    console.log(event);
    const key = event.key.toUpperCase();
    // return if key is not a valid key from piano
    if (!(key in KEY_TO_NOTE))
        return;
    // return if the button is already pressed, avoid overlapping inputs of the same key
    if (pressedKeys.has(key))
        return;
    // Get the name of the file to be played from the object KEY_TO_SOUND using the valid key
    const note = KEY_TO_NOTE[key];
    // Add the pressed key to the set
    pressedKeys.add(key);
    // Play the note
    noteOn(note);
});
document.addEventListener('keyup', (event) => {
    const key = event.key.toUpperCase();
    // return if key is not a valid key from piano
    if (!(key in KEY_TO_NOTE))
        return;
    pressedKeys.delete(key);
    // Get the note name
    const note = KEY_TO_NOTE[key];
    // Stop the note
    noteOff(note);
});
piano.addEventListener("pointerdown", e => {
    e.preventDefault();
    if (e.target) {
        const note = noteFromElement(e.target);
        if (note)
            noteOn(note);
    }
});
piano.addEventListener("pointerup", e => {
    e.preventDefault();
    if (e.target) {
        const note = noteFromElement(e.target);
        if (note)
            noteOff(note);
    }
});
piano.addEventListener("pointerleave", e => {
    e.preventDefault();
    if (e.target) {
        const note = noteFromElement(e.target);
        if (note)
            noteOff(note);
    }
});
piano.addEventListener("pointercancel", e => {
    e.preventDefault();
    if (e.target) {
        const note = noteFromElement(e.target);
        if (note)
            noteOff(note);
    }
});
function noteOn(note) {
    if (activeNotes.has(note))
        return;
    const audio = new Audio(`notes/${note}.mp3`);
    audio.currentTime = 0;
    audio.play();
    activeNotes.set(note, audio);
    const keyId = NOTE_TO_KEY_ID[note];
    document.getElementById(keyId)?.classList.add('activa');
}
;
function noteOff(note) {
    const audio = activeNotes.get(note);
    if (!audio)
        return;
    audio.pause();
    audio.currentTime = 0;
    activeNotes.delete(note);
    const keyId = NOTE_TO_KEY_ID[note];
    document.getElementById(keyId)?.classList.remove('activa');
}
function noteFromElement(target) {
    const el = target.closest("[id^='k']");
    if (!el)
        return null;
    return KEY_ID_TO_NOTE[el.id] ?? null;
}
//# sourceMappingURL=PianoMan.js.map