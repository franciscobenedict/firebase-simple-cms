import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import { useUser } from 'reactfire';
import LayoutForm1 from './layouts/LayoutForm1';
import LayoutForm2 from './layouts/LayoutForm2';
import LayoutForm3 from './layouts/LayoutForm3';
import LayoutForm4 from './layouts/LayoutForm4';
import {LayoutSelector} from './layouts/LayoutSelector';
import {LayoutTypes} from './layouts/LayoutTypes';
import {database} from '../store/base';
// import ScrollUpButton from "react-scroll-up-button";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
// General scroll to element function

const LandingView = () => {
  const currentUser = useUser();
  const [pageElementLayout, setPageElementLayout] = useState('Layout1');
  const [currentId, setCurrentId] = useState('');
  const [contentObjects, setContentObjects] = useState([]);
  const dBTable = `content`;
  const [pageTitle, setPageTitle] = useState('');

  //Once components load complete
  useEffect(() => {
    database.ref(dBTable).on('value', snapshot => { if (snapshot.val() !== null) { setContentObjects({ ...snapshot.val() }); } });
    setPageTitle('Simple CMS');
  }, [dBTable, pageTitle]);

  const addOrEdit = (obj) => {
    if (currentId === '')
      database.ref(dBTable).push( obj, err => {
        if (err)
          console.log(err)
        else
          setCurrentId('')
      })
    else
      database.ref(`${dBTable}/${currentId}`).set( obj, err => {
        if (err)
          console.log(err)
        else
          setCurrentId('')
      })
  }

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      database.ref(`${dBTable}/${id}`).remove( err => {
          if (err)
            console.log(err)
          else
            setCurrentId('')
        }
      )
    }
  }

  const [show, toggleShow] = useState(false);

  const [showStep1, setShowStep1] = useState(true);
  const [showStep2, setShowStep2] = useState(false);
  const step1 = () => {
    console.log('step1');
    setShowStep1(true);
    setShowStep2(false);
  }
  const step2 = () => {
    console.log('step2');
    setShowStep1(false);
    setShowStep2(true);
  }

  const showEditView = () => {
    step2();
  }

  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)

  return (
    <main>
      <div className="container">
        <h1>{pageTitle}</h1>
        <p>This is a simple CMS that allows a logged in user with permissions to make changes to the content on this page.</p>
        <p>In this example, the app communicates with React Realtime Database (for the text) and React Storage (for the images).</p>
        <p>Responsiveness: in mobile-sized view, the content on this page will stack as you would expect.</p>

        {
          currentUser &&
          <>
            <div className="profile_buttons_container">
              <button className="button submit_btn form_button" onClick={() => toggleShow(!show)}>
                Configure page:
              </button>
            </div>
            {
              show &&
              <div className="cms_form" ref={myRef}>
                {
                  showStep1 &&
                  <>
                    <LayoutSelector {...({ pageElementLayout, setPageElementLayout })} />
                    <div className="profile_buttons_container">
                      <button onClick={step2} className="button submit_btn form_button">Next</button>
                    </div>
                  </>
                }

                {
                  showStep2 &&
                  <>
                    { pageElementLayout === "Layout1" && <LayoutForm1 {...({ currentId, contentObjects, addOrEdit, pageElementLayout, step1, show, toggleShow })} /> }
                    { pageElementLayout === "Layout2" && <LayoutForm2 {...({ currentId, contentObjects, addOrEdit, pageElementLayout, step1, show, toggleShow })} /> }
                    { pageElementLayout === "Layout3" && <LayoutForm3 {...({ currentId, contentObjects, addOrEdit, pageElementLayout, step1, show, toggleShow })} /> }
                    { pageElementLayout === "Layout4" && <LayoutForm4 {...({ currentId, contentObjects, addOrEdit, pageElementLayout, step1, show, toggleShow })} /> }
                  </>
                }
              </div>
            }
          </>
        }

        <LayoutTypes {...({ dBTable, contentObjects, setCurrentId, onDelete, setPageElementLayout, toggleShow, show, showEditView, executeScroll })} />

        {/*<ScrollUpButton />*/}
      </div>
    </main>
  )
}

export default LandingView;
