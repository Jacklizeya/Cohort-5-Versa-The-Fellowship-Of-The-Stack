import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Reusable/Button";
import theme from "./Reusable/Colors";
import { StyledLink } from "./Reusable/Link";
import { addToNewsletterList } from "../axios/posts";

const Footer = () => {
    const [email, setEmail] = useState();
    const [success, setSuccess] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        addToNewsletterList(email);
        setSuccess(true);
    };
    return (
        <Container>
            <Newsletter>
                <h6>Stay connected with us</h6>
                {!success && (
                    <Input>
                        <NewsletterInput
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <NewsletterSubmit primary onClick={handleSubmit}>
                            Subscribe
                        </NewsletterSubmit>
                    </Input>
                )}
                {success && (
                    <p>
                        Success! You have been added to our newsletter list.
                        Check your email!
                    </p>
                )}
            </Newsletter>

            <Links>
                <LinkGroup>
                    <h6>Main Menu</h6>
                    <LinkItem to="/">Homepage</LinkItem>
                    <LinkItem to="/shop">Shop</LinkItem>
                    <LinkItem to="/events">Events</LinkItem>
                    <LinkItem to="/account">Account</LinkItem>
                    <LinkItem to="/wishlist">Wishlist</LinkItem>
                    <LinkItem to="/cart">Cart</LinkItem>
                </LinkGroup>
                <LinkGroup>
                    <h6>Versa</h6>
                    <LinkItem to="/coming-soon">About</LinkItem>
                    <LinkItem to="/coming-soon">Careers</LinkItem>
                    <LinkItem to="/coming-soon">Contact Us</LinkItem>
                    <LinkItem to="/coming-soon">Terms & Conditions</LinkItem>
                    <LinkItem to="/coming-soon">Cookies</LinkItem>
                </LinkGroup>
                <LinkGroup>
                    <h6>Support</h6>
                    <LinkItem to="/coming-soon">Help Centre</LinkItem>
                    <LinkItem to="/coming-soon">Business Education</LinkItem>
                    <LinkItem to="/coming-soon">Lifestyle Tips</LinkItem>
                </LinkGroup>
                <LinkGroup>
                    <h6>Community</h6>
                    <LinkItem to="/coming-soon">Landing for Artists</LinkItem>
                    <LinkItem to="/coming-soon">Landing for Drivers</LinkItem>
                    <LinkItem to="/coming-soon">Landing for Locals</LinkItem>
                </LinkGroup>
            </Links>
        </Container>
    );
};

export default Footer;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${theme.primary};
    padding: 2em 0;
    width: 100%;
    h6 {
        font-weight: 700;
        margin: 5px 5px 12px 5px;
        color: ${theme.secondary};
    }
    @media screen and (max-width: 420px) {
        /* margin: 1em 0; */
    }
    @media screen and (max-width: 768px) {
        /* margin: 1em 0; */
    }
`;

const Newsletter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5em;
    h6 {
        margin: 0 0 1em 0;
    }
    p {
        color: ${theme.secondary};
    }
`;

const Input = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    @media screen and (max-width: 420px) {
        flex-direction: column;
        input {
            margin-bottom: 16px;
        }
    }
`;

const NewsletterInput = styled.input`
    padding: 8px;
    outline: none;
    width: 75%;
    margin-right: 0.5em;
    border: ${(props) =>
        props.border === true
            ? `2px solid ${theme.primaryHover}`
            : `2px solid ${theme.primary}`};
    :active,
    :hover,
    :focus {
        border: ${(props) =>
            props.border === true
                ? `2px solid #77dd77`
                : `2px solid ${theme.primaryHover}`};
    }
`;

const NewsletterSubmit = styled(Button)`
    background: ${theme.primaryHover};
    border: 4px solid ${theme.primaryHover};
    :active,
    :hover,
    :focus {
        background: ${theme.secondary};
        border: 4px solid ${theme.secondary};
        color: ${theme.primaryHover};
    }
`;

const LinkGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 1em;
    min-width: 200px;
    :first-of-type {
        margin: 0 1em 0 0;
    }
    :last-of-type {
        margin: 0;
        min-width: 80px;
    }
    @media screen and (max-width: 420px) {
        margin: 1em 0;
    }
    @media screen and (max-width: 768px) {
        margin: 1em 0;
    }
`;

const Links = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 90%;
    justify-content: space-around;
    @media screen and (max-width: 420px) {
        width: 90%;
        flex-direction: column;
        align-items: center;
    }
    @media screen and (max-width: 768px) {
        width: 90%;
        flex-wrap: wrap;
    }
`;

const LinkItem = styled(StyledLink)`
    font-size: 16px;
    color: ${theme.secondary};
    background: none;
    border-bottom: none;
    margin: 0;
    padding: 5px;
    font-weight: 500;
    :hover,
    :active:active,
    :focus {
        color: ${theme.primaryHover};
    }
`;
