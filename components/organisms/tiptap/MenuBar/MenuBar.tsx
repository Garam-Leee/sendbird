import React, { useCallback, useState } from 'react';
import { EditorProps } from '@/types/tiptap';
import styled from '@emotion/styled';

const StyleButton = styled.button`
  display: inline-block;
  padding: 5px 10px;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 30px;

  &.is-active {
    background-color: black;
    color: #fff;
  }
`;

export default function MenuBar({ editor }: EditorProps) {
  const [color, setColor] = useState(
    editor?.getAttributes('textStyle').color || '',
  );

  const onColorInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = event.target.value;
      setColor(newColor);
      editor?.chain().focus().setColor(newColor).run();
    },
    [editor],
  );
  if (!editor) {
    return null;
  }

  return (
    <>
      <input type="color" onInput={onColorInput} value={color} />
      <StyleButton onClick={() => editor.chain().focus().unsetColor().run()}>
        unsetColor
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </StyleButton>

      <StyleButton onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </StyleButton>
      <StyleButton onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        horizontal rule
      </StyleButton>
      <StyleButton onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </StyleButton>
      <StyleButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </StyleButton>
    </>
  );
}
