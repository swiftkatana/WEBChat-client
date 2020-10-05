import React from 'react'
import { connect } from 'react-redux'
import LoginRegister from '../LoginRegister'
import {Container } from 'react-bootstrap'


class MainPage extends React.Component{

    state={
  
    }
    componentDidUpdate(){
    }
    

    renderRegisterORHomePage=()=>{
        if(this.props.isLogin&&this.props.user){
            return (
                <div>
      <h1>Main page</h1>

                </div>
            )
        }
        return <LoginRegister />

    }


    render() {
        return <Container>
                {this.renderRegisterORHomePage()}
        </Container> 
    }


}
const mapStateToProps = (state) => ({
    user:state.user
    ,isLogin:state.auth.isLogin
})


export default connect(mapStateToProps,{})(MainPage);