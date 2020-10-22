import React, { useState, useEffect } from 'react';
import {storage} from "../../store/base";
import placeholder from '../../assets/images/placeholder-image.png';

const LayoutForm3 = (props) => {
  const initialFieldValues = {
    textLeft: '',
    imageRight: '',
    imageAltText: '',
    layout: props.pageElementLayout
  }

  const [values, setValues] = useState(initialFieldValues);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [showImageUpload, setShowImageUpload] = useState(true);
  const [showItemUpload, setShowItemUpload] = useState(false);

  useEffect(() => {
    if (props.currentId === ''){
      setValues({ ...initialFieldValues });
    } else {
      setValues({ ...props.contentObjects[props.currentId] });
      Object.keys(props.contentObjects).map((key) => (
        key === props.currentId ? setUrl(props.contentObjects[key].imageRight) : ''
      ))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId, props.contentObjects]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }
  const handleFormSubmit = e => {
    console.log('values', values);
    e.preventDefault();
    setShowImageUpload(true);
    setShowItemUpload(false);
    props.addOrEdit(values);
  }

  const handleImageSelection = e => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/png", "image/jpeg"];
      if (validImageTypes.includes(fileType)) {
        setError("");
        setImage(file);
      } else {
        setError("Please upload a valid image type (.gif, .png, .jpg)");
      }
    }
  }

  const handleUploadImage = e => {
    e.preventDefault();
    if(image) {
      const uploadTask = storage.ref(`images/content/layoutImages/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransfered / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          setError(error)
        },
        () => {
          storage.ref("images/content/layoutImages").child(image.name).getDownloadURL().then(url => {
            setUrl(url);
            setProgress(0);
            // setImageRight(url);
            values.imageRight = url;
            console.log('values.imageRight', values.imageRight);
            console.log('url', url);
            setShowImageUpload(false);
            setShowItemUpload(true);
          })
        }
      )
    } else {
      setError("Error! Please choose an image to upload");
    }
  }

  // const refreshForm = e => {
  //   e.preventDefault();
  //   (window.confirm('Warning! This will clear all text in each Layout styles'));
  //   setShowImageUpload(true);
  //   setShowItemUpload(false);
  //   setValues(initialFieldValues);
  // }

  // Skip Step 1
  const skipImageUpload = () => {
    setShowImageUpload(false);
    setShowItemUpload(true);
  }

  // console.log('props.currentId', props.currentId);

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit} className="layout_form layout">
      <div className="form_subheading">Layout 3</div>
      { props.currentId !== '' && <div className="edit_element_message">You are editing element with ID: <span class="bold">{props.currentId}</span></div> }

      <div className="profile_buttons_container">
        <button onClick={props.step1} className="button submit_btn form_button">Previous</button>
        {/* <button onClick={refreshForm} className="button submit_btn form_button">Refresh form</button> */}
      </div>

      { props.currentId !== '' && <div>You are editing element with ID: {props.currentId}</div> }

      {
        showImageUpload &&
        <div className="upload_image">
          <div className="form_subheading">Step 1/2: Upload image</div>
          <input

            name="uploadImage"
            onChange={handleImageSelection}
            type="file"
          />

          <div style={{height: "100px", width: "100px"}}>
            {url ? (
              <img style={{height: "100px", width: "auto", border: "1px solid grey", borderRadius: "5px"}} src={url} alt="uploaded" />
            ) : (
              <img style={{height: "100px", width: "auto", border: "1px solid grey", borderRadius: "5px"}} src={placeholder} alt="upload placeholder" />
            )}
          </div>

          <div style={{height: "30px"}}>
            { progress > 0 ? <progress value={progress} max="100" /> : ''}
            <p style={{color: "red"}}>{error}</p>
          </div>


          <div className="profile_buttons_container">
            <button className="button submit_btn form_button" onClick={handleUploadImage}>Upload image</button>
            { props.currentId !== '' && <button className="button submit_btn form_button" onClick={skipImageUpload}>Skip</button> }
          </div>
        </div>
      }
      {
        showItemUpload &&
        <>
          <div className="form_subheading">Step 2/2: Upload item details</div>
            {/* Text left */}
            <div className="form-group">
              <textarea
                className="form-control"
                name="textLeft"
                value={values.textLeft}
                placeholder="Text left"
                onChange={handleInputChange}>
              </textarea>
            </div>

            {/* Image alt text */}
            <div className="form-group">
              <input
                className="form-control"
                name="imageAltText"
                value={values.imageAltText}
                placeholder="Image alt text"
                onChange={handleInputChange}
                type="text"
              />
            </div>

          {/* Image right */}
          {
            values.imageRight !== '' &&
            <div className="form-group">
              <input
                className="form-control"
                name="imageRight"
                value={values.imageRight}
                onChange={handleInputChange}
                type="text"
                disabled="disabled"
              />
            </div>
          }

          {/* Save / Update */}
          <div className="profile_buttons_container">
            <button className="button submit_btn form_button">{props.currentId === "" ? "Save" : "Update"}</button>
          </div>
        </>
      }
    </form>
  );
}

export default LayoutForm3;
