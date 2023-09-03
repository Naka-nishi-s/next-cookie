import { Dispatch, SetStateAction } from "react"

export type User = {
  name: string,
  email: string
}

export type UserContextType = {
  user: User,
  setUser: Dispatch<SetStateAction<User>>
}
