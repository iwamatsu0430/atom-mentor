'use babel';

export default {

  mentor: null,
  interval: null,
  do: false,
  waitSeconds: 0,

  config: {
    video: {
      title: "Video ID",
      description: "Set YouTube ID",
      type: "string",
      default: "ZXsQAXx_ao0",
      order: 1,
    },
    showSeconds: {
      title: "Show Seconds",
      description: "Waiting time for your mentoring",
      type: "integer",
      default: 60,
      order: 2,
    },
  },

  activate() {
    this.setupMentor();
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
    this.mentor.addEventListener('click', () => {
      this.hide();
      this.doNothing();
    });
    atom.workspace.getElement().appendChild(this.mentor);
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
    this.mentor.innerHTML = `<iframe src="https://www.youtube.com/embed/${video}?controls=0&autoplay=1&loop=1&playlist=${video}&muted=1" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
  },

  hide() {
    this.mentor.innerHTML = '';
    this.mentor.classList.remove('show');
  },

  deactivate() {
    this.mentor.remove();
    clearInterval(this.interval);
  },

  serialize() {}

};
