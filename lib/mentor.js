'use babel';

import config from './config';
import { createSpeech } from './speech';

export default {

  isMentoring: false,
  mentorBackground: null,
  mentorForeground: null,
  interval: null,
  speechInterval: null,
  drawInterval: null,
  do: false,
  waitSeconds: 0,
  currentTime: null,
  config: config,

  activate() {
    console.log(atom.config.get('atom-mentor.chromaKey.color').blue);
    this.setupMentor();
    this.setupSubtitles();
    this.interval = setInterval(() => {
      if (this.isMentoring) return;
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
    this.mentorBackground = document.createElement('div');
    this.mentorForeground = document.createElement('div');
    this.mentorBackground.classList.add('mentor-background');
    this.mentorForeground.classList.add('mentor-foreground');
    this.mentorForeground.addEventListener('click', () => this.hide());
    atom.workspace.getElement().appendChild(this.mentorBackground);
    atom.workspace.getElement().appendChild(this.mentorForeground);
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
    this.isMentoring = true;
    this.subtitles.classList.add('show');
    const video = atom.config.get('atom-mentor.video');
    const isEnabledChromaKey = atom.config.get('atom-mentor.chromaKey.enabled');
    const iframeHTML = `<iframe src="https://www.youtube.com/embed/${video}?controls=0&autoplay=1&loop=1&playlist=${video}&muted=1" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
    const canvasHTML = `<canvas width="${atom.config.get('atom-mentor.resolution.width')}" height="${atom.config.get('atom-mentor.resolution.height')}"></canvas>`;
    if (isEnabledChromaKey) {
      this.mentorBackground.innerHTML = iframeHTML;
      this.mentorForeground.innerHTML = canvasHTML;
      const iframe = this.mentorBackground.querySelector('iframe');
      const canvas = this.mentorForeground.querySelector('canvas');
      iframe.onload = () => {
        this.updateSpeech(iframe);
        this.updateCanvas(iframe, canvas);
      };
    } else {
      this.mentorForeground.innerHTML = iframeHTML;
      const iframe = this.mentorForeground.querySelector('iframe');
      iframe.onload = () => {
        this.updateSpeech(iframe);
        this.mentorForeground.classList.add('show');
      };
    }
  },

  updateSpeech(iframe) {
    const video = iframe.contentWindow.document.querySelector('video');
    this.subtitles.style = `color: ${atom.config.get('atom-mentor.speeches.color').toRGBAString()}`;
    const isEnabled = atom.config.get('atom-mentor.speeches.enabled')
    this.speechInterval = setInterval(() => {
      this.currentTime = video.getCurrentTime();
      if (!isEnabled) return;
      const target = createSpeech().find(s => this.currentTime >= s.start && this.currentTime <= s.end);
      if (target) {
        this.subtitles.innerHTML = target.text;
      } else {
        this.subtitles.innerHTML = '';
      }
    }, 100);
  },

  // TODO refactoring
  updateCanvas(iframe, canvas) {
    const video = iframe.contentWindow.document.querySelector('video');
    const configColor = atom.config.get('atom-mentor.chromaKey.color');
    const chromaKeyColor = { r: configColor.red, g: configColor.green, b: configColor.blue };
    const threshold = atom.config.get('atom-mentor.chromaKey.threshold');
    const fps = atom.config.get('atom-mentor.chromaKey.fps');
    const context = canvas.getContext('2d');
    let duration = 0;
    video.addEventListener('canplaythrough', () => duration = video.getDuration());
    let alpha = 0;
    this.drawInterval = setInterval(() => {
      let classList = this.mentorForeground.classList;
      if (this.currentTime >= 0.5 && !classList.contains('show')) {
        classList.add('show');
        alpha = 0;
      } else if (this.currentTime < 0.5 && classList.contains('show')) {
        classList.remove('show');
      }
      if (!classList.contains('show')) return;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      let data = imageData.data;
      for (let i = 0, l = data.length; i < l; i += 4) {
        const target = { r: data[i], g: data[i + 1], b: data[i + 2] };
        if (this.calcColorDistance(chromaKeyColor, target) < threshold) {
          data[i + 3] = 0;
        } else {
          data[i + 3] = alpha;
        }
      }
      imageData.data = data;
      context.putImageData(imageData, 0, 0);
      if (this.currentTime < 3 && alpha < 255) alpha += 5;
      if (this.currentTime > duration - 3 && alpha > 0) alpha -= 5;
    }, 1000 / fps);
  },

  calcColorDistance(rgb1, rgb2) {
    return Math.sqrt(
      Math.pow((rgb1.r - rgb2.r), 2) +
      Math.pow((rgb1.g - rgb2.g), 2) +
      Math.pow((rgb1.b - rgb2.b), 2)
    );
  },

  hide() {
    this.isMentoring = false;
    this.mentorBackground.innerHTML = '';
    this.mentorForeground.innerHTML = '';
    this.mentorBackground.classList.remove('show');
    this.mentorForeground.classList.remove('show');
    this.subtitles.innerHTML = '';
    this.subtitles.classList.remove('show');
    this.doNothing();
    clearTimeout(this.speechInterval);
    clearTimeout(this.drawInterval);
  },

  deactivate() {
    this.mentorBackground.remove();
    this.mentorForeground.remove();
    this.subtitles.remove();
    clearInterval(this.interval);
    clearTimeout(this.speechInterval);
    clearTimeout(this.drawInterval);
  },

  serialize() { }

};
