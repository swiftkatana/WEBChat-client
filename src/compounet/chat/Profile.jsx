import React from 'react'
import { connect } from 'react-redux'
import { changeURL } from '../../history';


class Profile extends React.Component{
    componentDidMount(){
        if(!this.props.user||!this.props.isLogin) changeURL('/');
    }
    renderName=()=>{
        if(!this.props.user||!this.props.isLogin)  return null

        return this.props.user.firstName
    }
    render() {
        return (
            <div>
               <h1>Hello {this.renderName()} </h1> 
            </div>
        );
    }

}
const mapStateToProps = (state) => ({
isLogin:state.auth.isLogin,
user:state.user,    
})


export default connect(mapStateToProps,{})(Profile);