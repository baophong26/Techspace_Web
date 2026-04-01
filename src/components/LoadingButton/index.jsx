/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./style.css";
import { t } from "../../utils/translate";

function LoadingButton(props) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const safeT = (en, vi) => isMounted ? t(en, vi) : vi;

  return (
    <button
      type={props.type}
      className={classNames(
        "btn btn-wide",
        props.className,
        {
          "btn-wait": props.loading
        },
        { disabled: props.loading }
      )}
      style={props.style}
      onClick={props.onClick}
    >
      {props.loading ? safeT("Please Wait...", "Vui lòng đợi...") : <span>{props.children}</span>}
    </button>
  );
}

LoadingButton.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string
};

LoadingButton.defaultProps = {
  className: "btn-primary btn-7",
  loading: false,
  type: "button"
};

export default LoadingButton;
