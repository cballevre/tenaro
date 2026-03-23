import type React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownRenderProps {
  content?: string;
}

/**
 * Renders markdown content as HTML.
 *
 * @param content - The markdown string to render. Can be undefined.
 *
 * @remarks
 * This component uses react-markdown to safely parse and render markdown content.
 * It's companion to the MarkdownEditor component.
 */
const MarkdownRender: React.FC<MarkdownRenderProps> = ({ content }) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
      {content || ''}
    </ReactMarkdown>
  );
};

export { MarkdownRender };
