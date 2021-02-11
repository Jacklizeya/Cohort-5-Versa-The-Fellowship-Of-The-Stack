import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Button from "../../../components/Reusable/Button";
import { Container } from "../../../components/ProductForm/styledComponents";

const EditStockTable = ({ item, setter }) => {
    const [stock, setStock] = useState([]);
    const { id } = useParams();

    // const tempIncoming = {
    //     product_id: id,
    //     color: tempColour[0].label,
    //     size: tempSize[0].label,
    //     quantity: 1,
    // }
    function mapColorsAndSizes(stock) {
        console.log(stock);
        console.log(item);
        let result = [];
        for (let color of item.colours) {
            for (let size of item.sizes) {
                let temp = {
                    id: id,
                    color: color.label,
                    size: size.label,
                    quantity: 0,
                };
                for (let el of stock) {
                    if (el.color === color.label && el.size === size.label) {
                        temp.quantity = el.quantity;
                    }
                }
                result.push(temp);
            }
        }
        // setter(result);
        setStock(result);
    }

    //function to get quant and map to each row
    useEffect(() => {
        const getProductStock = async () => {
            const res = await axios.get("/stock/get/" + id);
            setStock(res.data);
            console.log(res);
        };
        getProductStock();
        console.log("1st useefft");
        return () => {
            setStock([]);
        };
    }, []);

    useEffect(() => {
        console.log("2nd useeffect");
        if (item.length !== 0 && stock.length > 0) {
            setTimeout(() => {
                
                mapColorsAndSizes(stock);
            }, 1000)
        }
    }, [item,stock.length]);


    function mapTable(arr) {
        if (arr.length > 0) {
            return arr.map((unit) => {
                return (
                    <tr>
                        <td>{unit.color}</td>
                        <td>{unit.size}</td>

                        <td>
                            <input
                                type="number"
                                value={unit.quantity}
                                onChange={(e) => {
                                    unit.quantity = e.target.value;
                                    setStock([...stock]);
                                    setter(stock);
                                }}
                            />
                        </td>
                    </tr>
                );
            });
        } else {
            return <tr />;
        }
    }

    return (
        <div>
            <h2>Stock Levels</h2>
            <TableStyle>
                <thead>
                    <th>Color </th>
                    <th>Size </th>
                    <th>Quantity </th>
                </thead>
                {mapTable(stock)}
            </TableStyle>
            <Container>
                <Button
                    secondary
                    onClick={() => {
                        axios.put("/stock/update", {
                            id,
                            stock,
                        });
                    }}>
                    Update Stock Levels
                </Button>
            </Container>
        </div>
    );
};
const TableStyle = styled.table`
    width:100%;
    text-align: left;
    padding: 1%;
    margin-top: 10%;
    margin-bottom: 10%;
    width: 100%;
    /* border: 1px solid black; */
    border-collapse: collapse;
    tr:nth-child(odd) {
        background: #6495ed55;
    }
    th {
        padding: 1%;
        border-bottom: #6495ed55 solid 1px;
    }
    td {
        padding: 1%;
        border-collapse: collapse;
    }
    input { width: 100%; }
`;
export default EditStockTable;
