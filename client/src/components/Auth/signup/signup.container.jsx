import React from "react"
import {gql, useMutation} from "@apollo/client"
import SignUp from "./signup.component"

const SIGN_UP = gql`
  mutation SignUp($data : CreateUserInput! ) {
    createUser(data : $data) {
      user {
        _id 
        name 
        email
      },
      token 
    }
  }
`

const SignUpContainer = () => {
  const [createUser] = useMutation(SIGN_UP);
  return <SignUp createUser={createUser} />
}

export default SignUpContainer