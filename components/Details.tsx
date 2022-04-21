import React from 'react';
import parse from "html-react-parser";

interface DetailsProps {
  description: string
}

export const Details: React.FC<DetailsProps> = ({ description }) => {
  return (
    <>
      <div className="ProseMirror">{ parse(description) }</div>
    </>
  );
}