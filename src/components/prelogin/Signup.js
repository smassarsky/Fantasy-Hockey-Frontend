import React, { Component } from 'react'
import { connect } from 'react-redux'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Alerts from './Alerts'
import InputError from './InputError'

import { userActions } from '../Actions/userActions'
import { validateSignup } from '../validators/signupValidators'