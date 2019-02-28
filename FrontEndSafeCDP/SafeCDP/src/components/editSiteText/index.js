import React from "react";
import axios from "axios";

import EditSiteTextArea from "../editSiteTextArea";

export default class EditSiteText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      active: null
    };
  }
  componentDidMount() {
    const options = [this.option1, this.option2, this.option3];
    this.setState({
      options
    });
  }
  handleSelectOption = e => {
    this.state.options.forEach(e => {
      e.classList.remove("editSiteText_selections_option-active");
    });
    e.target.classList.add("editSiteText_selections_option-active");
    this.setState({ active: e.target.dataset.name });
  };
  render() {
    return (
      <div className="editSiteText">
        <h3 className="editSiteText_title">Edit Site Text</h3>
        <div className="editSiteText_selections">
          <div
            className="editSiteText_selections_option"
            data-name="bio"
            onClick={this.handleSelectOption}
            ref={option => (this.option1 = option)}
          >
            Bio
          </div>
          <div
            className="editSiteText_selections_option"
            data-name="firstname"
            onClick={this.handleSelectOption}
            ref={option => (this.option2 = option)}
          >
            First Name
          </div>
          <div
            className="editSiteText_selections_option"
            data-name="lastname"
            onClick={this.handleSelectOption}
            ref={option => (this.option3 = option)}
          >
            Last Name
          </div>
        </div>
        <div>
          <EditSiteTextArea
            history={this.props.history}
            type={this.state.active}
            getConfig={this.props.getConfig}
          />
        </div>
      </div>
    );
  }
}
