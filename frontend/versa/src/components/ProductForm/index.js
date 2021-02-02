import React, { useEffect } from "react";
import { Redirect, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "../Reusable/Input";
import Button from "../Reusable/Button";
import { AddIcon, LineCloseIcon } from "../../images/icons";
//import { deleteImage } from "../axios/deletes";
import { clearFormInputs, setFormInputs } from "../../redux/actions/Forms";
import { setImages } from "../../redux/actions/Images";
import {
    Form,
    Instruction1,
    RowContainer1,
    Instruction2,
    RowContainer2,
    Instruction3,
    RowContainer3,
    ColorDiv,
    SizeDiv,
    Instruction4,
    RowContainer4,
    ImagesDiv,
    ImageUpload,
    ImageList,
    Instruction5,
    RowContainer5,
    Container,
    Error,
} from "./styledComponents";
import { setVisible } from "../../redux/actions/Modals";
import { mapColors } from "./maps/mapColors";
import { mapSizes } from "./maps/mapSizes";
import { mapImages } from "./maps/mapImages";
import { loadPage } from "./functions/loadPage";
import { ImageInput } from "./ImageInput";
import { ColourModal } from "./ColourModal";
import { SizeModal } from "./SizeModal";
import { submitData } from "./submitData";

const ProductForm = (props) => {
    const dispatch = useDispatch();
    const input = useSelector((state) => state.formInputs.product);
    const images = useSelector((state) => state.images.productForm);
    const modalToggle = useSelector(
        (state) => state.modalVisibility.productForm
    );

    const redirect = useSelector((state) => state.redirect.productForm);
    const formError = useSelector((state) => state.formErrors.product.form);
    const params = useParams();

    const id = params.id;
    function clearField() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        dispatch(clearFormInputs("product"));
        dispatch(setImages("productForm", []));
    }

    useEffect(() => {
        loadPage(id, dispatch, props.type);
    }, [dispatch, id, props.type]);

    function setColorLabelAndValue() {
        let colorToAdd = document.querySelector("#colorToAdd").value;
        let colorLabelToAdd = document.querySelector("#colorLabelToAdd").value;
        let temp = {
            label: colorLabelToAdd,
            value: colorToAdd,
        };
        if (!input.colours) {
            dispatch(setFormInputs("product", "colours", [temp]));
        } else if (input.colours.length < 6) {
            dispatch(
                setFormInputs("product", "colours", [...input.colours, temp])
            );
        }
    }
    function setSizeValue() {
        let sizeLabelToAdd = document.querySelector("#sizeLabelToAdd");
        let priceToAdd = document.querySelector("#priceToAdd").value;
        let sizeDropDown = document.querySelector("#sizeDropDown").value;

        let temp = {
            label: sizeDropDown === "N" ? sizeLabelToAdd.value : sizeDropDown,
            price: priceToAdd,
        };
        if (!input.sizes) {
            dispatch(setFormInputs("product", "sizes", [temp]));
        } else if (input.sizes.length < 5) {
            dispatch(setFormInputs("product", "sizes", [...input.sizes, temp]));
        }
    }

    return redirect ? (
        <Redirect to={redirect} />
    ) : (
        <Form>
            <Instruction1>
                Add your products name!
                <br />
                <br />
                Set a base price, you can add an additional cost for different
                sizes later on.
            </Instruction1>
            <RowContainer1>
                <TextField
                    multi={false}
                    tests={[
                        {
                            test: (input) => input.length < 1,
                            error: "Required",
                        },
                        {
                            test: (input) => input.length < 3,
                            error: "Minimum 3 characters.",
                        },
                        {
                            test: (input) => input.length > 45,
                            error: "Title too long",
                        },
                    ]}
                    label="Product Name"
                    required={true}
                    form="product"
                    name="title"
                ></TextField>
                <TextField
                    multi={false}
                    tests={[
                        {
                            test: (input) => isNaN(input),
                            error: "Numerical values only",
                        },
                        {
                            test: (input) => input.length < 1,
                            error: "Required",
                        },
                        {
                            test: (input) => input && +input <= 0,
                            error: "Minimum 0.01",
                        },
                    ]}
                    label="Price"
                    required={true}
                    form="product"
                    name="price"
                ></TextField>
            </RowContainer1>
            <Instruction2>
                Add a description of your product, let your customers know all
                the great things about it! <br />
                <br /> Let them know what materials you use to make your
                product!
            </Instruction2>
            <RowContainer2>
                <TextField
                    multi={true}
                    tests={[
                        {
                            test: (input) => input.length < 10,
                            error: "Minimum 10 characters",
                        },
                    ]}
                    label="Description"
                    required={true}
                    form="product"
                    name="desc"
                ></TextField>
                <TextField
                    multi={true}
                    tests={[
                        {
                            test: (input) => input.length < 10,
                            error: "Minimum 10 characters",
                        },
                    ]}
                    label="Materials"
                    form="product"
                    name="materials"
                ></TextField>
            </RowContainer2>
            <Instruction3>
                Choose the colour and size options that you want to offer for
                your product. <br /> <br /> You can add an additional cost for
                each different size.
            </Instruction3>
            <RowContainer3>
                <ColorDiv
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <h2>Colours</h2>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            width: "75%",
                        }}
                    >
                        {input.colours && mapColors(input.colours)}
                    </div>

                    <ColourModal
                        modalToggle={modalToggle}
                        dispatch={dispatch}
                        setColorLabelAndValue={setColorLabelAndValue}
                    />
                    <Button
                        secondary
                        onClick={() => {
                            dispatch(
                                setVisible("productForm", "colours", true)
                            );
                        }}
                    >
                        Add
                        <AddIcon />
                    </Button>
                </ColorDiv>
                <SizeDiv
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <h2>Sizes</h2>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            width: "75%",
                        }}
                    >
                        {input.sizes &&
                            input.sizes.length > 0 &&
                            mapSizes(input.sizes)}
                    </div>
                    <SizeModal
                        modalToggle={modalToggle}
                        dispatch={dispatch}
                        setSizeValue={setSizeValue}
                    />
                    <Button
                        secondary
                        onClick={() => {
                            dispatch(setVisible("productForm", "sizes", true));
                        }}
                    >
                        Add
                        <AddIcon />
                    </Button>
                </SizeDiv>
            </RowContainer3>
            <Instruction4>
                Add some images of your product to be shown on your product
                page.
                <br /> <br /> Choose one image to be the thumbnail to show up in
                search results. <br />
                <br /> Images will be cropped to be 1:1{" "}
            </Instruction4>
            <RowContainer4>
                <ImagesDiv>
                    <h2>Images</h2>
                    <ImageUpload>{ImageInput(dispatch, images)}</ImageUpload>
                    <ImageList>{mapImages(images)}</ImageList>
                </ImagesDiv>
            </RowContainer4>
            <Instruction5>
                Add your new product to the store! <br />
                <br />
                Or cancel if you've changed your mind
            </Instruction5>
            <RowContainer5>
                <Container>
                    <Button onClick={clearField}>
                        Cancel
                        <LineCloseIcon />
                    </Button>
                    <Button
                        primary
                        onClick={() => {
                            submitData(input, images, dispatch, props, id);
                        }}
                    >
                        Submit
                    </Button>
                </Container>
                {formError && <Error>{formError}</Error>}
            </RowContainer5>
        </Form>
    );
};

export default ProductForm;