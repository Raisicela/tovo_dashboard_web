import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBView,
    MDBBtn,
    MDBIcon,
    toast,
    ToastContainer,
  } from "mdbreact";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import Title from '../components/Title';
import { compose } from 'recompose';
import { withFirebase } from '../../bloc/Firebase';
import { withAuthorization, withEmailVerification } from '../../bloc/Session';

//modals
import IntroModal from "../modals/ModalIntro";

//tables
import IntrosTable from "../tables/TableIntros";

class Intro extends React.Component{

    _isMounted = false;

    intro_default = {
        enable: true,
        photoUrlLocal: "https://firebasestorage.googleapis.com/v0/b/fuse-foods.appspot.com/o/logos_app_web%2Flogo_categori.png?alt=media&token=cad36dfa-e393-4b5a-8caf-afc4b6fe83bb"
    }

    constructor(props){
        super(props);
        this.state = {
          loading: true,
          error: null,
          introsList: [],
          modal_open: false,
          intro_modal: {}
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
        this.setState({loading:true, error:null});
        this.props.firebase.getAllIntros().onSnapshot(async (querySnapshot)=>{
        const getData = async ()=>{
            return Promise.all(
            querySnapshot.docs.map(async function(introDocument){
                var intro = introDocument.data();
                intro.photoUrlLocal = introDocument.data().photoUrl;
                return Promise.resolve(intro);
            })
            )
        }
        getData().then(data=>{
            //console.log(data);
            if (this._isMounted) {
                this.setState({
                    introsList: data,
                    loading: false,
                })
            }
        }).catch((error)=>{
            console.log(error.message)
            this.setState({
                loading: false,
                error: error.message
            })
        })
        });
    }

    toggleModal() {
        if (this._isMounted) {
          this.setState({
            modal_open: !this.state.modal_open,
          });
        }
    }

    fileInputHandler = (file) => {
        if (this.state.intro_modal.photoFile !== file) {
          if (this._isMounted) {
            this.setState({
                intro_modal: {
                ...this.state.intro_modal,
                photoFile: file,
                photoUrlLocal: URL.createObjectURL(file),
              },
            });
          }
        }
    };

    handleChange = (e) => {
        this.setState({
            intro_modal: {
            ...this.state.intro_modal,
            [e.target.name]: e.target.value,
          },
        });
    };

    handleChangeType = (e) => {
        console.log("tipo",parseInt(e[0]))
        this.setState({
            intro_modal: {
            ...this.state.intro_modal,
            type: parseInt(e[0]),
          },
        });
    };

    async handleSaveIntro() {
        toast.info("Guardando los datos", {
          position: "top-right",
        });
    
        var newIntro = this.state.intro_modal;
        const path = `${this.props.firebase.COLLECTIONS.INTROS}/${Date.now()}`;
        try {
            if (newIntro.photoFile !== undefined) {
                
                if (newIntro.photoPath) {
                    console.log("eliminar anterior");
                    try{
                        await this.props.firebase.deleteFile(newIntro.photoPath);
                    }
                    catch(error){
                        console.log(error.message);
                    }
                }
                const snapshot = await this.props.firebase.uploadFile(
                    path,
                    newIntro.photoFile
                );
                const downloadURL = await snapshot.ref.getDownloadURL();
                newIntro.photoUrl = downloadURL;
                newIntro.photoPath = path;
            }

            delete newIntro.photoFile;
            delete newIntro.photoUrlLocal;

            if (!newIntro.introId || newIntro.introId === "") {
                console.log("guardar")
                await this.props.firebase.saveNewIntro(newIntro);
            } else {
                console.log("editar")
                await this.props.firebase.editIntro(newIntro);
            }
    
            toast.success("Datos guardados con éxito", {
                position: "top-right",
            });
        } catch (error) {
          toast.warning("Error: " + error.message, {
            position: "top-right",
          });
          console.log(error.message);
        }
    }

    updateEnable = (enable) => {
        if (this._isMounted) {
            this.setState({
                intro_modal: {
                ...this.state.intro_modal,
                enable: enable,
              },
            });
        }
    }

    newIntroModal() {
        if (this._isMounted) {
          this.setState({
            modal_open: true,
            intro_modal:{
                ...this.intro_default,
            }
          });
        }
    }

    openIntroModal = (intro) => {
        if(this._isMounted){
          this.setState({
            intro_modal: intro,
            modal_open: true,
          });
        }
    }

    render(){
        if(this.state.loading){
            return (
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    // spacing={3}
                >
                <Grid item xs={1}>
                    <CircularProgress />
                </Grid>
                </Grid>
            );
        }
        if(this.state.error){
            return (
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    // spacing={3}
                >
                <Grid item xs={1}>
                    <Title>{this.state.error}</Title> 
                </Grid>
                </Grid>
            );
        }
        return(
            <div>
                <MDBCard narrow className="mb-0">
                <MDBView cascade className="form-header blue-gradient mb-0">
                    IMAGENES APP
                </MDBView>

                <MDBCardBody className="mb-0">
                    <Grid container justify = "flex-end">
                        <Grid item xs={1}>
                        <MDBBtn floating color="blue">
                            <MDBIcon
                                icon="plus white-text"
                                size={"2x"}
                                onClick={() => {
                                    this.newIntroModal();
                                }}
                            />
                        </MDBBtn>
                        </Grid>
                    </Grid>
                    <IntrosTable
                        introsList={this.state.introsList}
                        openIntroModal={this.openIntroModal}
                    />

                </MDBCardBody>
                </MDBCard>

                <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />

                <IntroModal
                    modal_open={this.state.modal_open}
                    toggleModal={() => this.toggleModal()}
                    intro_modal={this.state.intro_modal}
                    fileInputHandler={this.fileInputHandler}
                    handleChange={this.handleChange}
                    handleChangeType={this.handleChangeType}
                    updateEnable = {this.updateEnable}
                    handleSaveIntro ={()=>{this.handleSaveIntro()}}
                />
            </div>
        );
    }
}

// export default Intro;
const condition = authUser =>    
  authUser && !! authUser.admin;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase,
  )(Intro);