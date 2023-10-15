import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
type Props = {
   getValue: (value: string) => void;
};

const formats = [
   'header',
   'bold',
   'italic',
   'underline',
   'strike',
   'blockquote',
   'list',
   'bullet',
   'indent',
   'link',
   'image'
];

const modules = {
   toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean']
   ]
};
const TextQuill = ({ getValue }: Props) => {
   const [value, setValue] = useState<string>('');
   const handleGetValue = (value: string) => {
      getValue(value);
      setValue(value);
   };
   return (
      <ReactQuill
         theme='snow'
         formats={formats}
         modules={modules}
         value={value}
         onChange={(value) => handleGetValue(value)}
      />
   );
};

export default TextQuill;
