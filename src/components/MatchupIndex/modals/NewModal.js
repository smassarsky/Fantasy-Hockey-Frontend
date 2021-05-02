import React, { useState } from 'react'

import { validateMatchup } from 'validators'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { InputError } from 'components/common'

const CreateModal = ({ show, hide, teams, create }) => {

  const [fields, setFields] = useState({
    teamId: '',
    name: '',
    startDate: '',
    endDate: '',
  })
  const [errors, setErrors] = useState({})

  const handleSubmit = e => {
    e.preventDefault()
    const tempErrors = validateMatchup(fields)
    setErrors(tempErrors)
    if (Object.keys(tempErrors).length === 0) {
      create(fields)
    }
  }

  const handleChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  console.log(fields)
  return (
    <Modal show={show} onHide={hide} centered={true}>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          <Form.Row>
            <Form.Group as={Col} className="mb-0">
              <Form.Label className="text-muted mb-0">
                <small>Matchup Name</small>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={fields.name}
                onChange={handleChange}
              />
              <InputError message={errors.name} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} className="mb-0">
              <Form.Label
                className="text-muted mb-0"
              ><small>
                Team
              </small></Form.Label>
              <Form.Control
                as="select"
                name="teamId"
                onChange={handleChange}
                value={fields.team}
              >
                <option value="">Pick a Team...</option>
                {teams.map(team => {
                  return <option key={team.id} value={team.id}>{team.attributes.name}</option>
                })}
              </Form.Control>
              <InputError message={errors.teamId} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} xs={6}>
              <Form.Label
                className="text-muted mb-0"
              >
                <small>Start Date</small>
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                type="date"
                name="startDate"
                value={fields.startDate}
              />
              <InputError message={errors.startDate} />
            </Form.Group>

            <Form.Group as={Col} xs={6}>
              <Form.Label
                className="text-muted mb-0"
              >
                <small>End Date</small>
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                type="date"
                name="endDate"
                value={fields.endDate}
              />
              <InputError message={errors.endDate} />
            </Form.Group>
          </Form.Row>

          <Form.Row className="justify-content-center">
            <Button
              variant="primary"
              type="submit"
            >
              Create Matchup
            </Button>            
          </Form.Row>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateModal