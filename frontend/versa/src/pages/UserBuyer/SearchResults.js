import React, { useState, useEffect } from "react";
import Categories from "../../components/Search/Categories";
import Sort from "../../components/Search/Sort";
import Filters from "../../components/Search/Filters";
import ProductCard from "../../components/Search/ProductCard.js";
import { searchProducts, getAllProducts } from "../../axios/gets";
import styled from "styled-components";
import { Magnifying } from "../../images/icons";
import Loading from "../../components/Reusable/Loading";

const SearchResults = () => {
    const [products, setProducts] = useState();
    const [query, setQuery] = useState();
    useEffect(() => {
        const getProducts = async () => {
            const data = await getAllProducts();

            setProducts(data);
        };
        getProducts();
    }, []);
    const search = async () => {
        let data = await searchProducts(query);
        setProducts(data);
    };

    return (
        <SearchPage>
            <SearchBarDiv>
                <MagnifyIcon
                    onClick={() => {
                        if (query) {
                            search();
                        }
                    }}
                >
                    <Magnifying />
                </MagnifyIcon>
                <SearchBar
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && query) {
                            search();
                        }
                    }}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    type="text"
                />
            </SearchBarDiv>
            <div>
                <SearchCriteria>
                    <Categories />
                    <Sort />
                    <Filters />
                </SearchCriteria>
            </div>
            <Products>
                {!products ? (
                    <Loading />
                ) : products.length > 0 ? (
                        products.map((product, index) => <ProductCard key={index} product={product} />)
                ): <NoResultsMessage>No results found</NoResultsMessage>}
            </Products>
        </SearchPage>
    );
};
const NoResultsMessage = styled.h1`
    font-size: 25px;
`;
const MagnifyIcon = styled.div`
    position: absolute;
    margin-top: 20px;
    right: 10px;
`;
const SearchBarDiv = styled.div`
    position: relative;
`;
const SearchBar = styled.input`
    padding: 5px;
    font-size: 26px;
    width: 100%;
    height: 50px;
    margin: 10px 0;
`;

const SearchCriteria = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 10px 0;
`;

const SearchPage = styled.div`
    padding: 4%;
    @media (max-width: 600px) {
        padding: 6%;
        /* display: flex;
    justify-content: center; */
    }
`;

const Products = styled.div`
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fit, 230px);
    grid-gap: 0 3%;
    justify-content: space-around;
    @media (max-width: 600px) {
        margin-top: 10px;
        display: grid;
        grid-template-columns: repeat(2, 4fr);
        grid-gap: 0 3%;
    }
`;
export default SearchResults;