import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default function MDPreview(props) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked.parse(props.body)),
      }}
    ></div>
  );
}