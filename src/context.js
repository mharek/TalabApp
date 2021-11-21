import React, { Component } from "react";
import items from "./data";
const RoomContext = React.createContext();

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    etage: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    airConditioner: false,
    waterHeater: false,
  };
  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize,
    });
  }
  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  getRoom = (nbr_room) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room) => room.nbr_room === nbr_room);
    return room;
  };
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value,
      },
      this.filterRooms
    );
  };
  filterRooms = () => {
    let {
      rooms,
      etage,
      price,
      minSize,
      maxSize,
      airConditioner,
      waterHeater,
      wifi,
    } = this.state;
    // for all the rooms
    let tempRooms = [...rooms];

    //transform value
    etage = parseInt(etage);
    price = parseInt(price);

    //filter by etage
    if (etage !== 1) {
      tempRooms = tempRooms.filter((room) => room.etage >= etage);
    }
    //filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price);

    //filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    //filter by airConditioner
    if (airConditioner) {
      tempRooms = tempRooms.filter((room) => room.airConditioner === true);
    }
    //filter by waterHeater
    if (waterHeater) {
      tempRooms = tempRooms.filter((room) => room.waterHeater === true);
    }
    //filter by wifi
    if (wifi) {
      tempRooms = tempRooms.filter((room) => room.wifi === true);
    }
    //change state
    this.setState({
      sortedRooms: tempRooms,
    });
  };
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}
const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
