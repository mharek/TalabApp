import React, { Component } from 'react'
import { RoomContext } from '../context';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import defaultBcg from '../images/room-3.jpeg';
export default class Booknow extends Component {
    constructor (props){
        super(props);
        this.state = {
        nbr_room: this.props.match.params.nbr_room,
        defaultBcg,
        startDate: new Date(),
        endDate: new Date(),
    };
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    }
    handleChangeStart(date) {
        this.setState({
        startDate: date
        });
    }
    handleChangeEnd(date) {
        this.setState({
        endDate: date
        });
    }
    calculateDaysLeft(startDate, endDate) {
        if (!moment.isMoment(startDate)) startDate = moment(startDate);
        if (!moment.isMoment(endDate)) endDate = moment(endDate);
        return endDate.diff(startDate, "days");
    }
    static contextType = RoomContext;
    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.nbr_room);
        const { startDate, endDate } = this.state;
        const daysLeft = this.calculateDaysLeft(startDate, endDate);
    if(!room){
        return (<div className="container roomerror">
            <div className="row my-5">
                <div className="col-md-6 col-12 mx-auto">
                    <div className="card shadow-lg border-0 p-4 error">
                        <h1 className="text-center display-4">SORRY</h1>
                        <h3>No such room could be found...</h3>
                        <Link to="/rooms" className="btn btn-warning mt-4 ">Back to Rooms</Link>
                    </div>
                </div>
            </div>
        </div>);
        }
        const {nbr_room,etage,size,price,airConditioner,waterHeater,wifi,images} = room;
        const [mainImg, ...defaultBcg] = images;
        return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
                    <div>
                        <h1 className="display-4">Booking</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-12 my-auto">
                            <img src={mainImg || defaultBcg} className="img-fluid" alt="selected room" />
                        </div>
                        <div className="col-md-6 col-12 my-auto">
                            <h1>Rooms Details</h1>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Room Number</th>
                                        <td>{nbr_room}</td>
                                    </tr>
                                    <tr>
                                        <th>Etage</th>
                                        <td>{etage}</td>
                                    </tr>
                                    <tr>
                                        <th>Price</th>
                                        <td>{price} DHs</td>
                                    </tr>
                                    <tr>
                                        <th>Size</th>
                                        <td>{size} m2</td>
                                    </tr>
                                    <tr>
                                        <th>Air Conditioner</th>
                                        <td>{airConditioner === true ? `Included`: `Not Included`}</td>
                                    </tr>
                                    <tr>
                                        <th>Water Heater</th>
                                        <td>{waterHeater ===true ? `Included` : `Not Included`}</td>
                                    </tr>
                                    <tr>
                                        <th>wifi</th>
                                        <td>{wifi ===true ? `Included` : `Not Included`}</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label htmlFor="Fromdate" className="font-weight-bolder mr-3">From Date </label>
                                <DatePicker selected={this.state.startDate} onChange={this.handleChangeStart} className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label htmlFor="Todate" className="font-weight-bolder mr-3">To Date </label>
                                <DatePicker selected={this.state.endDate} onChange={this.handleChangeEnd} className="form-control" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="row my-4">
                        
                        <div className="col-md-6 col-12 my-auto">
                            <div className="col-md-6 col-12 float-right">
                                <button className="btn btn-block btn-outline-primary" data-toggle="modal" data-target="#thanks">Whatsapp</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="thanks">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body p-4">
                            <h3>Thank you </h3>
                            <p className="lead">Whatsapp : +212643309185</p>
                        </div>
                        <div className="modal-footer">
                            <Link to="/" className="btn btn-dark">Goto Home</Link>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}