import React from "react";
import { ReactComponent as PlusIcon } from "../../images/icons/plus.svg";

const AddPhoto = props => {
  return (
    <div className="addPhoto" onClick={props.addPhoto}>
      <PlusIcon className="addPhoto_icon" />
    </div>
  );
};

export default AddPhoto;
