import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Sparklines, SparklinesLine } from 'react-sparklines'

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
          <Sparklines height={50} width={180} data={temps}>
            <SparklinesLine color='red'></SparklinesLine>
          </Sparklines>
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