import styled, { css } from "styled-components";

// The button styling is the TERTIARY button style
// To make it look like PRIMARY or SECONDARY style, add the primary or secondary as props eg <button primary>Text<Icon right/></button>

const Button = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #6495ed;
    border: none;
    background-color: #fff;
    border-bottom: 3px solid #ffffff;
    padding: 10px 20px;
    font-weight: 700;
    letter-spacing: 5%;
    margin-right: 20px;
    transition: 0.3s ease;
    cursor: pointer;

    svg {
        width: 28px;
        height: 28px;
        margin-left: 16px;
        
        path{
            transition: 0.3s ease;
            fill: #6495ed;
        }
        
        }
    }

    &:hover {
        color: #317AFC;
        svg{
            path{
                fill: #317AFC;
            }
        }
    }

    ${(props) =>
        props.secondary &&
        css`
            background: #ffffff;
            border: 6px solid #6495ed;
            color: #6495ed;
            border-radius: 50px;
            &:hover {
        color: #317AFC;
        border: 6px solid #317AFC;
        svg{
            path{
                fill: #317AFC;
            }
        }
        `}
    ${(props) =>
        props.primary &&
        css`
            background: #6495ed;
            border: 6px solid #6495ed;
            border-radius: 50px;
            color: #ffffff;
            svg {
                path {
                    fill: #ffffff;
                }
            }
            &:hover {
                background-color: #317afc;
                border: 6px solid #317afc;
                color: white;
                svg {
                    path {
                        fill: #ffffff;
                    }
                }
            }
        `}
`;

export default Button;
