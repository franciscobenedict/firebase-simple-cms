import React, { useState, useEffect } from 'react';

const LayoutForm2 = (props) => {
  const initialFieldValues = {
    textLeft: '',
    textRight: '',
    layout: props.pageElementLayout
  }

  const [values, setValues] = useState(initialFieldValues);
  // const [disableSave, setDisableSave] = useState(true);

  useEffect(() => {
    if (props.currentId === '')
      setValues({ ...initialFieldValues });
    else
      setValues({ ...props.contentObjects[props.currentId] });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [props.currentId, props.contentObjects]);

  const handleInputChange = e => {
    const { name, value } = e.target;

    // console.log('typing...');
    // if (values.textLeft === '' && values.textRight === '') {
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

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit} className="layout_form layout">
      <div className="form_subheading">Layout 2</div>
      { props.currentId !== '' && <div className="edit_element_message">You are editing element with ID: <span class="bold">{props.currentId}</span></div> }

      <div className="profile_buttons_container">
        <button onClick={props.step1} className="button submit_btn form_button">Previous</button>
        {/* <button onClick={refreshForm} className="button submit_btn form_button">Refresh form</button> */}
      </div>

      <div className="Layout2">
        {/* Text left*/}
        <div className="form-group">
          <textarea className="form-control" name="textLeft" placeholder="Text left"
            value={values.textLeft}
            onChange={handleInputChange}>
          </textarea>
        </div>

        {/* Text right*/}
        <div className="form-group">
          <textarea className="form-control" name="textRight" placeholder="Text right"
            value={values.textRight}
            onChange={handleInputChange}>
          </textarea>
        </div>
      </div>

      {/* Save / Update */}
      <div className="profile_buttons_container">
        <button className="button submit_btn form_button">{props.currentId === "" ? "Save" : "Update"}</button>
      </div>
    </form>
  );
}

export default LayoutForm2;
