import React from "react"
import styled from "styled-components"
const Title = ({ title, subtitle, className }) => {
  return (
    <div className={className}>
      <h4>
        <span className="title">{title}</span>
        <span>{subtitle}</span>
      </h4>
    </div>
  )
}

export default styled(Title)`
  text-transform : uppercase ; 
  font-size : 2.3em; 
  margin-bottom : 2rem;
  h4{
    text-align : center;
    letter-spacing: 7px;
    color : var(--primaryColor);
  }
  .title{
    color : var(--mainBlack);
  } 
  span{
    display : block ; 
  }
  @media screen and (min-width:676px){
    span {
      display : inline-block ; 
      margin : 0 0.3rem;
    }
  }
`