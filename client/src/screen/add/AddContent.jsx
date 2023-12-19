import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';
require('quill/dist/quill.snow.css');
require('quill-mention/dist/quill.mention.min.css');
window.katex = katex;
const Quill = require('quill');
const formats = ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
'header', 'list', 'script', 'indent', 'direction', 'size', 'color', 'background', 'font', 'align', 'image', 'formula'];

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  [{ 'indent': '-1'}, { '+1' : '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': ['', 'center', 'right', 'justify'] }],
  ['formula', 'image'], // Adding 'image' here
  ['clean']
];
function AddContent({ value, onChange }) {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={{ toolbar: toolbarOptions, formula: true }}
      formats={formats}
    />
  );
}

export default AddContent;
