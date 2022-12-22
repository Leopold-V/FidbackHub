import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const CodeUsageBlock = () => {
  return (
    <SyntaxHighlighter language="javascript" style={atomOneDark}>
        {"<Avisitor token={YOUR_SECRET_KEY} />"}
    </SyntaxHighlighter>
  )
}
