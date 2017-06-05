import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Chart from '../components/chart'

class WeatherList extends Component {

  renderWeather(cityData) {
    const city = cityData.city.name
    const temps = cityData.list.map((weather) => {
      return weather.main.temp
    })

    console.log(temps)

    return (
      <tr key={city}>
        <td>{city}</td>
        <td>
          <Chart data={temps} color='orange' />
        </td>
      </tr>
    )
  }

  render() {
    return (
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.weather.map(this.renderWeather)
          }
        </tbody>
      </table>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     weather: state.weather
//   }
// }

function mapStateToProps({ weather }) {
  return { weather }
}

export default connect(mapStateToProps)(WeatherList)