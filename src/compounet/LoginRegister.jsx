/* eslint-disable no-useless-escape */
import React from 'react';
import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form'

import {signIn,signOut,createUser,loginUser} from '../action'
// import server from '../api/myserver';
// import GoogleAuth from './GoogleAuth';










class Login extends React.Component{

    constructor(props) {
        super(props)
        this.checkbox = React.createRef();
    }
    
    state={
        whatToShow:true,
        emailError:''
    }
    onSubmitR=(formValues)=>{
        this.props.createUser(formValues,this.props.signIn);

    }
    onSubmitL=(formValues)=>{
        this.props.loginUser(formValues,this.props.signIn);

    }


  
    renderError=({error,touched})=>{
        if(error&&touched){
            return(
                <div className="alert alert-danger">
                  <div className="header">
                    {error}
                  </div>   
                </div>
            );
        }
      }

      renderInput=({text,input,bg ,type,label,meta,placeholder})=>{
        const className=`${bg?'mb-3':'col-md-6 mb-3'}  ${meta.error&&meta.touched?"":""}`;
        const type1 =type||'text';
        return<div className={className}>
          <label htmlFor="phone">  {label}</label>
         {text?   <input {...input} type={type1} placeholder={placeholder} value={text} className={`form-control  ${meta.error&&meta.touched?"alert alert-danger":""}`}  required=""/>:   <input {...input} type={type1} placeholder={placeholder}  className={`form-control  ${meta.error&&meta.touched?"alert alert-danger":""}`}   required=""/>}
            {this.renderError(meta)}
          </div>
        

      }
    onCheacBox(){
        const TrueOrFalse = this.checkbox.current.value;
        this.setState({whatToShow:'register'});
            if(!TrueOrFalse){
                     this.setState({whatToShow:'login'});
            }
    }

    renderChangeMod=()=>{
        if(this.state.whatToShow){
            return(
            <div className="btn-group ">
                    <h1 className="btn btn-success  " type='button'  onClick={()=>this.setState({whatToShow:false})} >לחץ בשביל להירשם</h1>  
                    {/* <GoogleAuth /> */}
             

            </div> )
        }else{
            return(
            <div  className="btn-group   ">
                <h1  className="btn btn-success" type='button' onClick={ ()=> this.setState({whatToShow:true})} >לחץ בשביל להתחבר</h1>
                    {/* <GoogleAuth /> */}
            </div>  
             )
        }
    
    }





   
    renderErrorLogin(){

        if(this.props.user){
            if(this.props.user==='not found'){
                
                return<p className='emaildup'>אימייל או הסיסמה לא נכונים</p>
            }}

    }

    



    renderErrorRegister(error){
        if(this.props.user){
        if(this.props.user==='dup'){
          
            
            return<p className='emaildup'>אימייל קיים כבר </p>
        }}
    }
    login(){
        
        return(
            <div className='form-group right-text' >
            
             <h1  className='right-text'>כניסה לאתר  </h1>
            {this.renderChangeMod()}
        
             <form onSubmit={this.props.handleSubmit(this.onSubmitL)} className="error">
             <Field bg type='email'  autocomplete="current-password"  name="email" component={this.renderInput} label="אימייל " />
                <Field bg type='password' name="password" component={this.renderInput} label="סיסמה" />
                {this.renderErrorLogin()}

                <button className="btn btn-primary">להתחבר</button>
             </form>
                
            </div>
        )


    }


    register(){
        return(
            <div className='form-group right-text' >

            <h1 className='right-text'  >ברוך הבא להרשמה לאתר </h1>
            {this.renderChangeMod()}
           
            <form b onSubmit={this.props.handleSubmit(this.onSubmitR)} className="error">
            <div className='row'>
            <Field type='email' clas={this.props.user==='dup'?'error':null} name="email" placeholder=" you@example.com"  component={this.renderInput} label="אימייל" />
                <Field type='password' name="password" component={this.renderInput} label="סיסמה" />
            </div>
        
                <div className='row'>
         
                        <Field name="firstName" component={this.renderInput} label="שם פרטי" />
                <Field name="lastName" component={this.renderInput} label="שם משפחה" />
         </div>
        
            
              
                <div className='row'>
         

                </div>
                {this.renderErrorRegister()}

               <div className='row'>
               <button className="btn btn-info form-control">הרשמה</button>

               </div>
            </form>
            </div>
        )

        

    }

        renderLoginOrRegister(){
    if(this.state.whatToShow)return this.login();
    else return this.register();

        
        }


    render(){

        return(
            <div className=" text-right     ">
                {this.renderLoginOrRegister()}
            </div>)


        }


} 
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
 const validatePassword=(input)=>{
     if(input===undefined||input===null) return false
    let filter =false;
    var lowerCaseLetters = /[a-z]/g;
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    // // Validate numbers
    var numbers = /[0-9]/g;
    if(input.match(numbers)&&input.match(upperCaseLetters)&&input.match(lowerCaseLetters)&&input.length>=7) {  
        filter=true

    } else {
        filter=false
    }


    return filter
}



const validate=(formdit,state)=>{
  // let OMG ;

  // for(let input in formdit){
  //     console.log(formdit[input])

  // }
  const errors ={}


  if(validateEmail(formdit.email)===false){
      if(formdit.email===0)  errors.email="  אימייל הינו שדה חובה  "
     else errors.email="  אימייל הינו תקין "
  }
  if(validatePassword(formdit.password)===false){
      errors.password=" וספרות (A-Z)ותו גדול (a-z)  על הסיסמה להיות מינימום 7 תווים ולהכיל תווים   "
  }
  if(!formdit.firstName||formdit.firstName<=3||/[0-9]/.test(formdit.firstName)){
         errors.firstName="צריך להכניס שם פרטי בלי מספרים ולהכיל  3 תווים לפחות"
  }
  if(!formdit.lastName||formdit.lastName<=3||/[0-9]/.test(formdit.lastName)){
      errors.lastName="צריך להכניס שם פרטי בלי מספרים ולהכיל  3 תווים לפחות    "
  }
  if(!formdit.address||formdit.address<=8||!/[0-9]/.test(formdit.address)){
    errors.address="צריך להכניס כתובת מלאה עיר רחוב מספר בית    "
}
if(!formdit.phone||formdit.phone<=7){
  errors.phone="צריך להכניס מספר טלפון     "
}


  return errors
}

const mapStateToProps =(state)=>{
    return{isSignedIn:state.auth.isSignedIn,user:state.user};
}
const FormCom = reduxForm(
    {
        form:'userLogin',
        validate
    })(Login)

export default connect(mapStateToProps,{signIn,signOut,createUser,loginUser})(FormCom);