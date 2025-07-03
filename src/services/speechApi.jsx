// =================================================================
// RESPONSABILIDADE: Encapsular a Web Speech API.
// =================================================================
const speechApi = {
    synth: window.speechSynthesis,
    voices: {},
    loadVoices() {
        const allVoices = this.synth.getVoices();
        this.voices['pt-BR'] = allVoices.find(v => v.lang === 'pt-BR') || allVoices.find(v => v.lang.startsWith('pt'));
        this.voices['en-US'] = allVoices.find(v => v.lang === 'en-US') || allVoices.find(v => v.lang.startsWith('en'));
    },
    speak(text, lang = 'pt-BR') {
        if (this.synth.speaking) {
            this.synth.cancel();
        }
        const utterThis = new SpeechSynthesisUtterance(text);
        utterThis.voice = this.voices[lang];
        utterThis.pitch = 1.2;
        utterThis.rate = 0.9;
        this.synth.speak(utterThis);
    }
};
if (speechApi.synth.onvoiceschanged !== undefined) {
    speechApi.synth.onvoiceschanged = () => speechApi.loadVoices();
}

export default speechApi;