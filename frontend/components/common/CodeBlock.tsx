import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeBlock = ({ code }) => (
  <SyntaxHighlighter language="javascript" style={atomOneDark}>
    {code}
  </SyntaxHighlighter>
);

export default CodeBlock;