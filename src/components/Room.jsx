import React from 'react';
import {Link} from 'react-router-dom';
import defaultImg from '../images/room-1.jpeg';
import PropTypes from 'prop-types';

export default function Room({room}) {
    const { name , nbr_room, images, price } = room;
    return (
        <div className="col-md-4 col-12 mx-auto p-2">
            <div className="card shadow-lg border-0 room">
                <img src={images[0] || defaultImg} alt="single room" className="img-fluid"/>
                <div className="price-top">
                    <h6>{price} DHs</h6>
                    <p>per month</p>
                </div>
                <Link to={`/rooms/${nbr_room}`} className="btn-warning room-link text-center" >See More</Link>
              <p className="room-info">{name}</p>
            </div>
        </div>
    )
}
 
Room.propTypes = {
    room: PropTypes.shape({
        name:PropTypes.string.isRequired,
        nbr_room:PropTypes.string.isRequired,
        images:PropTypes.arrayOf(PropTypes.string).isRequired,
        price:PropTypes.number.isRequired,
    })
}