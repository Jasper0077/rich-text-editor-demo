import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { Dispatch } from 'react'
import Menubar from './Menubar';

interface TipTapEditorProps {
  setDescription: Dispatch<React.SetStateAction<string>>
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ setDescription }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: ``,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html);
    },
  });
  
  return (
    <div className="textEditor">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default TipTapEditor;