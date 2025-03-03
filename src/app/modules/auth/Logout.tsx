import {useEffect} from 'react'
import {Navigate, Routes, Route} from 'react-router-dom'
import {useAuth} from './core/Auth'

//Redux - Dispatch - Actions - State
import {useDispatch, useSelector} from 'react-redux'
import {setAuthState, selectCurrentUser} from '../../redux/slice/authSlice'

import {Error404} from '../../modules/errors/components/Error404'

export function Logout() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    dispatch(setAuthState({user: null, token: ''}))
  }, [])

  //const navigate = useNavigate()

  return (
      <Routes>
        {currentUser === null ?
            <Route path='*' element={<Navigate to='/auth/login' />} />:
            <Route path='*' element={<div>Logout....</div>} />
        }

      </Routes>
  )
}