import React, { useState, useRef, useCallback } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'



const Loading = props => {
  const [ height, setHeight ] = useState()
  const ref = useRef(null)

  const setSize = node => {
    if (node) {
      const parent = node.parentNode
      let siblingHeight = 0
      Array.from(parent.children).forEach(child => {
        if (child !== node) {
          siblingHeight += child.clientHeight
        }
      })
      setHeight(parent.clientHeight - siblingHeight)
    }
  }

  const loadingElement = useCallback(node => {
    if (node) {
      ref.current = node
      window.addEventListener('resize', handleResize)
      setSize(node)
    } else {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleResize = () => {
    if (ref.current && ref.current.parentNode) {
      setSize(ref.current)
    }
  }

  let divStyle = {
    height
  }

  return (
    <div className="loading" ref={loadingElement} style={divStyle}>
      <h4 className="loading-header">
        Loading... <FontAwesomeIcon icon={faSpinner} spin />
      </h4>
    </div>
  )
}

export default Loading