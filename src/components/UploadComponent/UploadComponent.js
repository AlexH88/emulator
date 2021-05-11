import React from "react";
import plusIcon from "../../assets/plusicon.svg";

const UploadComponent = ({ onUpload }) => {
  const onHandleChange = (event) => {
    onUpload(event.target.files[0]);
  };

  return (
    <div className="image-upload" title="Загрузить документ">
      <label htmlFor="file-input">
        <span>
          <img src={plusIcon} /> Загрузить документ
        </span>
      </label>

      <input id="file-input" type="file" onChange={onHandleChange} />
    </div>
  );
};

export default UploadComponent;
