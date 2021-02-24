import React from "react";
import styled from "styled-components";
import { View } from "../../../images/icons";
import { StyledLink } from "./Link";
import TopBar from "./TopBar";
import Table from "./Table";

const TableCard = ({ title, statNum, statLabel, link, data, headers }) => {
    return (
        <Container>
            <TopBar littleTitle={title} />
            <Card>
                <Overview>
                    <Stats>
                        <p>{statNum}</p>
                        <p>{statLabel}</p>
                    </Stats>
                    <StyledLink primaryExtraSmall to={link}>
                        <View /> View
                    </StyledLink>
                </Overview>
                <Table data={data} headers={headers} />
            </Card>
        </Container>
    );
};
export default TableCard;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background: ${(props) => props.theme.lightBlue};
    width: 400px;
`;
const Overview = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    button {
        svg {
            path {
                stroke: ${(props) => props.theme.blue};
                fill: none;
            }
        }
    }
`;
const Stats = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        font-weight: 700;
        font-size: 0.8em;

        :first-of-type {
            font-size: 1.5em;
            font-weight: 700;
            margin-bottom: 0;
        }
    }
`;
