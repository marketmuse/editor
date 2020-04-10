export default {
  onKeyUp: (e, { formats, functions }) => {
    // going on a new line turns off heading
    if (e.key === 'Enter') {
      if (formats.isH1) functions.toggleHeading(1);
      if (formats.isH2) functions.toggleHeading(2);
      if (formats.isH3) functions.toggleHeading(3);
    }
  },
  hotkeys: [
    {
      key: 'mod+opt+1',
      command: ({ functions }) => functions.toggleHeading(1),
    },
    {
      key: 'mod+opt+2',
      command: ({ functions }) => functions.toggleHeading(2),
    },
    {
      key: 'mod+opt+3',
      command: ({ functions }) => functions.toggleHeading(3),
    },
  ]
};
