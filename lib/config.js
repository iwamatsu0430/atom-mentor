'use babel';

export default {
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
  resolution: {
    description: "Mentor's resolution",
    type: "object",
    order: 3,
    properties: {
      width: {
        title: 'Width',
        type: 'integer',
        default: 960,
        order: 1,
      },
      height: {
        title: 'Height',
        type: 'integer',
        default: 540,
        order: 2,
      },
    }
  },
  chromaKey: {
    description: "Mentor becomes fused with ATOM",
    type: "object",
    order: 4,
    properties: {
      enabled: {
        title: 'Enabled',
        description: 'Chroma key is heavy task. if your PC working hard, set false.',
        type: 'boolean',
        default: 'true',
        order: 1,
      },
      color: {
        title: 'Background color',
        description: "Set color for the chroma key",
        type: 'color',
        default: 'rgb(100, 200, 100)',
        order: 2,
      },
      threshold: {
        title: 'Threshold',
        description: "Threshold for the chroma key",
        type: 'integer',
        default: 80,
        order: 3,
      },
      fps: {
        title: 'FPS',
        description: "Mentor's FPS",
        type: 'integer',
        default: 30,
        order: 4,
      },
    }
  },
  speeches: {
    description: "Speech text for subtitles",
    type: "object",
    order: 5,
    properties: {
      enabled: {
        title: 'Enabled',
        type: 'boolean',
        default: 'true',
        order: 1,
      },
      color: {
        title: 'Subtitles color',
        description: "Set color to make it easy to see",
        type: 'color',
        default: 'white',
      },
      speech01: {
        title: "3.8s ~ 5.5s",
        type: "string",
        default: "Do it!",
      },
      speech02: {
        title: "6.0s ~ 8.0s",
        type: "string",
        default: "Just do it!",
      },
      speech03: {
        title: "8.5s ~ 11.5s",
        type: "string",
        default: "Don't let your dreams be dreams",
      },
      speech04: {
        title: "11.8s ~ 13.5s",
        type: "string",
        default: "Yesterday, you said tomorrow",
      },
      speech05: {
        title: "13.5s ~ 15.4s",
        type: "string",
        default: "So, Just do it!",
      },
      speech06: {
        title: "15.5s ~ 16.1s",
        type: "string",
        default: "Make",
      },
      speech07: {
        title: "16.2s ~ 17.0s",
        type: "string",
        default: "your dreams",
      },
      speech08: {
        title: "17.1s ~ 18.4s",
        type: "string",
        default: "come true!",
      },
      speech09: {
        title: "18.5s ~ 21.0s",
        type: "string",
        default: "Just do it!",
      },
      speech10: {
        title: "23.0s ~ 24.5s",
        type: "string",
        default: "Some people dreams success",
      },
      speech11: {
        title: "24.6s ~ 25.9s",
        type: "string",
        default: "while you are gonna wake up",
      },
      speech12: {
        title: "26.0s ~ 27.0s",
        type: "string",
        default: "and work hard any!",
      },
      speech13: {
        title: "27.1s ~ 29.5s",
        type: "string",
        default: "Nothing is possible",
      },
      speech14: {
        title: "31.0s ~ 32.4s",
        type: "string",
        default: "You should get to the point",
      },
      speech15: {
        title: "32.5s ~ 34.2s",
        type: "string",
        default: "where anyone else will quit",
      },
      speech16: {
        title: "34.3s ~ 36.0s",
        type: "string",
        default: "and you are not gonna stop there!",
      },
      speech17: {
        title: "36.5s ~ 37.0s",
        type: "string",
        default: "No!",
      },
      speech18: {
        title: "37.1s ~ 38.5s",
        type: "string",
        default: "What are you waiting for?",
      },
      speech19: {
        title: "39.5s ~ 41.0s",
        type: "string",
        default: "Do it!",
      },
      speech20: {
        title: "42.0s ~ 44.0s",
        type: "string",
        default: "Just",
      },
      speech21: {
        title: "44.5s ~ 45.5s",
        type: "string",
        default: "do it!",
      },
      speech22: {
        title: "45.6s ~ 47.0s",
        type: "string",
        default: "Yes you can!",
      },
      speech23: {
        title: "47.5s ~ 49.0s",
        type: "string",
        default: "Just do it!",
      },
      speech24: {
        title: "53.3s ~ 55.0s",
        type: "string",
        default: "If you are tired of starting over",
      },
      speech25: {
        title: "55.7s ~ 59.0s",
        type: "string",
        default: "stop giving up",
      },
    },
  }
};
