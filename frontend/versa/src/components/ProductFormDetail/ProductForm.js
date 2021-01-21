import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Icons from "../Reusable/Icons";
import { TextField } from "../Reusable/Input";
import Button from "../Reusable/Button";
import Icon from "../Reusable/Icons";
import { ColorInput, Input } from "../../components/Reusable/Input";
import { Modal, ModalTitle } from "../../components/Reusable/Modal";

const ProductForm = (props) => {
    const setDefault = (fieldName) => {
        if (localStorage.getItem(`${fieldName}`)) {
            return localStorage.getItem(`${fieldName}`);
        } else {
            return "";
        }
    };
    const setDefault2 = (arrName) => {
        if (localStorage.getItem(`${arrName}`)) {
            return JSON.parse(localStorage.getItem(`${arrName}`));
        } else {
            return [];
        }
    };

    const [colorModalVisible, setColorModalVisible] = useState(false);
    const { register, errors } = useForm();
    const [colors, setColors] = useState(setDefault2("productColors"));
    const [sizes, setSizes] = useState(setDefault2("productSizes"));
    const [images, setImages] = useState([]);
    const [inputName, setInputName] = useState(setDefault("productName"));
    const [inputPrice, setInputPrice] = useState(setDefault("productPrice"));
    const [inputDesc, setInputDesc] = useState(setDefault("productDesc"));
    const [inputFit, setInputFit] = useState(setDefault("productFit"));
    const [inputMaterials, setInputMaterials] = useState(
        setDefault("productMaterials")
    );
    const [checkDelete, setCheckDelete] = useState(false);

    function clearField() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        setColors([]);
        setSizes([]);
        setImages([]);
        setInputName("");
        setInputPrice("");
        setInputDesc("");
        setInputFit("");
        setInputMaterials("");
        colorPick.current.value = "";
        colorValue.current.value = "#000000";
        sizePrice.current.value = "";
    }

    useEffect(() => {
        localStorage.setItem("productName", inputName);
        localStorage.setItem("productPrice", inputPrice);
        localStorage.setItem("productDesc", inputDesc);
        localStorage.setItem("productFit", inputFit);
        localStorage.setItem("productMaterials", inputMaterials);
        localStorage.setItem("productColors", JSON.stringify(colors));
        localStorage.setItem("productSizes", JSON.stringify(sizes));
    }, [
        inputName,
        inputPrice,
        inputDesc,
        inputFit,
        inputMaterials,
        colors,
        sizes,
    ]);

    const colorValue = useRef();
    const colorPick = useRef();
    const sizeLabel = useRef();
    const sizePrice = useRef();
    const addColor = useRef();
    console.log(colors);
    function setColorLabelAndValue() {
        let colorToAdd = document.querySelector("#colorToAdd").value;
        let colorLabelToAdd = document.querySelector("#colorLabelToAdd").value;
        console.log("colorLabelToAdd", colorLabelToAdd);

        if (colors.length < 6) {
            let temp = {
                label: colorLabelToAdd,
                value: colorToAdd,
            };
            setColors([...colors, temp]);
        }
    }
    function setSizeLabelAndPrice() {
        let temp = {
            label: sizeLabel.current.value,
            price: sizePrice.current.value,
        };
        let appendedSizes = sizes.concat([temp]);
        setSizes(appendedSizes);
    }
    function deleteItem(index, arr) {
        arr.splice(index, 1);
        localStorage.setItem(`product${arr}`, JSON.stringify(arr));
        setCheckDelete(!checkDelete);
    }

    const [checkDelete, setCheckDelete] = useState(false);

    function deleteItem(index, arr) {
        arr.splice(index, 1);
        localStorage.setItem(`product${arr}`, JSON.stringify(arr));
        setCheckDelete(!checkDelete);
    }
    return (
        <Form>
            <h2>Product Details</h2>
            <TextField
                multi={false}
                tests={[
                    {
                        test: (input) => input.length < 1,
                        error: "A name for your product is required",
                    },
                    {
                        test: (input) => input.length < 3,
                        error: "Product name must be longer than 3 letters.",
                    },
                ]}
                label="Product Name"
                ref={register({ required: true, minLength: 2 })}
                value={inputName}
                onChange={(e) => {
                    setInputName(e.target.value);
                }}
            ></TextField>

            <TextField
                multi={false}
                tests={[
                    {
                        test: (input) => isNaN(input),
                        error: "Product price must be numbers only.",
                    },
                    {
                        test: (input) => input.length < 1,
                        error: "Required",
                    },
                    {
                        test: (input) => input && +input <= 0,
                        error: "Product must be greater than $0.",
                    },
                ]}
                label="Price"
                ref={register({
                    required: true,
                    valueAsNumber: true,
                })}
                value={inputPrice}
                onWheel={(e) => {
                    e.preventDefault();
                }}
                onChange={(e) => {
                    setInputPrice(e.target.value);
                }}
            ></TextField>
            <TextField
                multi={true}
                tests={[
                    {
                        test: (input) => input.length < 10,
                        error: "Product description is required.",
                    },
                ]}
                label="Description"
                ref={register({ required: true, minLength: 2 })}
                value={inputDesc}
                onChange={(e) => {
                    setInputDesc(e.target.value);
                }}
            ></TextField>
            <TextField
                multi={true}
                tests={[
                    {
                        test: (input) => input.length < 10,
                        error: "Materials description is required.",
                    },
                ]}
                label="Materials"
                ref={register({ required: true, minLength: 2 })}
                value={inputMaterials}
                onChange={(e) => {
                    setInputMaterials(e.target.value);
                }}
            ></TextField>
            <h2>Colours</h2>
            {colorModalVisible && (
                <Modal width="330px">
                    <ModalTitle>Add A Color Option</ModalTitle>
                    <label htmlFor="colorToAdd">Click To Choose Color</label>
                    <ColorInput id="colorToAdd" />
                    <label>Color Name</label>
                    <Input label="Color Name" id="colorLabelToAdd" />
                    <Button
                        primary
                        onClick={() => {
                            setColorLabelAndValue();
                            setColorModalVisible(false);
                        }}
                    >
                        Add Option
                    </Button>
                </Modal>
            )}
            <Button
                secondary
                onClick={() => {
                    setColorModalVisible(true);
                }}
            >
                Add
                <Icon type="add" />
            </Button>

            <h2>Sizes</h2>
            <Button secondary>
                Add <Icon type="add" />
            </Button>
            {sizes.length > 0 &&
                sizes.map((size, index) => {
                    return (
                        <NewSize>
                            <p>{size.label}</p>

                            <NewSizePrice>$ {size.price}</NewSizePrice>
                            <div onClick={() => deleteItem(index, sizes)}>
                                <Icons lineClose />
                            </div>
                        </NewSize>
                    );
                })}
            <h2>Images</h2>
            <Button secondary>
                Add <Icon type="add" />
            </Button>
            {images.map((image, index) => {
                return (
                    <>
                        <UploadedImage
                            key={index}
                            alt="product"
                            src={image.image}
                        />
                    </>
                );
            })}
            <Container>
                <Button onClick={clearField}>
                    Cancel
                    <Icon type="lineClose" />
                </Button>
                <Button primary type="submit">
                    Submit
                </Button>
            </Container>
            <Error>
                {errors.product_name?.type === "required" &&
                    "Input is required."}
            </Error>
            <Error>
                {errors.product_name?.type === "minLength" &&
                    "Must be at least 2 characters."}
            </Error>
            <Error>
                {errors.product_price?.type === "required" &&
                    "Input is required."}
            </Error>
            <Error>
                {errors.product_description?.type === "required" &&
                    "Input is required."}
            </Error>
            <Error>
                {errors.product_description?.type === "minLength" &&
                    "Must be at least 2 characters."}
            </Error>
            <Error>
                {errors.product_materials?.type === "required" &&
                    "Input is required."}
            </Error>

            <Error>
                {errors.product_materials?.type === "minLength" &&
                    "Must be at least 2 characters."}
            </Error>
        </Form>
    );
};

export default ProductForm;

const Form = styled.form``;
const Container = styled.div`
    display: flex;
`;

const Error = styled.p`
    color: red;
`;
const NewSize = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    background: #c5c3ff;
    margin: 8px;

    p {
        margin-right: 10px;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.05em;
    }
`;

const NewSizePrice = styled.p`
    margin-right: 10px;
`;

const UploadedImage = styled.img`
    width: 200px;
    height: 200px;
`;

const CurrentColour = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    background: #c5c3ff;
    margin: 8px;
    p {
        margin-right: 10px;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.05em;
    }
`;

const ColourPreview = styled.div`
    width: 20px;
    height: 20px;
    margin-right: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.colour};
`;
