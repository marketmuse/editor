import * as plugins from '@plugins';

// core api's
export { default as functions } from '@editor/functions';
export { default as formats } from '@editor/formats';

// hooks
export { default as useEditor } from '@editor/hooks/useEditor';
export { default as useFormats } from '@editor/hooks/useFormats';
export { default as useFunctions } from '@editor/hooks/useFunctions';
export { default as useDecors } from '@editor/hooks/useDecors';

// toolbar
export { default as ToolbarButton } from '@components/toolbar/ToolbarButton';
export { default as ToolbarInput } from '@components/toolbar/ToolbarInput';
export { default as ItemSpacer } from '@components/toolbar/ItemSpacer';
export { ReactComponent as IconHeadings } from '@assets/heading.svg';
export { ReactComponent as IconHeadingOne } from '@assets/heading1.svg';
export { ReactComponent as IconHeadingTwo } from '@assets/heading2.svg';
export { ReactComponent as IconHeadingThree } from '@assets/heading3.svg';
export { ReactComponent as IconBold } from '@assets/bold.svg';
export { ReactComponent as IconItalic } from '@assets/italic.svg';
export { ReactComponent as IconUnderline } from '@assets/underline.svg';
export { ReactComponent as IconStrikethrough } from '@assets/strikethrough.svg';
export { ReactComponent as IconTrash } from '@assets/trash.svg';
export { ReactComponent as IconShare } from '@assets/share.svg';
export { ReactComponent as IconTick } from '@assets/tick.svg';
export { ReactComponent as IconLink } from '@assets/link.svg';
export { ReactComponent as IconListNumbered } from '@assets/listnum.svg';
export { ReactComponent as IconListBulleted } from '@assets/listbul.svg';
export { ReactComponent as IconQuote } from '@assets/quote.svg';

// plugins
export { plugins };

// default
export { default } from '@/MMSEditor';
