import React, { useState } from 'react';
import { withProps } from '@udecode/cn';
import { createPlateEditor, Plate, ParagraphPlugin } from '@udecode/plate-common/react';
import { HeadingPlugin } from '@udecode/plate-heading/react';
import { ImagePlugin, MediaEmbedPlugin } from '@udecode/plate-media/react';
import { AlignPlugin } from "@udecode/plate-alignment/react";
import { HEADING_KEYS } from '@udecode/plate-heading';

import { ImageElement } from '@/components/plate-ui/image-element';
import { HeadingElement } from '@/components/plate-ui/heading-element';
// import { MediaEmbedElement } from '@/components/plate-ui/media-embed-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { withPlaceholders } from '@/components/plate-ui/placeholder';
import { useRouter } from 'next/router';
import { InlineVoidPlugin, type Value } from '@udecode/plate-common';
import axios from 'axios';
import { serverURL } from '../../constants/constant';

const initialValue: Value = [
  {
    children: [{ text: 'Edit your article here.' }],
    type: ParagraphPlugin.key,
  },
];

export default () => {
  const router = useRouter();
  const { mode, _id, article } = router.query;
  console.log(router.query);
  const [art, setArt] = useState<Value>(mode === '0' ? initialValue : JSON.parse(article as string) as Value);

  const editor = createPlateEditor({
    plugins: [
      ParagraphPlugin,
      HeadingPlugin,
      ImagePlugin,
      MediaEmbedPlugin,
      AlignPlugin.configure({
        inject: { targetPlugins: ["p", "h1", "h2", "h3"] },
      }),
    ],
    override: {
      components: withPlaceholders({
        [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
        [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
        [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
        // [MediaEmbedPlugin.key]: MediaEmbedElement,
        [ParagraphPlugin.key]: ParagraphElement,
        [ImagePlugin.key]: ImageElement,
      }),
    },
    value: art,
  });

  const saveArticle = async () => {
    try {
      if (mode === '0') {
        await axios.post(`${serverURL}/addarticle`, { article: JSON.stringify(art) })
      } else {
        await axios.post(`${serverURL}/updatearticle`, { _id, article: JSON.stringify(art) });
      }
      alert("Article saved successfully!");
      router.push("/");
    } catch (err) {
      alert("Error while saving article!");
    }
  }
  return (
    <div className='size-full flex justify-center items-center flex-col'>
      <button className='w-11/12 m-3 bg-slate-200 rounded-full hover:bg-slate-400' onClick={(e) => saveArticle()}>Save</button>
      <Plate editor={editor} onChange={({ value }) => {
        setArt(value)
      }}>
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>

        <Editor />
      </Plate>
    </div>
  );
}