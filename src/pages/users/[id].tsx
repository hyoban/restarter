import { useParams } from 'react-router'

import useUser from '~/network/useUser'

function Userinfo() {
  const { id } = useParams()
  const { user, isLoading, isError } = useUser(Number(id))
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <div>
      {user != null ? <div>{user.name}</div> : <div>User not found</div>}
    </div>
  )
}

export default Userinfo
