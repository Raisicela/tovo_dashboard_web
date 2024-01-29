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
import NewsModal from "../modals/ModalNews";

//tables
import NewsTable from "../tables/TableNews";

class News extends React.Component{

    _isMounted = false;

    news_default = {
        enable: true,
        photoUrlLocal: "https://firebasestorage.googleapis.com/v0/b/fuse-foods.appspot.com/o/logos_app_web%2Flogo_categori.png?alt=media&token=cad36dfa-e393-4b5a-8caf-afc4b6fe83bb"
    }

    constructor(props){
        super(props);
        this.state = {
          loading: true,
          error: null,
          newsList: [],
          modal_open: false,
          news_modal: {}
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
        this.setState({loading:true, error:null});
        this.props.firebase.getAllNews().onSnapshot(async (querySnapshot)=>{
        const getData = async ()=>{
            return Promise.all(
            querySnapshot.docs.map(async function(newsDocument){
                var news = newsDocument.data();
                news.photoUrlLocal = newsDocument.data().photoUrl;
                return Promise.resolve(news);
            })
            )
        }
        getData().then(data=>{
            //console.log(data);
            if (this._isMounted) {
                this.setState({
                    newsList: data,
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
        if (this.state.news_modal.photoFile !== file) {
          if (this._isMounted) {
            this.setState({
                news_modal: {
                ...this.state.news_modal,
                photoFile: file,
                photoUrlLocal: URL.createObjectURL(file),
              },
            });
          }
        }
    };

    handleChange = (e) => {
        this.setState({
            news_modal: {
            ...this.state.news_modal,
            [e.target.name]: e.target.value,
          },
        });
    };


    async handleSaveNews() {
        toast.info("Guardando los datos", {
          position: "top-right",
        });
    
        var newNotice = this.state.news_modal;
        newNotice.date = this.props.firebase.timestamp().fromDate(new Date());
        const path = `${this.props.firebase.COLLECTIONS.NEWS}/${Date.now()}`;
        try {
            if (newNotice.photoFile !== undefined) {
                
                if (newNotice.photoPath) {
                    console.log("eliminar anterior");
                    try{
                        await this.props.firebase.deleteFile(newNotice.photoPath);
                    }
                    catch(error){
                        console.log(error.message);
                    }
                }
                const snapshot = await this.props.firebase.uploadFile(
                    path,
                    newNotice.photoFile
                );
                const downloadURL = await snapshot.ref.getDownloadURL();
                newNotice.photoUrl = downloadURL;
                newNotice.photoPath = path;
            }

            delete newNotice.photoFile;
            delete newNotice.photoUrlLocal;

            if (!newNotice.newsId || newNotice.newsId === "") {
                console.log("guardar")
                await this.props.firebase.saveNewNotice(newNotice);
            } else {
                console.log("editar")
                await this.props.firebase.editNews(newNotice);
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
                news_modal: {
                ...this.state.news_modal,
                enable: enable,
              },
            });
        }
    }

    newNoticeModal() {
        if (this._isMounted) {
          this.setState({
            modal_open: true,
            news_modal:{
                ...this.news_default,
            }
          });
        }
    }

    openNewModal = (news) => {
        if(this._isMounted){
          this.setState({
            news_modal: news,
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
                    <a href="#!" className="white-text h3">
                    NOTICIAS APP
                    </a>
                </MDBView>

                <MDBCardBody className="mb-0">
                    <Grid container justify = "flex-end">
                        <Grid item xs={1}>
                        <MDBBtn floating color="blue">
                            <MDBIcon
                                icon="plus white-text"
                                size={"2x"}
                                onClick={() => {
                                    this.newNoticeModal();
                                }}
                            />
                        </MDBBtn>
                        </Grid>
                    </Grid>
                    <NewsTable
                        newsList={this.state.newsList}
                        openNewModal={this.openNewModal}
                    />

                </MDBCardBody>
                </MDBCard>

                <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />

                <NewsModal
                    modal_open={this.state.modal_open}
                    toggleModal={() => this.toggleModal()}
                    news_modal={this.state.news_modal}
                    fileInputHandler={this.fileInputHandler}
                    handleChange={this.handleChange}
                    handleChangeType={this.handleChangeType}
                    updateEnable = {this.updateEnable}
                    handleSaveNews ={()=>{this.handleSaveNews()}}
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
  )(News);