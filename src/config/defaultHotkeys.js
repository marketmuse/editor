export default [
  {
    key: 'mod+b',
    when: ({ formats }) => !formats.isCollapsed,
    command: ({ functions }) => functions.toggleBold(),
  },
  {
    key: 'mod+i',
    when: ({ formats }) => !formats.isCollapsed,
    command: ({ functions }) => functions.toggleItalic(),
  },
  {
    key: 'mod+u',
    when: ({ formats }) => !formats.isCollapsed,
    command: ({ functions }) => functions.toggleUnderline(),
  },
  {
    key: 'mod+s',
    when: ({ formats }) => !formats.isCollapsed,
    command: ({ functions }) => functions.toggleStrikethrough(),
  },
];
