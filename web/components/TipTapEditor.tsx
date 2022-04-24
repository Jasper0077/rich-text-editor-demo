import Underline from '@tiptap/extension-underline';
import { Editor, EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { Dispatch, useState } from 'react'
import Menubar from './Menubar';

interface TipTapEditorProps {
  setHtml: Dispatch<React.SetStateAction<string>>
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ setHtml }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: ``,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setHtml(html);
    },
  });

  const setJsonHandler = (editor: Editor | null) => {
    const json = editor?.getJSON();
    console.log(json);
    localStorage.setItem("content", JSON.stringify(json));
  }
  
  return (
    <div className="textEditor">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
      <button onClick={() => setJsonHandler(editor)}>Save Content</button>
    </div>
  );
}

export default TipTapEditor;