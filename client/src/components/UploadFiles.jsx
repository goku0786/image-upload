import React, { useRef, useState } from "react";
import {
  MdOutlinePermMedia,
  MdOutlineCloudUpload,
  MdCancel,
} from "react-icons/md";

function UploadFiles() {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handlePreview = async (e) => {
    const files = Array.from(e.target.files);
    if (preview.length + files.length > 6) {
      alert("You can only upload up to 6 images.");
      return;
    }

    const slicedFiles = files.slice(0, 6 - preview.length);

    setLoading(true);
    for (let img of slicedFiles) {
      await upload(img);
    }
    setLoading(false);
  };

  async function upload(file) {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5050/image/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    console.log(result);

    if (result?.success === true) {
      setPreview((prePreview) => [...prePreview, result?.image]);
    }
  }

  const handleRemoveImage = (fileToRemove) => {
    setPreview((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const saveHandler = ()=>{
    console.log(preview)
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-20">
      <div className="bg-gray-100 min-w-[600px] rounded-md p-3 px-5">
        <span className="flex items-center gap-2">
          Media <MdOutlinePermMedia />
        </span>
        <div className="flex justify-center">
          <span
            onClick={handleClick}
            className="border border-gray-300 hover:border-gray-400 hover:bg-blue-100 cursor-pointer py-5 w-full flex flex-col items-center gap-2 rounded-md hover:text-blue-800"
          >
            <input
              ref={inputRef}
              onChange={handlePreview}
              type="file"
              multiple
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
            />
            <MdOutlineCloudUpload className="text-4xl" />
            {` Upload Files ${preview.length} of ${6}`}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 pt-5">
          {loading && (
            <p className="flex justify-center items-center border-2 p-2 rounded-md text-xs text-blue-500 w-[80px] h-[100px]">
              Uploading...
            </p>
          )}
          {preview.map((fileUrl, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 border-2 p-2 rounded-md hover:text-white hover:bg-blue-500 cursor-pointer relative group"
            >
              <MdCancel
                onClick={() => handleRemoveImage(fileUrl)}
                className="cursor-pointer bg-blue-500 rounded-full absolute top-1 right-1 text-2xl hidden group-hover:block"
              />
              <img
                src={fileUrl}
                alt="preview"
                className="w-[70px] h-[60px] object-cover"
              />
              <span className="text-[8px]">Image {index + 1}</span>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-row-reverse mb-3 mt-5">
          <button
            disabled={loading}
            onClick={saveHandler}
            className="bg-blue-600 text-white px-8 py-1 rounded-sm cursor-pointer hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadFiles;
