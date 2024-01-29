import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBEdgeHeader,
  MDBFreeBird,
  toast,
  ToastContainer,
} from "mdbreact";
import "./styles/Login.css";
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../bloc/Firebase';
import User from '../../models/User';
import * as ROUTES from "../../bloc/constants/const_routes";

class Login extends React.Component {
  state = {
    current_user: new User("","","",""),
  };

  handleChange = e =>{
    this.setState({
      current_user: {
        ...this.state.current_user,
        [e.target.name]: e.target.value,
      },

    });
  }

  handleSignIn = (event) =>{
    event.preventDefault();
    event.target.className += " was-validated";
    if (!event.target.checkValidity()) {
      return;
    }
    const { email, password } = this.state.current_user;
    if(email === "" || password === ""){
      toast.warning('Complete todos los campos', {
        position: 'top-right'
      });
      return;
    }
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((result) => {
        if(result.user.emailVerified){
          this.props.firebase.user(result.user.uid).get()
          .then(doc=>{
            if(!doc.exists){
              toast.warning("El usuario no existe!", {
                position: 'top-right'
              });
            }else{
              if(doc.data().admin){   //verificar si tiene permisos admin
                // this.props.history.push(ROUTES.USER_REQUEST);
                // console.log('doc.data():', doc.data().id);
                // this.props.history.push(ROUTES.PROFILE+'/'+doc.data().id);
                this.props.history.push(ROUTES.PROFILE);
              }else{
                toast.warning("No tienes permiso de acceso, comunicate con el administrador", {
                  position: 'top-right'
                });
              }
            }
          })
          .catch(error => {
            toast.warning(error.message, {
              position: 'top-right'
            });
          });

        }else{
          toast.info('Por favor verifica tu email', {
            position: 'top-right'
          });
          this.props.firebase.auth.signOut();
        }
      })
      .catch(error => {
        toast.warning(error.message, {
          position: 'top-right'
        });
      });
  }

  render() {
    return (

      <MDBContainer className="mt-3">
        <MDBEdgeHeader color="mdb-color darken-2"></MDBEdgeHeader>
          <MDBFreeBird>
            <MDBRow>
              <MDBCol
                md="8"
                lg="7"
                className="mx-auto float-none white z-depth-1 py-2 px-2"
              >
                <MDBCardBody>
                  <form
                    className="needs-validation"
                    onSubmit={this.handleSignIn}
                    noValidate
                  >
                    <p className="h5 text-center mb-4">Login</p>
                    <div className="grey-text">
                      <MDBInput
                        onChange={this.handleChange}
                        id="email"
                        name="email"
                        label="Email"
                        icon="user"
                        group
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                        value={this.state.current_user.email}
                        required
                      />
                      <MDBInput
                        onChange={this.handleChange}
                        id="password"
                        label="Contraseña"
                        icon="lock"
                        group
                        type="password"
                        validate
                        error="wrong"
                        success="right"
                        name="password"
                        value={this.state.current_user.password}
                        required
                      />
                    </div>
                    <div className="text-center">
                      <MDBBtn outline color="info" type="submit">
                        Iniciar sesión
                        {/* < MDBIcon icon="paper-plane" className="ml-1" /> */}
                      </MDBBtn>
                    </div>
                  </form>
                  
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>
          <ToastContainer
            hideProgressBar={true}
            newestOnTop={true}
            autoClose={5000}
          />
      </MDBContainer>



    /*   <div className="classic-form-page" id="login">

      
        <MDBView>
          <MDBMask
            className="d-flex justify-content-center align-items-center"
            overlay="stylish-strong"
          >
            <MDBContainer>
              <MDBRow>
                <MDBCol md="10" lg="6" xl="5" sm="12" className="mt-5 mx-auto">
                  <MDBCard>
                    <MDBCardBody>
                      <div className="form-header blue-gradient">
                        <h3>
                          <MDBIcon
                            icon="user"
                            className="mt-2 mb-2 text-white"
                          />{" "}
                          Iniciar Sesión
                        </h3>
                      </div>
                      <MDBInput
                        type="email"
                        label="Email"
                        icon="envelope"
                        iconClass="white-text"
                        inputprops = {{ 'color':  'white'}}
                        color = "white"
                        name = "email"
                        onChange = {this.handleChange}
                      />
                      <MDBInput
                        type="password"
                        label="Contraseña"
                        icon="lock"
                        iconClass="white-text"
                        name = "password"
                        onChange = {this.handleChange}
                      />
                      <div className="text-center mt-3 black-text">
                        <MDBBtn className="blue-gradient" size="lg" onClick= {this.handleSignIn}>
                          Entrar
                        </MDBBtn>
                        <hr />
                      </div>
                      <div>
                        <Link
                          className="text-center link-letra"
                          to={ROUTES.PASSWORD_FORGET}
                        >
                          <p>¿Olvidó su contraseña?</p>
                        </Link>
                        <Link className="text-center link-letra" to={ROUTES.SIGN_UP}>
                          <p>Regístrese</p>
                        </Link>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>

        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
      </div>
     */
    );
  }
}

export default compose(withRouter, withFirebase)(Login);