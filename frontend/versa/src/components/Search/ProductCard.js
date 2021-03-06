import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../../redux/actions";
import { Link } from "react-router-dom";
// import { Image, ImageCard, ProductInfo } from "../Reusable/Card";
// import Card from "../Reusable/Card";
import ItemCard from "../Reusable/ItemCard";
import styled from "styled-components";
import Pill from "../Reusable/Pill";

import WishButton from "../WishList/WishButton";

function calcTotalStock(product) {
    return product.stock.reduce((total, curr) => {
        total += curr.quantity;
        return total;
    }, 0);
}
let host = process.env.NODE_ENV === "production" ? "" : "";
const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const productSelected = (id) => {
        dispatch(setSelectedProduct(id));
    };

    return (
        <Link to={`/product-item/${product.id}`}>
            {/* <ImageCard>
                <Image>
                    <img
                        onClick={() => {
                            productSelected(product.id);
                        }}
                        alt="product"
                        src={
                            product.image
                                ? `${host}/images/${product.image}`
                                : product.thumbnail
                                ? `https://versabucket.s3.us-east-2.amazonaws.com/images/${product.thumbnail}`
                                : ""
                        }
                    />
                </Image>
                <ProductInfo>
                    <div>
                        <h6>{product.title}</h6>
                    </div>
                    <div>
                        <h6>${product.price}</h6>
                    </div>
                </ProductInfo>
            </ImageCard> */}
            <ItemCard title={product.title} price={product.price}>
                {product.stock.reduce((total, curr) => {
                    total += curr.quantity;
                    return total;
                }, 0) === 0 && (
                    <OOSPill>
                        <p>Out of Stock</p>
                    </OOSPill>
                )}

                <ProductImage
                    stock={calcTotalStock(product)}
                    style={{
                        width: "100%",
                    }}
                    alt="product"
                    src={
                        product.image
                            ? `${host}/images/${product.image}.jpeg`
                            : product.thumbnail
                            ? `https://versabucket.s3.us-east-2.amazonaws.com/images/${product.thumbnail}.jpeg`
                            : ""
                    }
                />
            </ItemCard>
            <WishButton productID={product.id} />
        </Link>
    );
};

const OOSPill = styled(Pill)`
    position: absolute;
    z-index: 9;
    margin: 5px;
    background-color: black;
`;

const ProductImage = styled.img`
    width: 100%;
    filter: ${(props) =>
        props.stock === 0 ? "grayscale(100%)" : "grayscale(0%)"};
`;
// const ImageCard = styled.div`
//     margin-bottom: 10%;
//     display: flex;
//     flex-direction: column;
//     width: 100%;
//     height: 95%;
// `;
// const ProductInfo = styled.div`
//     height: 100%;
//     background-color: white;
//     border-style: solid;
//     border-top: none;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     div {
//         margin: 0 10px;
//     }
//     h6 {
//         font-size: smaller;
//     }
// `;
// const Image = styled.div`
//     @media (max-width: 414px) {
//         border-style: solid;
//         img {
//             width: 100%;
//             position: relative;
//         }
//     }
// `;
export default ProductCard;
