import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const DestroyModal = ({ show, hide, matchup, destroy}) => {
  return (
    <Modal show={show} onHide={hide} centered >
      <Modal.Body className="text-center">
        <h5>Are you sure you want to delete this matchup?</h5>
        <h5>{matchup ? matchup.attributes.name : null}</h5>
        <Button
          className="m-2"
          variant="danger"
          onClick={() => destroy(matchup.id)}
        >
          Delete
        </Button>
        <Button
          className="m-2"
          variant="primary"
          onClick={hide}
        >
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default DestroyModal