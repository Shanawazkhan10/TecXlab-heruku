import React, { useState } from 'react';
// import "./PersonalInfo.css";
// import Image from 'react-bootstrap/Image';

const UploadDocument = () => {
  const [photo, SetPhoto] = useState([]);

  const ImageChnage = (eve) => {
    // SetPhoto([...photo, eve.target.files]);
    if (eve.target.files) {
      const fileArray = Array.from(eve.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      // console.log(fileArray);

      SetPhoto((prevImg) => prevImg.concat(fileArray));
      Array.from(eve.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(photo);
    // const test = URL;
    // console.log(test);
    SetPhoto([]);
  };

  const RenderData = (src) => {
    return src.map((images) => {
      return (
        <img
          src={images}
          key={images}
          alt="loading"
          width="300px"
          height="150px"
          style={{ padding: '5px' }}
        />
        // <Image className="mt-2" src={images} key={images} fluid />
      );
    });
  };
  return (
    <>
      {' '}
      <div>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form style={{ textAlign: 'center' }}>
              <h3> Upload Documents</h3>
              <input
                type="file"
                multiple
                name="photo"
                onChange={(e) => ImageChnage(e)}
                accept="image/*"
              />
              <br />
              <br />
              <div style={{ padding: '5px' }}>{RenderData(photo)}</div>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadDocument;
