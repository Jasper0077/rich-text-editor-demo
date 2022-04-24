import React from 'react';
import parse from "html-react-parser";
import { JSONContent } from '@tiptap/react';

interface DetailsProps {
  html: string
}

export const Details: React.FC<DetailsProps> = ({ html }) => {
  return (
    <>
      <div className="ProseMirror">{ parse(html) }</div>
    </>
  );
}