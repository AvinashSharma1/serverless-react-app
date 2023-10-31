import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert, Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';

class AddInventory extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Vender: '',
            Amount: '',
            Date: '',
            isLoading: false,
            isPostSuccessful: false,
            errorMessage: null,
            visible:true,
        };
            
    }

    generateUniqueId() {
        const uniqueId = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
        return uniqueId.toString(); // Convert it to a string
    }
      
    
    sendRequest = async () => {

        let uid = parseInt(this.generateUniqueId());
        //let uid = (this.generateUniqueId());
        console.log(this.state);
        try {
            const ADD_INVENTORY_URL = process.env.REACT_APP_ADD_INVENTORY;
            const res = await axios.post(ADD_INVENTORY_URL,{
                id:uid,
                Vender:this.state.Vender,
                Amount:this.state.Amount,
                InvoiceSRNo:uid,
                Date:this.state.Date,
            }).catch((err)=>{
                console.log(err);
                this.setState({
                    errorMessage: err.message,
                    isLoading: false
                  });
            });
            const data = await res.data;
            this.setState({
                isLoading: false,
            });
            return data;
            
        } catch (error) {
            this.setState({
                errorMessage: error.message,
                isLoading: false
            });
        }

       
        
    }

    handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        console.log("handle change name : ", name,"value = ", value);
        this.setState({
            [name]:value,
        });   
    };

   
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true,
            visible:true,
          });
      
        this.sendRequest()
        .then((data) => {
           return this.handleSubmitPromise(data);
        })
        .then((data) => {
            console.log("2nd than data =",data);
            this.setState({
                isPostSuccessful: true,
            });
            
        })
        .catch((err) => {
            console.log(err.message);
            alert(err.message);
            this.setState({
                errorMessage: err.message,
            });
        });
    };

/*     componentDidMount() {
        // You can call your submitAPI method here or wherever it's appropriate
        this.submitAPI();
      }
 */
    
    handleSubmitPromise = (data) => {
        return new Promise(function(resolve,reject){

            if(data.statusCode === 500){
                let errData = JSON.parse(data.body);
                reject(new Error(errData.message));
            }
            else {
                resolve(200);
            }
        });
    }

    onDismiss = () => {
        this.setState({
            visible: false,
        });
    } 

    render() {
        let {isLoading, isPostSuccessful, errorMessage, VenderName,Amount,Date} = this.state;
      
          if (isPostSuccessful) {
           
            return (
                <>
                    <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                        <span>success!....</span>
                    </Alert>
                    <Navigate to="/" />
                </>
               
            );
          }
    
        return (
            <div className='container border round center'>
                <div className='row'>
                    <div className='col-12 center text-center'>Add Inventory</div>
                </div>
                {errorMessage &&(
                    <>
                        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                            {errorMessage}
                        </Alert>
                    </>

                )}
                <div className='row justify-content-center'>
                    <div className='col-6 margin'>
                        <Form className='form' onSubmit={(e)=>this.handleSubmit(e)} >
                            <FormGroup>
                                <Label>Vender Name</Label>
                                <Input 
                                    type='text' 
                                    name='Vender'
                                    value={VenderName}
                                    onChange={(e)=>this.handleChange(e)} 
                                    placeholder='Enter Vendor Name'   />
                            </FormGroup>
                            <FormGroup>
                                <Label>Amount</Label>
                                <Input 
                                    type='text' 
                                    name='Amount'
                                    value={Amount}
                                    onChange={(e)=>this.handleChange(e)} 
                                    placeholder='Enter Amount'   />
                            </FormGroup>
                            <FormGroup>
                                <Label>Date</Label>
                                <Input 
                                    type='text' 
                                    name='Date'
                                    value={Date}
                                    onChange={(e)=>this.handleChange(e)} 
                                    placeholder='Enter Date '   />
                            </FormGroup>
                            <div style={{margin:'0 0 10px 0'}}>
                                <Button color='primary'  type='submit'  disabled={isLoading} >
                                    {isLoading &&(
                                        <>
                                            <Spinner size="sm"/> 
                                            <span>{' '}Loading</span>
                                        </>                                       
                                    )}
                                    {!isLoading &&(<>Add Inventory</>)}
                                </Button>
                            </div>
                            
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}


export default AddInventory;