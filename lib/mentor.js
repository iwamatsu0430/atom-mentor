'use babel';

import config from './config';
import { createSpeech } from './speech';

export default {

  mentor: null,
  interval: null,
  speechInterval: null,
  do: false,
  waitSeconds: 0,
  config: config,

  activate() {
    this.setupMentor();
    this.setupSubtitles();
    this.interval = setInterval(() => {
      if (this.do) {
        this.doNothing();
      } else {
        this.waitSeconds++;
        const showSeconds = atom.config.get('atom-mentor.showSeconds');
        if (this.waitSeconds === showSeconds) {
          this.show();
        }
      }
    }, 1000);
    atom.workspace.observeTextEditors(editor => {
      editor.getBuffer().onDidChange(() => {
        this.doIt();
      });
    });
  },

  setupMentor() {
    this.mentor = document.createElement('div');
    this.mentor.classList.add('mentor');
    this.mentor.addEventListener('click', () => this.hide());
    atom.workspace.getElement().appendChild(this.mentor);
  },

  setupSubtitles() {
    this.subtitles = document.createElement('p');
    this.subtitles.classList.add('subtitles');
    this.subtitles.addEventListener('click', () => this.hide());
    atom.workspace.getElement().appendChild(this.subtitles);
  },

  doIt() {
    this.do = true;
  },

  doNothing() {
    this.do = false;
    this.waitSeconds = 0;
  },

  show() {
    const video = atom.config.get('atom-mentor.video');
    this.mentor.classList.add('show');
    this.subtitles.classList.add('show');
    this.mentor.innerHTML = `<iframe src="https://www.youtube.com/embed/${video}?controls=0&autoplay=1&loop=1&playlist=${video}&muted=1" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
    const iframe = this.mentor.querySelector('iframe');
    this.subtitles.style = `color: ${atom.config.get('atom-mentor.speeches.color').toRGBAString()}`;
    iframe.onload = () => this.updateSpeech(iframe);
  },

  updateSpeech(iframe) {
    const innerVideo = iframe.contentWindow.document.querySelector('video');
    this.speechInterval = setInterval(() => {
      const current = innerVideo.getCurrentTime();
      const target = createSpeech().find(s => current >= s.start && current <= s.end);
      if (target) {
        this.subtitles.innerHTML = target.text;
      } else {
        this.subtitles.innerHTML = '';
      }
    }, 100);
  },

  hide() {
    this.mentor.innerHTML = '';
    this.mentor.classList.remove('show');
    this.subtitles.innerHTML = '';
    this.subtitles.classList.remove('show');
    this.doNothing();
    clearTimeout(this.speechInterval);
  },

  deactivate() {
    this.mentor.remove();
    this.subtitles.remove();
    clearInterval(this.interval);
    clearTimeout(this.speechInterval);
  },

  serialize() {}

};
