import React from "react";
import { connect } from "react-redux";
const LobyPageScreen = ({ user }) => {

  return (
    <div>
      <h1>Main Page Screen</h1>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LobyPageScreen);
