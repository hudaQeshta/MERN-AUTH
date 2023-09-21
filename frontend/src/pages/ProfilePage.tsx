import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { RootState } from '../store'
import FemaleIcon from '../assets/imgs/female-icon.svg'
import MaleIcon from '../assets/imgs/male-icon.svg'
import { GENDERS } from '../utils/constants'
import { Button } from 'react-bootstrap'
import { logout } from '../store/users.store'

const ProfilePage = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.users)
  const dispatch = useAppDispatch()

  return (
    <Row className='align-items-center justify-content-center'>
      <Col xs={12} md={8} lg={6}>
        <Card>
          <Card.Title className='custom d-flex justify-content-center align-items-end'>
            <span>Hi&nbsp;{userInfo.name}&nbsp;</span>
            <img
              style={{ height: '50px', width: '50px' }}
              src={userInfo.gender === GENDERS['M'] ? MaleIcon : FemaleIcon}
              alt={`An image to show user's gender (male/female)`}
            />
          </Card.Title>
          <Card.Body className='text-center'>
            <h3 className='mb-3 mt-4'>Welcome to our Application!</h3>
            <Button
              onClick={() => {
                dispatch(logout())
                if (window && window.location && window.location.href)
                  window.location.href = '/signin'
              }}
              className='btn btn-info my-2 px-3 text-white'
            >
              Log out
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default ProfilePage
