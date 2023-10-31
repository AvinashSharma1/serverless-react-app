import { Button } from 'reactstrap';
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faMoneyCheckAlt, faSearchDollar, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

class ShowInventory extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading:false,
            invoices:[],
         }
        

    }

    async componentDidMount() {
        const BASE_URL = process.env.REACT_APP_GET_INVENTORY;
        const res = await axios.get(BASE_URL,{})
            .catch((err) => console.log(err));
        let data = await res.data;
        data = JSON.parse(data.body);
        this.setState({invoices:data,isLoading:false}); 
            
    }

    handleButtonClick = (id) => {
        console.log(id);
        let updatedInvoices = [...this.state.invoices].filter(i => i.id !== id);
        this.setState({invoices:updatedInvoices});
    }
    
    render() { 
        const isLoading = this.state.isLoading;
        let allInvoices = this.state.invoices;
       // allInvoices = Array.from(allInvoices);
        console.log("all incoices =",allInvoices);


        let invoices = allInvoices.map( invoice =>            
            <tr key={invoice.id}>
                <td>{invoice.Vender}</td>
                <td>{invoice.Amount}</td>
                <td>{invoice.InvoiceSRNo}</td>
                <td>{invoice.Date}</td>
                <td><Button className="btn btn-sm btn-success" onClick={() => this.handleButtonClick(invoice.id)}> <FontAwesomeIcon icon={faThumbsUp} /> Ok </Button></td>
                <td><Button className="btn btn-sm btn-danger" onClick={() => this.handleButtonClick(invoice.id)}> <FontAwesomeIcon icon={faThumbsDown} /> NonOK </Button></td>
                <td><Button className="btn btn-sm btn-info" onClick={() => this.handleButtonClick(invoice.id)}><FontAwesomeIcon icon={faMoneyCheckAlt}/> 50% </Button></td>
                <td><Button className="btn btn-sm btn-warning" onClick={() => this.handleButtonClick(invoice.id)}> <FontAwesomeIcon icon={faSearchDollar}/> ?? </Button></td>
                <td><Button className="btn btn-sm btn-ifo" onClick={() => this.handleButtonClick(invoice.id)}><FontAwesomeIcon icon={faImage}/> Image </Button></td>
            </tr>
        );
        if(isLoading)
            return (<div>Loading...</div>);
        else{

            return (  
                <div className='container border rouded center'>
                    <div className='row'>
                        <div className='col-12 center text-center'>
                            <h4> Pending Invoices - Test Compnay</h4>
                        </div>
                        <div className='.col-xs-12 center text-center'>
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Vender</th>
                                        <th>Amount</th>
                                        <th>Invoice #</th>
                                        <th>Data</th>
                                        <th colSpan={4}>Actions</th>
                                        <th>Image</th>
                                    </tr>                                    
                                </thead>
                                <tbody>
                                    {this.state.invoices.length === 0 ? <tr><td colSpan={9}>No Record found !</td></tr> : invoices}
                                </tbody>
                            </Table>
                        </div>

                    </div>

                </div>
            );

        }
            
    }
}
 
export default ShowInventory;