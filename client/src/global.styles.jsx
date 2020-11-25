import {createGlobalStyle} from "styled-components"

export default createGlobalStyle`
  *{
    padding : 0 ;
    margin : 0 ; 
    box-sizing : border-box ; 
  }
  body{
    font-size : 16px;  
    line-height : 1.6;
    font-family: Roboto , "sans serif";
    @media screen and (max-width:992px){
      font-size : 14px ; 
    }
    @media screem and (max-width: 768px){
      font-size : 12px ; 
    }
  }
`