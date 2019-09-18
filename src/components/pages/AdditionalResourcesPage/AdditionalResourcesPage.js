import React, { Component } from "react";
import SnakkNavbar from "../../SnakkNavbar/SnakkNavbar";
import Verb from "../../Verb/Verb";
import Sidebar from "../../Sidebar/Sidebar";
import data from "../../../constants/data";
import { allCategories } from "../../../constants/variables";
import "./AdditionalResourcesPage.css";
import norwayFlag from "../../../assets/norwayFlag.png";
import checkmark from "../../../assets/greenCheckmark.png";

class AdditionalResourcesPage extends Component {
  state = {
    data: data,
    index: 0
  };

  render() {
    return (
      <React.Fragment>
        {/* <SnakkNavbar /> */}
        <h1>Page under construction</h1>
      </React.Fragment>
    );
  }
}

export default AdditionalResourcesPage;
