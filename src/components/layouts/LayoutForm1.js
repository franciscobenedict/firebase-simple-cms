import React, { useState, useEffect } from 'react';

const LayoutForm1 = (props) => {
  const initialFieldValues = {
    fullText: '',
    layout: props.pageElementLayout
  }

  const [values, setValues] = useState(initialFieldValues);
  // const [disableSave, setDisableSave] = useState(true);
  // console.log('values', values);

  useEffect(() => {
    if (props.currentId === '')
      setValues({ ...initialFieldValues });
    else
      setValues({ ...props.contentObjects[props.currentId] });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [props.currentId, props.contentObjects]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    // if (values.fullText === '') {
    //   setDisableSave(true);
    // } else {
    //   setDisableSave(false);
    // }
    setValues({ ...values, [name]: value });
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    props.addOrEdit(values);
  }

  // const refreshForm = e => {
  //   e.preventDefault();
  //   (window.confirm('Warning! This will clear all text in each Layout styles'));
  //   setValues(initialFieldValues);
  // }

  // const closeForm = e => {
  //   e.preventDefault();
  //   console.log('closeForm');
  //   setValues(initialFieldValues);
  //   props.toggleShow(false);
  // }

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit} className="layout_form">
      <div className="form_subheading">Layout 1</div>
      { props.currentId !== '' && <div className="edit_element_message">You are editing element with ID: <span class="bold">{props.currentId}</span></div> }

      <div className="profile_buttons_container">
        <button onClick={props.step1} className="button submit_btn form_button">Previous</button>
        {/* <button onClick={refreshForm} className="button submit_btn form_button">Refresh form</button> */}
      </div>

      {/* Full text */}
      <div className="form-group">
        <textarea className="form-control" name="fullText" placeholder="Full text"
          value={values.fullText}
          onChange={handleInputChange}>
        </textarea>
      </div>

      <div className="profile_buttons_container">
        <button className="button submit_btn form_button">{props.currentId === "" ? "Save" : "Update"}</button>
      </div>
    </form>
  );
}

export default LayoutForm1;
