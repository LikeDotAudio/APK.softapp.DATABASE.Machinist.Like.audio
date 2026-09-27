import React from 'react';

/**
 * Render manual prose kept as plain strings: `**text**` becomes <strong>text</strong> and a
 * newline becomes <br/>. Nothing else is interpreted.
 */
export const RichText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {i > 0 && <br/>}
        {line.split('**').map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
      </React.Fragment>
    ))}
  </>
);
