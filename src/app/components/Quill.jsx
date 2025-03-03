import ReactQuill from "react-quill";
import { React } from "react";

export const Quill = ({ content, onChange, tabId }) => { // tabId parametresini alıyoruz
    return (
        <ReactQuill
            theme="snow"
            value={content}
            onChange={(value) => onChange(tabId, value)} // tabId'yi ve yeni değeri ileterek çağırıyoruz
            modules={{ toolbar: [['bold', 'italic', 'underline'], ['link']] }}
            formats={['bold', 'italic', 'underline', 'link']}
            placeholder="Buraya yazmaya başlayabilirsiniz..."
        />
    );
}
