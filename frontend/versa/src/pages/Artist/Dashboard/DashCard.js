import React from 'react'
import {Link} from "react-router-dom"
import styled from "styled-components"
import Button from '../../../components/Reusable/Button'
import theme from '../../../components/Reusable/Colors'
import {RightIcon} from '../../../images/icons'


const GoToPage = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-end;
width: 100%;
`

const PageLink = styled(Button)`
margin: 0;
padding: 0;
border-bottom: none;
`;

const Title = styled.h1`
flex:none;
margin:0;
font-size: 1.2em;
padding: 4px 0;
`

const Total = styled.div`
display:flex;
flex-direction: column;
justify-content: flex-start;
padding: 10px 0 0 0;

p{
    margin: 0;
    font-size: 2em;
    color:${theme.tertiary+'95'};
   
}
h3{
    padding: 0 0 0 4px;
    font-size: 0.8em;
    text-transform: uppercase;
    font-weight: 700;
    color:${theme.tertiary+'95'};
}
`
const AtAGlance = styled.div`
display:flex;
flex-direction:column;
`;
const DataTitle = styled.h2``
const Card = styled.div`
margin: 0;
padding: 20px;
width: 250px;
background: white;
border: 1px solid #FFFFFF;
box-sizing: border-box;
box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
border-radius: 15px;
:hover{
    box-shadow: 7px 7px 30px rgba(27, 49, 66, 0.13);
}

transition: 0.3s;
hover {
    box - shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
`;

const Graph = styled.div``
const Table = styled.div``
const DashCard = (props) => {
    const { total, totalLabel, dataTitle, graphTitle, tableTitle, graphData, tableData, title} = props
    return (
        <Card>
            <AtAGlance>
            <GoToPage>
            <Title>{title}</Title>
            <PageLink>View<RightIcon stroke={theme.primary}/></PageLink></GoToPage>
            
                    {total && <Total><p>{total}</p><h3>{totalLabel}</h3> </Total>}
                    
            </AtAGlance>
                {graphData && <><DataTitle>{graphTitle}</DataTitle><Graph></Graph></>}
                {tableData && <><DataTitle>{tableTitle}</DataTitle><Table></Table></>}
        </Card>
    )
}

export default DashCard
