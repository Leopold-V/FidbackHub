import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

const CodeBlock = ({ code }) => <SyntaxHighlighter language="javascript">{code}</SyntaxHighlighter>;

export default CodeBlock;
