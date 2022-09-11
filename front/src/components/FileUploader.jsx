import { useState } from "react";


function FileUploader() {

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  return (
    <div className="fileUploader">
        <form>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
  );
}

export default FileUploader;