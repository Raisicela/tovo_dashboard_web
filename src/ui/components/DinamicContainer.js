import styled from "styled-components";

const DynamicContainer = styled.div`
  background-color: ${props => (props.bgColor ? props.bgColor : "white")};
  color: ${props => (props.textColor ? props.textColor : "white")};
  width: 80%;
  height: 50px;
`;

export default DynamicContainer;