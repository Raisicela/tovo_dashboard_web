import React from "react";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import Title from "../components/Title";
import { compose } from "recompose";
import { withFirebase } from "../../bloc/Firebase";
import { withAuthorization, withEmailVerification } from "../../bloc/Session";

//modals
import MilestoneModal from "../modals/ModalMilestone";
import RewardModal from "../modals/ModalReward";

//tables
import MilestonesTable from "../tables/TableMilestones";
import RewardsTable from "../tables/TableReward";

class Intro extends React.Component {
  _isMounted = false;

  entity_default = {
    enable: true,
    photoUrlLocal:
      "https://firebasestorage.googleapis.com/v0/b/fuse-foods.appspot.com/o/logos_app_web%2Flogo_categori.png?alt=media&token=cad36dfa-e393-4b5a-8caf-afc4b6fe83bb",
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      milestonesList: [],
      milestone_modal_open: false,
      milestone_modal: {},

      rewardsList: [],
      reward_modal: {},
      reward_modal_open: false,
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ loading: true, error: null });
    this.props.firebase.getAllMilestones().onSnapshot(async (querySnapshot) => {
      const getData = async () => {
        return Promise.all(
          querySnapshot.docs.map(async function (milestoneDocument) {
            const milestone = milestoneDocument.data();
            milestone.photoUrlLocal = milestoneDocument.data().photoUrl;
            return Promise.resolve(milestone);
          })
        );
      };
      getData()
        .then((data) => {
          //console.log(data);
          if (this._isMounted) {
            this.setState({
              milestonesList: data,
              loading: false,
            });
          }
        })
        .catch((error) => {
          //console.log(error.message);
          this.setState({
            loading: false,
            error: error.message,
          });
        });
    });

    this.props.firebase.getAllRewards().onSnapshot(async (querySnapshot) => {
      const getData = async () => {
        return Promise.all(
          querySnapshot.docs.map(async function (rewardDocument) {
            const reward = rewardDocument.data();
            reward.photoUrlLocal = rewardDocument.data().photoUrl;
            return Promise.resolve(reward);
          })
        );
      };
      getData()
        .then((data) => {
          //console.log(data);
          if (this._isMounted) {
            this.setState({
              rewardsList: data,
              loading: false,
            });
          }
        })
        .catch((error) => {
          //console.log(error.message);
          this.setState({
            loading: false,
            error: error.message,
          });
        });
    });
  }

  toggleMilestoneModal() {
    if (this._isMounted) {
      this.setState({
        milestone_modal_open: !this.state.milestone_modal_open,
      });
    }
  }

  toggleRewardModal() {
    if (this._isMounted) {
      this.setState({
        reward_modal_open: !this.state.reward_modal_open,
      });
    }
  }

  fileInputHandler = (file) => {
    if (this.state.milestone_modal.photoFile !== file) {
      if (this._isMounted) {
        this.setState({
          milestone_modal: {
            ...this.state.milestone_modal,
            photoFile: file,
            photoUrlLocal: URL.createObjectURL(file),
          },
        });
      }
    }
  };

  fileRewardInputHandler = (file) => {
    if (this.state.reward_modal.photoFile !== file) {
      if (this._isMounted) {
        this.setState({
          reward_modal: {
            ...this.state.reward_modal,
            photoFile: file,
            photoUrlLocal: URL.createObjectURL(file),
          },
        });
      }
    }
  };

  handleChange = (e) => {
    this.setState({
      milestone_modal: {
        ...this.state.milestone_modal,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleChangeReward = (e) => {
    this.setState({
      reward_modal: {
        ...this.state.reward_modal,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleChangeType = (e) => {
    //console.log("tipo", parseInt(e[0]));
    this.setState({
      milestone_modal: {
        ...this.state.milestone_modal,
        type: parseInt(e[0]),
      },
    });
  };

  handleChangeTypeReward = (e) => {
    //console.log("tipo", parseInt(e[0]));
    this.setState({
      reward_modal: {
        ...this.state.reward_modal,
        type: parseInt(e[0]),
      },
    });
  };

  async handleSaveMilestone() {
    toast.info("Guardando los datos", {
      position: "top-right",
    });

    var newReward = this.state.milestone_modal;
    const path = `${this.props.firebase.COLLECTIONS.MILESTONES}/${Date.now()}`;
    try {
      if (newReward.photoFile !== undefined) {
        if (newReward.photoPath) {
          //console.log("eliminar anterior");
          try {
            await this.props.firebase.deleteFile(newReward.photoPath);
          } catch (error) {
            //console.log(error.message);
          }
        }
        const snapshot = await this.props.firebase.uploadFile(
          path,
          newReward.photoFile
        );
        const downloadURL = await snapshot.ref.getDownloadURL();
        newReward.photoUrl = downloadURL;
        newReward.photoPath = path;
      }

      delete newReward.photoFile;
      delete newReward.photoUrlLocal;

      if (!newReward.milestoneId || newReward.milestoneId === "") {
        //console.log("guardar");
        await this.props.firebase.saveNewMilestone(newReward);
      } else {
        //console.log("editar");
        await this.props.firebase.editMilestone(newReward);
      }

      toast.success("Datos guardados con éxito", {
        position: "top-right",
      });
    } catch (error) {
      toast.warning("Error: " + error.message, {
        position: "top-right",
      });
      //console.log(error.message);
    }
  }

  async handleSaveReward() {
    toast.info("Guardando los datos", {
      position: "top-right",
    });

    var newReward = this.state.reward_modal;
    const path = `${this.props.firebase.COLLECTIONS.REWARDS}/${Date.now()}`;
    try {
      if (newReward.photoFile !== undefined) {
        if (newReward.photoPath) {
          //console.log("eliminar anterior");
          try {
            await this.props.firebase.deleteFile(newReward.photoPath);
          } catch (error) {
            console.log(error.message);
          }
        }
        const snapshot = await this.props.firebase.uploadFile(
          path,
          newReward.photoFile
        );
        const downloadURL = await snapshot.ref.getDownloadURL();
        newReward.photoUrl = downloadURL;
        newReward.photoPath = path;
      }

      delete newReward.photoFile;
      delete newReward.photoUrlLocal;

      if (!newReward.rewardId || newReward.rewardId === "") {
        //console.log("guardar");
        await this.props.firebase.saveNewReward(newReward);
      } else {
        //console.log("editar");
        await this.props.firebase.editReward(newReward);
      }

      toast.success("Datos guardados con éxito", {
        position: "top-right",
      });
    } catch (error) {
      toast.warning("Error: " + error.message, {
        position: "top-right",
      });
      //console.log(error.message);
    }
  }

  updateEnable = (enable) => {
    if (this._isMounted) {
      this.setState({
        milestone_modal: {
          ...this.state.milestone_modal,
          enable: enable,
        },
      });
    }
  };

  updateEnableReward = (enable) => {
    if (this._isMounted) {
      this.setState({
        reward_modal: {
          ...this.state.reward_modal,
          enable: enable,
        },
      });
    }
  };

  newMilestoneModal() {
    if (this._isMounted) {
      this.setState({
        milestone_modal_open: true,
        milestone_modal: {
          ...this.entity_default,
        },
      });
    }
  }

  newRewardModal() {
    if (this._isMounted) {
      this.setState({
        reward_modal_open: true,
        reward_modal: {
          ...this.entity_default,
        },
      });
    }
  }

  openMilestoneoModal = (milestone) => {
    if (this._isMounted) {
      this.setState({
        milestone_modal: milestone,
        milestone_modal_open: true,
      });
    }
  };

  openRewardModal = (reward) => {
    if (this._isMounted) {
      this.setState({
        reward_modal: reward,
        reward_modal_open: true,
      });
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <Grid
          container
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
    if (this.state.error) {
      return (
        <Grid
          container
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
    return (
      <div>
        <MDBCard narrow className="mb-0">
          <MDBView cascade className="form-header blue-gradient mb-0">
            PREMIOS
          </MDBView>

          <MDBCardBody className="mb-0">
            <Grid container justify="flex-end">
              <Grid item xs={1}>
                <MDBBtn floating color="blue">
                  <MDBIcon
                    icon="plus white-text"
                    size={"2x"}
                    onClick={() => {
                      this.newRewardModal();
                    }}
                  />
                </MDBBtn>
              </Grid>
            </Grid>
            <RewardsTable
              rewardsList={this.state.rewardsList}
              openRewardModal={this.openRewardModal}
            />
          </MDBCardBody>
        </MDBCard>

        <div style={{ marginTop: "50px" }}>
          <MDBCard narrow className="mb-0">
            <MDBView cascade className="form-header blue-gradient mb-0">
              HITOS
            </MDBView>

            <MDBCardBody className="mb-0">
              <Grid container justify="flex-end">
                <Grid item xs={1}>
                  <MDBBtn floating color="blue">
                    <MDBIcon
                      icon="plus white-text"
                      size={"2x"}
                      onClick={() => {
                        this.newMilestoneModal();
                      }}
                    />
                  </MDBBtn>
                </Grid>
              </Grid>
              <MilestonesTable
                milestonesList={this.state.milestonesList}
                openMilestoneModal={this.openMilestoneoModal}
              />
            </MDBCardBody>
          </MDBCard>
        </div>

        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />

        <MilestoneModal
          modal_open={this.state.milestone_modal_open}
          toggleModal={() => this.toggleMilestoneModal()}
          milestone_modal={this.state.milestone_modal}
          fileInputHandler={this.fileInputHandler}
          handleChange={this.handleChange}
          handleChangeType={this.handleChangeType}
          updateEnable={this.updateEnable}
          handleSaveMilestone={() => {
            this.handleSaveMilestone();
          }}
        />

        <RewardModal
          modal_open={this.state.reward_modal_open}
          toggleModal={() => this.toggleRewardModal()}
          reward_modal={this.state.reward_modal}
          fileInputHandler={this.fileRewardInputHandler}
          handleChange={this.handleChangeReward}
          handleChangeType={this.handleChangeTypeReward}
          updateEnable={this.updateEnableReward}
          handleSaveReward={() => {
            this.handleSaveReward();
          }}
        />
      </div>
    );
  }
}

// export default Intro;
const condition = (authUser) => authUser && !!authUser.admin;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(Intro);
