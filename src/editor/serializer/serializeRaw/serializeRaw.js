import { DATA_VERSION } from '@config/common';

export default editorState => ({
  version: process.env.LIB_VERSION,
  data_version: DATA_VERSION,
  data: editorState,
});
