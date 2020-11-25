import styled from "styled-components"
import {Link} from "react-router-dom";
export const NavigationContainer = styled.div`
  width : 100%;
  display : flex ; 
  background-color : #424242;
  height : 60px;
  align-items : center;
  padding : 0 1rem ; 
  margin-bottom : 1rem;
`

export const LeftNavigation = styled.div`
  width : 60% ;   
  display : flex ; 
  justify-content : flex-start ;
`

export const RightNavigation = styled.div`
  width : 40% ; 
  display : flex; 
  justify-content : flex-end; 
`

export const CustomLink = styled(Link)`
  padding : 1rem 0.75rem ; 
  color : white ; 
  text-decoration : none ; 
  &:hover{
    background-color : white;  
    color : black;
  }
`
