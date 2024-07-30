
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserByToken } from './redux/slice/users.slice'
import AppRoutes from './routes/AppRoutes'

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.users)
  const token = localStorage.getItem('jwt')

  useEffect(() => {
    if (token) {
      const promise = dispatch(getUserByToken(token));
      return () => {
        promise.abort();
      }
    }
  }, [dispatch])

  return (
    <AppRoutes user={user} />
  )
}

export default App
