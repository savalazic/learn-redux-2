import React, { Component } from 'react'

class GoogleMap extends Component {
  
  componentDidMount() {
    new google.maps.Map(this.refs.map, {
      zoom: 12,
      center: {
        lat: this.props.lat,
        lng: this.props.lon
      }
    })
  }
  
  render() {
    return (
      // ref system allow us to get reference to html element that is render to HTML
      // this.refs.map
      <div ref='map' />
    )
  } 
}

export default GoogleMap