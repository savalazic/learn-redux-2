# Redux Notes

<img src="http://i.imgur.com/qhPanYL.jpg">

### Controlled Component and Binding Context

`search_bar.js`
```
class SearchBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      term: ''
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onInputChange(e) {
    this.setState({ term: e.target.value })
  }

  onFormSubmit(e) {
    e.preventDefault()

    // We need to go and fetch weather data

    // Clear form
    this.setState({ term: '' })
  }

  render() {
    return (
      <form
        className='input-group'
        onSubmit={this.onFormSubmit}
      >
        <input 
          type='text'
          placeholder='Get a five-day forecast in your favorite cities'
          className='form-control'
          value={this.state.term}
          onChange={this.onInputChange} 
        />
        <span className='input-group-btn'>
          <button type='submit' className='btn btn-secondary'>Submit</button>
        </span>
      </form>
    )
  }
}
```

```
this.onInputChange = this.onInputChange.bind(this)
```
- this - SearchBar
- this has function onInputChange
- bind that function to this (SearchBar) and 
- replace onInputChange with this.onInputChange

### Middleware
- function that take an action and depending on action type and action payload, middleware can choose to lets action pass, manipulate the action, logs it, stops it.. 
- someone call action creator, middleware sitting between and waiting
- all action we create, flow through middleware


### ReduxPromise
- **ReduxPromise** is a middleware
- Redux promise sees the action, looks a payload property, if payload is promise, ReduxPromise stops the action and when request is finished, dispatches a new action with same type, and payload of request 

```
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'

import App from './components/app'
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'))
```

<img src="http://i.imgur.com/oReLl9Y.png">

### Ajax Request with Axios

`actions/index.js`
```
import axios from 'axios'

const API_KEY = '28a9122dfbb465a6c5f3d99feebdc0f4'
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}` 

export const FETCH_WEATHER = 'FETCH_WEATHER'

export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city},us`

  const request = axios.get(url)

  return {
    type: FETCH_WEATHER,
    payload: request
  }
}
```

`containers/search_bar.js`
```
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar)
```

`containers/search_bar.js`
```
onFormSubmit(e) {
  e.preventDefault()
  this.props.fetchWeather(this.state.term)
  this.setState({ term: '' })
}
```

`reducers/reducer_weather.js`
```
export default function(state = null, action) {
  console.log('action received', action)
  return state
} 
```

`reducers/index.js`
```
import { combineReducers } from 'redux'
import WeatherReducer from './reducer_weather'

const rootReducer = combineReducers({
  weather: WeatherReducer
});

export default rootReducer
```

### Avoid State Mutations in Reducers

`reducers/reducer_weather.js`
```
import { FETCH_WEATHER } from '../actions/index'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_WEATHER:
      // return state.concat([action.payload.data])
      return [...state, action.payload.data]
    default:
      break
  }

  return state
} 
```

### Building List
`containers/weather_list.js`

```
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
```


### Make reusable chart component

`components/chart.js`
```
import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'

export default (props) => {
  return (
    <div>
      <Sparklines height={50} width={180} data={props.data}>
        <SparklinesLine color={props.color}></SparklinesLine>
      </Sparklines>
    </div>
  )
}
``` 

`containers/weather_list.js`
```
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
```