import MDEditor, { commands } from '@uiw/react-md-editor';
import type React from 'react';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  id?: string;
}

/**
 * A markdown editor component with sanitization support.
 *
 * Supports the following markdown features:
 * - Bold text
 * - Italic text
 * - Strikethrough
 * - Links
 *
 * Content is sanitized using rehype-sanitize to prevent XSS attacks.
 *
 * Usage example:
 * ```tsx
 * <MarkdownEditor value={markdown} onChange={setMarkdown} />
 * ```
 *
 * Limitations:
 * - Only the listed markdown features are supported.
 * - Other markdown features (e.g., tables, code blocks) may not be available.
 */
const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  id,
  value,
  onChange,
}) => {
  return (
    <MDEditor
      id={id}
      value={value}
      onChange={onChange}
      data-color-mode="light"
      commands={[
        commands.bold,
        commands.italic,
        commands.strikethrough,
        commands.link,
      ]}
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
    />
  );
};

export { MarkdownEditor };
