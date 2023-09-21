import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import NotFoundIcon from '../assets/imgs/error-404.svg'

const NotFoundPage = () => {
  return (
    <Row className='align-items-center justify-content-center'>
      <Col xs={12} md={8} lg={6}>
        <Card>
          <Card.Title className='d-flex justify-content-center align-items-end my-5'>
            <img
              style={{ height: '150px', width: '150px' }}
              src={NotFoundIcon}
              alt={'Not found page icon'}
            />
          </Card.Title>
          <Card.Body className='text-center'>
            <h3 className='my-3'>Sorry, this page is not found!</h3>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default NotFoundPage
