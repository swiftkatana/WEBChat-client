import React, { useState } from "react";
import { connect } from "react-redux";

const MainPageScreen = (props) => {
  const render = () => {
    if (props.user) {
      return <ScreenLoginRegister />;
    }
    return (
      <div>
        <h1>Main Page Screen</h1>
      </div>
    );
  };

  return render();
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageScreen);
