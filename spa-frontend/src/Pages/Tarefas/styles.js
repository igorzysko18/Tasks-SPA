import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100vh;
  min-width: 100vw;
  background-color: #383838;
  flex: 1;
  padding: 20px;
`

export const Form = styled.form`
  display: flex;
  padding: 3rem;
  flex-direction: column;
  align-items: flex-start; /* Alinhe o conteúdo à esquerda */
  justify-content: center;
  background-color: #201d1d;
  border-radius: 5px;
  width: 100%;
  max-width: 450px;
  gap: 30px 0px;

  h1 {
    color: white;
    font-size: 20px;
    font-weight: light;
  }

  p {
    color: white;
    font-size: 16px;
    font-weight: bold; 
  }

  a {
    color: white;
    font-size: 14px;
  }
`

export const SubContainerSign = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px 20px;
  align-items: center;
`

export const Div = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center; 
  gap: 20px 0px; 

  h1 {
    color: white;
    font-size: 30px;
    font-weight: light;
  }


`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 16px; 
  background-color: #383838;
  
`;

