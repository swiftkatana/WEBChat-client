/* eslint-disable no-useless-escape */
import React from 'react';
import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form'

import {signIn,signOut,createUser,loginUser,openChat,changeLeg} from '../../action'
import { Container } from 'react-bootstrap';
import { Fab } from '@material-ui/core';
// import server from '../api/myserver';
// import GoogleAuth from './GoogleAuth';

const Leg={
    eng:{
        errorLogin:{
            InfoWrong:'Email or password not valid please try agian',
            userNotCreate:'User does not exist ',
            alreadyLogin:'User is already login'

        },
        login:{
            buttonForLogin:' Login'
            ,leabel:'Login',
            button:'Login'
        },
        register:{
            buttonForRegister:' Sign up'
            ,leabel:'Sign up',
            button:'Register'
        },
        email:{
            error:'Invalid email',
            leabel:'Email'
        },
        password:{
            error:'Your password must include at least 8 characters. At least 1 number And upper case  (like AWDS).  ',
            leabel:'Password'
        },
        firstName:{
            error:'You must enter a first name without numbers and contain at least 2 characters',
            leabel:'FirstName'
        },
        lastName:{
            error:'You must enter a last name without numbers and contain at least 2 characters',
            leabel:'LastName'
        },
        address:{
            error:'Need to enter full address city street number house',
            leabel:'full address'
        },
        phone:{
            error:'Need to enter phone number',
            leabel:'Phone number'
        }
    },
    heb:{
        errorLogin:{
            InfoWrong:'אימייל או הסיסמה לא נכונים',
            userNotCreate:'המשתמש לא קיים ',
            alreadyLogin:'המשתמש כבר מחובר בבקשה תבדוק אם יש לך חלונית נוספת '
        },
        login:{
            buttonForLogin:' להתחבר'
            ,leabel:'להתחבר לאתר',
            button:'להתחבר'
        },
        register:{
            buttonForRegister:' להרשם'
            ,leabel:'הרשמה לאתר',
            button:'להירשם'
        },
        email:{
            error:'אימייל הינו תקין',
            leabel:'אימייל'
        },
        password:{
            error:'וספרות (A-Z)ותו גדול (a-z)  על הסיסמה להיות מינימום 7 תווים ולהכיל תווים  ',
            leabel:'סיסמה'
        },
        firstName:{
            error:'צריך להכניס שם פרטי בלי מספרים ולהכיל 2 תווים לפחות',
            leabel:'שם פרטי'
        },
        lastName:{
            error:'צריך להכניס שם משפחה בלי מספרים ולהכיל 2 תווים לפחות',
            leabel:'שם משפחה'
        },
        address:{
            error:'צריך להכניס כתובת מלאה עיר רחוב מספר בית',
            leabel:'כתובת מלאה'
        },
        phone:{
            error:'צריך להכניס מספר טלפון',
            leabel:'מספר טלפון'
        }
       
    }
}








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
        this.props.createUser(formValues,this.props.signIn,this.props.openChat);

    }
    onSubmitL=(formValues)=>{
        
        this.props.loginUser(formValues,this.props.signIn,this.props.openChat);

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
          <label htmlFor={label}>  {label}</label>
         {text?   <input {...input} type={type1} name={label} autoComplete='on' placeholder={placeholder} value={text} className={`form-control  ${meta.error&&meta.touched?"alert alert-danger":""}`}  required=""/>:   <input {...input} name={label} autoComplete='on' type={type1} placeholder={placeholder}  className={`form-control  ${meta.error&&meta.touched?"alert alert-danger":""}`}   required=""/>}
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
                    <h1 className="btn btn-success  " type='button'  onClick={()=>this.setState({whatToShow:false})} >{Leg[this.props.leg].register.buttonForRegister}</h1>  
             

            </div> )
        }else{
            return(
            <div  className="btn-group   ">
                <h1  className="btn btn-success" type='button' onClick={ ()=> this.setState({whatToShow:true})} >{Leg[this.props.leg].login.buttonForLogin}</h1>
            </div>  
             )
        }
    
    }





   
    renderErrorLogin(){
        if(this.props.user){
            if(this.props.user.err){
                return<p className='emaildup alert alert-danger'>{Leg[this.props.leg].errorLogin[this.props.user.err]}</p>

            }

        }

    }

    



    renderErrorRegister(error){
        if(this.props.user){
        if(this.props.user==='dup'){
          
            
            return<p className='emaildup'>אימייל קיים כבר </p>
        }}
    }
    login(){
        
        return(
            <div className={`form-group ${this.props.leg==='eng'?'textLeft':"textRight"}`} >
            
             <h1  >{Leg[this.props.leg].login.leabel}  </h1>
            {this.renderChangeMod()}
        
             <form onSubmit={this.props.handleSubmit(this.onSubmitL)} className="error">
             <Field bg type='email'  autocomplete="current-password"  name="email" component={this.renderInput} label={Leg[this.props.leg].email.leabel}/>
                <Field bg type='password' name="password" component={this.renderInput} label={Leg[this.props.leg].password.leabel} />
                {this.renderErrorLogin()}

                <button className="btn btn-info form-control">{Leg[this.props.leg].login.button} </button>
             </form>
                
            </div>
        )


    }


    register(){
        return(
            <div className={`form-group ${this.props.leg==='eng'?'textLeft':"textRight"}`} >

            <h1 className={this.props.leg==='eng'?'textLeft':"textRight"}  >{Leg[this.props.leg].register.leabel} </h1>
            {this.renderChangeMod()}
           
            <form onSubmit={this.props.handleSubmit(this.onSubmitR)} className="error">
            <div className='row'>
            <Field type='email' clas={this.props.user==='dup'?'error':null} name="email" placeholder=" you@example.com"  component={this.renderInput} label={Leg[this.props.leg].email.leabel}/>
                <Field  type='password' name="password" component={this.renderInput} label={Leg[this.props.leg].password.leabel} />
            </div>
        
                <div className='row'>
         
                        <Field name="firstName" component={this.renderInput} label={Leg[this.props.leg].firstName.leabel} />
                <Field name="lastName" component={this.renderInput} label={Leg[this.props.leg].lastName.leabel} />
         </div>
        
              
                <div className='row'>
         

                </div>
                {this.renderErrorRegister()}

               <div className='row'>
               <button className="btn btn-info form-control">{Leg[this.props.leg].register.button} </button>

               </div>
            </form>
            </div>
        )

        

    }
     renderImgLeg=()=>{
        if(this.props.leg==='eng'){
          return <img src='heb.png' onClick={()=>this.props.changeLeg('heb')} className='imgLeg' alt='icon for change leg right now hebrew' />
        }
        return <img src='uk.png' onClick={()=>this.props.changeLeg('eng')} className='imgLeg' alt='icon for change leg right now eng' />
      }
        renderLoginOrRegister(){
    if(this.state.whatToShow)return this.login();
    else return this.register();

        
        }


    render(){

        return(
            <Container className=" text-right"   >
                {this.renderLoginOrRegister()}
                <Fab   color="primary" aria-label="add">
                   {this.renderImgLeg()}
                </Fab>
            </Container>)


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
     errors.email=Leg[state.leg].email.error
  }
  if(validatePassword(formdit.password)===false){
      errors.password=Leg[state.leg].password.error
  }
  if(!formdit.firstName||formdit.firstName<=2||/[0-9]/.test(formdit.firstName)){
         errors.firstName=Leg[state.leg].firstName.error
  }
  if(!formdit.lastName||formdit.lastName<=2||/[0-9]/.test(formdit.lastName)){
      errors.lastName=Leg[state.leg].lastName.error
  }
  if(!formdit.address||formdit.address<=8||!/[0-9]/.test(formdit.address)){
    errors.address=Leg[state.leg].address.error
}
if(!formdit.phone||formdit.phone<=7){
  errors.phone=Leg[state.leg].phone.error
}


  return errors
}

const mapStateToProps =(state)=>{
    return{isLogin:state.auth.isLogin,user:state.user,leg:state.leg};
}
const FormCom = reduxForm(
    {
        form:'userLogin',
        validate
    })(Login)

export default connect(mapStateToProps,{signIn,signOut,createUser,loginUser,openChat,changeLeg})(FormCom);