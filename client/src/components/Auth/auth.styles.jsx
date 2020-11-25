import styled from "styled-components";

const FormContainer = styled.form`
  width : 90% ; 
  max-width : 500px ; 
  border : 1.5px solid #1a237e; 
  border-radius : 7px ; 
  padding : 2rem; 
  margin : auto; 
`

const FormHeader = styled.div`
  text-align : center; 
  display : flex ; 
  flex-direction : column ; 
`

const Title = styled.h2`
  font-weight : 700 ; 
  font-size : 2em ;   
`
const SubTitle = styled.h3`
  font-weight : 400; 
  font-size : 1em;
`

const FormGroups = styled.div`
  display : flex ; 
  flex-direction : column ; 
`
const ButtonGroups = styled.div`
  display: flex;
  justify-content: center;
`
export {FormContainer,FormHeader, Title, SubTitle , FormGroups, ButtonGroups}