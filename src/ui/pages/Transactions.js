import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBView,
    MDBSelect,
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
import TransactionsModal from "../modals/ModalTransactions";

//tables
import TransactionsTable from "../tables/TableTransactions";

class Transactions extends React.Component{



    _isMounted = false;

    transactions_default = {
        enable: true,
        photoUrlLocal: "https://firebasestorage.googleapis.com/v0/b/fuse-foods.appspot.com/o/logos_app_web%2Flogo_categori.png?alt=media&token=cad36dfa-e393-4b5a-8caf-afc4b6fe83bb"
    }

    constructor(props){
        super(props);
        this.state = {
          loading: true,
          error: null,
          transactionsList: [],
          modal_open: false,
          transactions_modal: {},
          options: [
            {
              text: "PayPhone",
              value: "1"
            },
            {
              text: "Transferencia Bancaria",
              value: "2"
            },
          ],
          selectedMethod: "bankTransfer",
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
        this.SearchTransactions("bankTransfer");
    }

    SearchTransactions = (resourceId) => {
        this.setState({loading:true, error:null});
        this.props.firebase.getTransactions(resourceId).onSnapshot(async (querySnapshot)=>{
        const getData = async ()=>{
            return Promise.all(
            querySnapshot.docs.map(async function(transactionsDocument){
                var transactions = transactionsDocument.data();
                return Promise.resolve(transactions);
            })
            )
        }
        getData().then(data=>{
            //console.log(data);
            if (this._isMounted) {
                this.setState({
                    transactionsList: data,
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

    handleChange = (e) => {
        var valor= e.target.value;
        if(valor===""){
            valor=0;
        }
        else{
            //reemplazar la coma por puntos
            valor = valor.replace(",",".");
            valor=parseFloat(valor);
        }
        this.setState({
            transactions_modal: {
            ...this.state.transactions_modal,
            [e.target.name]: valor,
          },
        });
    };


    async handleSaveTransactions() {
        toast.info("Guardando los datos", {
          position: "top-right",
        });
    
        
       /*  newTransactions.date = this.props.firebase.timestamp().fromDate(new Date()); */
        // const path = `${this.props.firebase.COLLECTIONS.TRANSACTIONS}/${Date.now()}`;
        try {
            console.log(this.state.transactions_modal);
            var newTransactions = this.state.transactions_modal;
            await this.props.firebase.saveNewTransactions(newTransactions);
            
    
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
                transactions_modal: {
                ...this.state.transactions_modal,
                status: enable?3:2,
              },
            });
        }
    }

    newTransactionsModal() {
        if (this._isMounted) {
          this.setState({
            modal_open: true,
            transactions_modal:{
                ...this.transactions_default,
            }
          });
        }
    }

    openTransactionsModal = (transactions) => {
        if(this._isMounted){
          this.setState({
            transactions_modal: transactions,
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
                    RECARGAS BANCARIAS
                    </a>
                </MDBView>

                <MDBCardBody className="mb-0">
                    <Grid container justify = "flex-end">
                        <Grid item xs={2}>
                        <MDBSelect
                            options={this.state.options}
                            selected="Escoja el tipo de recarga"
                            color="primary"
                            getValue={(value) => {
                                console.log(value);
                                if(value[0]==="1"){
                                    this.SearchTransactions("payphoneApi");
                                    this.setState({
                                        selectedMethod : "payphoneApi",
                                    });
                                }
                                if(value[0]==="2"){
                                    this.SearchTransactions("bankTransfer");
                                    this.setState({
                                        selectedMethod : "bankTransfer",
                                    });
                                }
                            }}
                            //label="Example label"
                        />
                        </Grid>
                    </Grid>
                    <TransactionsTable
                        transactionsList={this.state.transactionsList}
                        openTransactionsModal={this.openTransactionsModal}
                        selectedMethod={this.state.selectedMethod}
                    />

                </MDBCardBody>
                </MDBCard>

                <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />

                <TransactionsModal
                    modal_open={this.state.modal_open}
                    toggleModal={() => this.toggleModal()}
                    transactions_modal={this.state.transactions_modal}
                    fileInputHandler={this.fileInputHandler}
                    handleChange={this.handleChange}
                    handleChangeType={this.handleChangeType}
                    updateEnable = {this.updateEnable}
                    handleSaveTransactions ={()=>{this.handleSaveTransactions()}}
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
  )(Transactions);