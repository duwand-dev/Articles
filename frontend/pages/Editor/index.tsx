import React from 'react';
import { withProps } from '@udecode/cn';
import { createPlateEditor, Plate, ParagraphPlugin } from '@udecode/plate-common/react';
import { HeadingPlugin } from '@udecode/plate-heading/react';
import { ImagePlugin, MediaEmbedPlugin } from '@udecode/plate-media/react';
import { NodeIdPlugin } from '@udecode/plate-node-id';
import { ResetNodePlugin } from '@udecode/plate-reset-node/react';
import { DocxPlugin } from '@udecode/plate-docx';
import { CsvPlugin } from '@udecode/plate-csv';
import { MarkdownPlugin } from '@udecode/plate-markdown';
import { JuicePlugin } from '@udecode/plate-juice';
import { HEADING_KEYS } from '@udecode/plate-heading';

import { ImageElement } from '@/components/plate-ui/image-element';
import { HeadingElement } from '@/components/plate-ui/heading-element';
// import { MediaEmbedElement } from '@/components/plate-ui/media-embed-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { withPlaceholders } from '@/components/plate-ui/placeholder';

const editor = createPlateEditor({
  plugins: [
    ParagraphPlugin,
    HeadingPlugin,
    ImagePlugin,
    MediaEmbedPlugin,
    NodeIdPlugin,
    ResetNodePlugin.configure({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/reset-node
        ],
      },
    }),
    DocxPlugin,
    CsvPlugin,
    MarkdownPlugin,
    JuicePlugin,
  ],
  override: {
    components: withPlaceholders(({
      [ImagePlugin.key]: ImageElement,
      [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
      [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
      [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
      // [MediaEmbedPlugin.key]: MediaEmbedElement,
      [ParagraphPlugin.key]: ParagraphElement,
    })),
  },
  value: [
    {
      id: "1",
      type: "p",
      children: [{ text: "Hello, World!" }],
    },
  ],
});

export default () => {
  return (
    <Plate editor={editor}>
      <FixedToolbar>
        <FixedToolbarButtons />
      </FixedToolbar>

      <Editor />
    </Plate>
  );
}