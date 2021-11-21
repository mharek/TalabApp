import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../context';
import Title from '../components/Title';
//to get all unique value
const getUnique = (items,value) => {
return [...new Set(items.map(item => item[value]))]
}
export default function RoomsFilter({rooms}) {
    const context = useContext(RoomContext);
    const {
    handleChange ,etage ,price,minPrice,maxPrice,minSize,maxSize,airConditioner,waterHeater,wifi,
    } = context;

    
    let people = getUnique(rooms,'etage');
    people = people.map((item,index) => {
    return <option key={index} value={item}>{item}</option>
    })
    return (
        <div className="container mt-5">
            <Title title="Search Rooms" />
            <div className="row">
                <div className="col-md-6 col-12">

                    <div className="form-group">
                        <label htmlFor="etage">Etage</label>
                        <select name="etage" id="etage" value={etage} className="form-control" onChange={handleChange}>
                            {people}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Room Price {price} DHs</label>
                        <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="input-group my-5">
                        <label htmlFor="size" className="mr-3">Room Size </label>
                        <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange} className="form-control" />
                        <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange} className="form-control" />
                    </div>
                </div>
                <div className="col-md-4 col-15 ml-auto">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" name="airConditioner" id="airConditioner" checked={airConditioner} onChange={handleChange} />
                        <label htmlFor="airConditioner" className="custom-control-label">Air Conditioner</label>
                    </div>
                    <div className="custom-control custom-checkbox my-5">
                        <input type="checkbox" className="custom-control-input" name="waterHeater" id="waterHeater" checked={waterHeater} onChange={handleChange} />
                        <label htmlFor="waterHeater" className="custom-control-label">Water Heater</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" name="wifi" id="wifi" checked={wifi} onChange={handleChange} />
                        <label htmlFor="wifi" className="custom-control-label">Wifi</label>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}