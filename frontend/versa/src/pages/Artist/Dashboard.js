import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllProducts } from "../../axios/gets";
import { getImagesByPID } from "../../axios/gets";
import { Link } from "react-router-dom";
import Button from "../../components/Reusable/Button";
import theme from "../../components/Reusable/Colors";
import { AddIcon, EditIcon, DeleteIcon } from "../../images/icons";
import axios from "axios";
import Loading from "../../components/Reusable/Loading";

const Dashboard = (currentProduct) => {
    const [results, setResults] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const getProducts = async () => {
            let data = await getAllProducts();
            setResults(data);
        };
        getProducts();
    }, []);
    console.log(results);
    const updateStatus = async (result, status) => {
        result.status = status;
        await axios.put("/products/edit/" + result.id, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            data: result,
        });
        return status;
    };

    return (
        <div style={{ padding: "2%" }}>
            <Link to="/account">
                <Button secondary>
                    Back To Dashboard
                    <AddIcon stroke={theme.primary} />
                </Button>
            </Link>
            <Link to="/products/create">
                <Button secondary>
                    Create a new product
                    <AddIcon stroke={theme.primary} />
                </Button>
            </Link>
            <table style={{ width: "100%" }}>
                <tr>
                    <select onChange={(e) => {}}>
                        <option>Active</option>
                        <option>Backorder</option>
                        <option>Discontinue</option>
                    </select>
                </tr>

                <tr>
                    <input type="checkbox" />
                    <th></th>
                    <th>title</th>
                    <th>status</th>
                    <th>inventory</th>
                    <th>Edit</th>
                    <th>delete</th>
                </tr>
                {results ? (
                    results.map((result, index) => {
                        return (
                            <tr style={{ padding: "10%" }}>
                                <input
                                    id={result.title + index}
                                    type="checkbox"
                                    onChange={(e) => {
                                        results.status = e.target.value;
                                    }}
                                />
                                <td style={{ width: "50px", height: "50px" }}>
                                    <img
                                        src={
                                            "https://versabucket.s3.us-east-2.amazonaws.com/images/" +
                                            result.thumbnail +
                                            ".jpeg"
                                        }
                                        style={{
                                            width: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </td>
                                <td>{result.title}</td>
                                <td>
                                    {result.status}
                                    <select
                                        // value={status}
                                        onClick={(e) => {
                                            const newStatus = updateStatus(
                                                result,
                                                e.target.value
                                            );
                                            setStatus(newStatus);
                                        }}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Backorder">
                                            Backorder
                                        </option>
                                        <option value="Discontinue">
                                            Discontinue
                                        </option>
                                    </select>
                                </td>
                                <td>{Math.floor(Math.random() * 10)}</td>
                                <td>
                                    <Link to={"/products/edit/" + result.id}>
                                        <EditIcon stroke={theme.primary} />
                                    </Link>
                                    {/* <Button secondary>
                                            Edit
                                            <AddIcon stroke={colors.primary} />
                                        </Button>
                                    </Link> */}
                                </td>
                                <td>
                                    {" "}
                                    <DeleteIcon stroke={theme.primary} />
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <td>Loading...</td>
                )}
            </table>
        </div>
    );
};

export default Dashboard;
