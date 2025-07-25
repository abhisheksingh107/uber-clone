import { createContext, useState } from "react"

// Create a context
const UserContext = createContext();
// 2. Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: '',
    }
  })
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
