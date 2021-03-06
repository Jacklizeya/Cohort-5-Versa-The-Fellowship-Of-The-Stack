import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import styled from "styled-components";
import Button from "../Reusable/Button";

const CheckoutButton = ({ price, artistName, items, custPref, custNote }) => {
    
    const totalPrice = +price + +(price < 105 && custPref === 'delivery' ? 10 : 0)
    const priceForStripe = totalPrice * 100;

    const publishableKey =
        "pk_test_51ICnpqINw7U5M31CEDkye0SmruSOvRzTQiiX8ObajGYJr2uONQKzqPpmQXmj98jJUKWCFDvAhlU76oJT2XpM0HUc00GbQtAjta";
    let onToken = async (token, args) => {
        try {
            const res = await axios.post("/api/orders/stripe/payment", {
                token,
                amount: priceForStripe,
            });
            const purchaseInfo = res.data.success;
            purchaseInfo.deliveryType = custPref;
            purchaseInfo.deliveryNote = custNote;
            axios.post("/api/orders/paid", {
                success: token,
                items: items,
                payment: purchaseInfo,
            });
            axios.delete('/api/cart/clear', { session: localStorage.getItem('session') })
            window.location = '/'
        } catch (error) {
            if (error.response.status === 500) {
                switch (error.response.data.error.code) {
                    case "card_declined":
                        switch (error.response.data.error.decline_code) {
                            case "generic_decline":
                                alert("Card Declined");
                                break;
                            case "insufficient_funds":
                                alert("Insufficient funds");
                                break;
                            default:
                                alert("Card Declined");
                        }
                        break;
                    case "expired_card":
                        alert("Card Expired");
                        break;
                    default:
                        alert("Payment processing failed");
                }
            }
        }
    };

    return (
        <StripeContainer>
            <Stripe
                name={artistName} // the pop-in header title
                description={`Total: ${totalPrice.toFixed(2)}`} // the pop-in header subtitle
                // the pop-in header image (default none)
                panelLabel='Pay' // prepended to the amount in the bottom pay button
                amount={priceForStripe} // cents
                currency="CAD"
                stripeKey={publishableKey}
                locale="us"
                email
                // Note: Enabling either address option will give the user the ability to
                // fill out both. Addresses are sent as a second parameter in the token callback.
                shippingAddress
                billingAddress
                // Note: enabling both zipCode checks and billing or shipping address will
                // cause zipCheck to be pulled from billing address (set to shipping if none provided).
                zipCode
                token={onToken} // submit callback
                
            >
                <Button primary>Pay</Button>
            </Stripe>
        </StripeContainer>
    );
};
const StripeContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
`;
const Stripe = styled(StripeCheckout)`
    width: 200px;
    margin: 20px 0;
`;
export default CheckoutButton;
