import { useCallback, useRef } from 'react';
import { Image as TipTapImage } from '@tiptap/extension-image';
import { EditorContent, useEditor } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { StarterKit } from '@tiptap/starter-kit';

import MenuBar from '@/components/organisms/tiptap/MenuBar/MenuBar';

export default function TipTapEditor() {
  const photoInput = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      TipTapImage,
      Color,
      TextStyle,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
    `,
  });

  const onUploadImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      const url =
        'https://cdn.pixabay.com/photo/2015/01/20/11/09/black-605334_1280.jpg';
      if (!url) {
        return;
      }
      if (!editor) {
        return;
      }
      editor.chain().focus().setImage({ src: url }).run();
    },
    [editor],
  );

  const addImage = useCallback(() => {
    if (!photoInput.current) {
      return;
    }
    photoInput.current.click();
  }, []);

  const handleSubmit = useCallback(() => {
    const contentHTML = editor?.getHTML();
    const contentJSON = editor?.getJSON();
    return {
      contentHTML,
      contentJSON,
    };
  }, [editor]);

  return (
    <div>
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        multiple
        name="fileupload"
        ref={photoInput}
        style={{ display: 'none' }}
        onChange={onUploadImage}
      />
      <button onClick={addImage}>add image from URL</button>
      <br />
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <br />
      <br />
      <br />

      <button onClick={handleSubmit}>전송</button>
    </div>
  );
}
