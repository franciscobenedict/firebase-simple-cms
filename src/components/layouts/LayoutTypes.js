import React from 'react';
import { useUser } from 'reactfire';
import placeholder from '../../assets/images/placeholder-image.png';

export const LayoutTypes = (props) => {
  const currentUser = useUser();

  return (
    <>
      {/* LOADER SPINNER */}
      {
        Object.keys(props.contentObjects).length < 1 &&
        <div className="loading">
          <div><i className="fas fa-spinner fa-spin"></i></div>
        </div>
      }

      {
        Object.keys(props.contentObjects).map((key) => (
          <div className={ props.show ? 'making_changes layout' : 'layout'} key={key}>
            {/* LAYOUT 1 MARKUP */}
            {
              props.contentObjects[key].layout === 'Layout1' &&
              <>
                <div className={currentUser && props.show ? 'making_changes '+props.contentObjects[key].layout : props.contentObjects[key].layout}>
                  <div className="full_text">{props.contentObjects[key].fullText}</div>
                </div>

                <div className="">
                  {
                    currentUser && props.show &&
                    <div className="changes_warning"><span className="bold">WARNING</span>: You are making changes to element with ID <span className="bold">{key}</span> in the database table for the
                      <span className="bold"> {props.dBTable} page.</span>
                    </div>
                  }

                  {
                    currentUser && props.show &&
                    <div class="grid_container">
                      <button className="button submit_btn form_button grid_element" onClick={() => { props.setCurrentId(key); props.setPageElementLayout(props.contentObjects[key].layout); props.showEditView(props.contentObjects[key].layout); props.executeScroll() }}>
                        <i className="fas fa-pencil-alt"></i>EDIT Layout 1
                      </button>
                      <button className="button submit_btn form_button grid_element" onClick={() => { props.onDelete(key) }}>
                        <i className="far fa-trash-alt"></i>TRASH Layout 1
                      </button>
                    </div>
                  }
                </div>
              </>
            }

            {/* LAYOUT 2 MARKUP */}
            {
              props.contentObjects[key].layout === 'Layout2' &&
              <>
                <div className={currentUser && props.show ? 'making_changes '+props.contentObjects[key].layout : props.contentObjects[key].layout}>
                  <div className="text_left">{props.contentObjects[key].textLeft}</div>
                  <div className="text_right">{props.contentObjects[key].textRight}</div>
                </div>

                <div className="">
                  {
                    currentUser && props.show &&
                    <div className="changes_warning"><span className="bold">WARNING</span>: You are making changes to element with ID <span className="bold">{key}</span> in the database table for the
                      <span className="bold"> {props.dBTable} page.</span>
                    </div>
                  }

                  {
                    currentUser && props.show &&
                    <div class="grid_container">
                      <button className="button submit_btn form_button grid_element" onClick={() => { props.setCurrentId(key); props.setPageElementLayout(props.contentObjects[key].layout); props.showEditView(props.contentObjects[key].layout); props.executeScroll() }}>
                        <i className="fas fa-pencil-alt"></i>EDIT Layout 2
                      </button>
                      <button className="button submit_btn form_button grid_element" onClick={() => { props.onDelete(key) }}>
                        <i className="far fa-trash-alt"></i>TRASH Layout 2
                      </button>
                    </div>
                  }
                </div>
              </>
            }

            {/* LAYOUT 3 MARKUP */}
            {
              props.contentObjects[key].layout === 'Layout3' &&
              <>
                <div className={currentUser && props.show ? 'making_changes '+props.contentObjects[key].layout : props.contentObjects[key].layout}>
                  <div className="text_left">{props.contentObjects[key].textLeft}</div>
                  <div className="image_right">
                    { props.contentObjects[key].imageRight && <img src={props.contentObjects[key].imageRight} alt={props.contentObjects[key].imageAltText} /> }
                    { !props.contentObjects[key].imageRight && <img src={placeholder} alt="Placeholder" /> }
                  </div>
                </div>

                <div className="">
                  {
                    currentUser && props.show &&
                    <div className="changes_warning"><span className="bold">WARNING</span>: You are making changes to element with ID <span className="bold">{key}</span> in the database table for the
                      <span className="bold"> {props.dBTable} page.</span>
                    </div>
                  }

                  {
                    currentUser && props.show &&
                    <div class="grid_container">
                      <button className="button submit_btn form_button grid_element" onClick={() => { props.setCurrentId(key); props.setPageElementLayout(props.contentObjects[key].layout); props.showEditView(props.contentObjects[key].layout); props.executeScroll() }}>
                        <i className="fas fa-pencil-alt"></i>EDIT Layout 3
                      </button>
                      <button className="button submit_btn form_button grid_element" onClick={() => { props.onDelete(key) }}>
                        <i className="far fa-trash-alt"></i>TRASH Layout 3
                      </button>
                    </div>
                  }
                </div>
              </>
            }

            {/* LAYOUT 4 MARKUP */}
            {
              props.contentObjects[key].layout === 'Layout4' &&
              <>
                <div className={currentUser && props.show ? 'making_changes '+props.contentObjects[key].layout : props.contentObjects[key].layout}>
                  <div className="image_left">
                    { props.contentObjects[key].imageLeft && <img src={props.contentObjects[key].imageLeft} alt={props.contentObjects[key].imageAltText} /> }
                    { !props.contentObjects[key].imageLeft && <img src={placeholder} alt="Placeholder" /> }
                  </div>
                  <div className="text_right">{props.contentObjects[key].textRight}</div>
                </div>

                <div className="">
                  {
                    currentUser && props.show &&
                    <div className="changes_warning"><span className="bold">WARNING</span>: You are making changes to element with ID <span className="bold">{key}</span> in the database table for the
                      <span className="bold"> {props.dBTable} page.</span>
                    </div>
                  }

                  {
                    currentUser && props.show &&
                    <div class="grid_container">
                      <button className="button submit_btn form_button grid_element" onClick={() => { props.setCurrentId(key); props.setPageElementLayout(props.contentObjects[key].layout); props.showEditView(props.contentObjects[key].layout); props.executeScroll() }}>
                        <i className="fas fa-pencil-alt"></i>EDIT Layout 4
                      </button>
                      <button className="button submit_btn form_button grid_element" onClick={() => { props.onDelete(key) }}>
                        <i className="far fa-trash-alt"></i>TRASH Layout 4
                      </button>
                    </div>
                  }
                </div>
              </>
            }
          </div>
        ))
      }
    </>
  )
}
