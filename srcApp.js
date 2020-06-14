require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';
app.use(morgan(morganOption))
app.use(helmet())

app.get('/', (req, res) => {
    res.send('Hello, world!')
})
app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
      response = { error: { message: 'server error' } }
    } else {
      console.error(error)
      response = { message: error.message, error }
    }
    res.status(500).json(response)
  })
  const {API_BASE_URL} = require('./config');

  export const fetchUserProfile = (userid) => dispatch => {
      fetch(`${API_BASE_URL}/users/${userId}`).then(res => {
          if (!res.ok) {
              return Promise.reject(res.statusText);
          }
          return res.json();
      }).then(userProfile => {
          dispatch(fetchUserProfileSuccess(userProfile));
      }).catch(err => dispatch(fetchUserProfileError(err)));
  };  

module.exports = app