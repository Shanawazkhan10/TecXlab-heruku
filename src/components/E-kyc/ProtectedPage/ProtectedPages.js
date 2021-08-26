import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
function ProtectedPages(props) {
  let Cmp = props.Cmp;
  let history = useHistory();
  // useEffect(() => {
  //   if (!localStorage.getItem("user-token")) {
  //     history.push("/");
  //   }
  // }, []);
  return (
    <div>
      <Cmp />
    </div>
  );
}

export default ProtectedPages;
