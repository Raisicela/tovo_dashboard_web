import React from "react";
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../bloc/Firebase';

import {
    MDBCard,
    MDBCardBody,
  } from "mdbreact";
import SectionContainer from "../components/sectionContainer";
import TableGroups from "../tables/TableGroups";

class Groups extends React.Component{

    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
          loading: true,
          error: null,
          groupsData: []
        };
    }

    componentDidMount(){
        this._isMounted = true;
        this.setState({loading:true, error:null});
        this.props.firebase
          .getGroups()
          .onSnapshot(async (querySnapshot) => {
            const getData = async ()=>{
                return Promise.all(
                    querySnapshot.docs.map(async(group) => {
                        var response = group.data();
                        const noMember = await this.props.firebase.getNumberOfMembersOfGroup(response.groupId).get()
                        let aux = []
                        await Promise.all(
                            noMember.docs.map(async memberRegister => {
                                const user = await this.props.firebase.getAppUser(memberRegister.data().userId).get()
                                aux.push(user.data())
                                Promise.resolve(aux);
                            })
                        )
                        response.members = aux
                        return Promise.resolve(response);
                    })
                )
            }
            getData().then(data=>{
                if (this._isMounted) {
                    this.setState({
                        groupsData: data,
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

    componentWillUnmount(){
        this._isMounted = false;
    }

    render(){
        return(
          <SectionContainer title="Grupos" noBorder>
              <MDBCard>
                <MDBCardBody>
                    <TableGroups groupsData = {this.state.groupsData}> 

                    </TableGroups>
                  
                </MDBCardBody>
              </MDBCard>
            </SectionContainer>
        );
    }
}

export default compose(withRouter, withFirebase)(Groups);