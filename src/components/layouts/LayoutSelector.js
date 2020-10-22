import React from 'react';
import { Form, Radio } from "semantic-ui-react";

export const LayoutSelector = (props) => {
  return (
    <div className="layout_selector">
      <Form.Group inline>
        <div className="form_subheading">Select a page module layout</div>
        <div className="grid_container">
          <div className="grid_element layout_style">
            <div className="layout_icon">
              <i class="fas fa-align-left"></i>
            </div>
            <Form.Field
              name="layoutSelection"
              type="radio"
              control={Radio}
              label="Layout 1 (Full text)"
              checked={props.pageElementLayout === "Layout1"}
              value="Layout1"
              onClick={() => props.setPageElementLayout("Layout1")}
            />
          </div>
          <div className="grid_element layout_style">
            <div className="layout_icon">
              <i class="fas fa-align-left"></i>
              <i class="fas fa-align-left"></i>
            </div>
            <Form.Field
              name="layoutSelection"
              type="radio"
              control={Radio}
              label="Layout 2 (Text left, text right)"
              checked={props.pageElementLayout === "Layout2"}
              value="Layout2"
              onClick={() => props.setPageElementLayout("Layout2")}
            />
          </div>
          <div className="grid_element layout_style">
            <Form.Field
              name="layoutSelection"
              type="radio"
              control={Radio}
              label="Layout 3 (Text left, image right)"
              checked={props.pageElementLayout === "Layout3"}
              value="Layout3"
              onClick={() => props.setPageElementLayout("Layout3")}
            />
            <div className="layout_icon">
              <i class="fas fa-align-left"></i>
              <i class="far fa-image"></i>
            </div>
          </div>
          <div className="grid_element layout_style">
            <Form.Field
              name="layoutSelection"
              type="radio"
              control={Radio}
              label="Layout 4 (Image left, text right)"
              checked={props.pageElementLayout === "Layout4"}
              value="Layout4"
              onClick={() => props.setPageElementLayout("Layout4")}
            />
            <div className="layout_icon">
              <i class="far fa-image"></i>
              <i class="fas fa-align-left"></i>
            </div>
          </div>
        </div>
      </Form.Group>
    </div>
  )
}
