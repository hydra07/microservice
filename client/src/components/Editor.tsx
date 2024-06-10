//ts-ignore
import ImageResize from 'quill-image-resize-module-react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
Quill.register('modules/imageResize', ImageResize);

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
  };
  return (
    <>
      <div className="content">
        <ReactQuill
          style={{
            height: '300px',
            resize: 'vertical',
          }}
          value={value}
          theme={'snow'}
          onChange={onChange}
          modules={modules}
        />
      </div>
    </>
  );
}
