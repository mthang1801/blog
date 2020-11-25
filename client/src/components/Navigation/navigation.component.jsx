import React from "react"
import {NavigationContainer, LeftNavigation,RightNavigation,  CustomLink} from "./navigation.styles"

const Navigation = () => {
  return (
    <NavigationContainer>
      <LeftNavigation>
        <CustomLink to="/posts">Posts</CustomLink>
      </LeftNavigation>
      <RightNavigation>
        <CustomLink to="/auth">Login</CustomLink>
      </RightNavigation>
    </NavigationContainer>
  )
}

export default Navigation