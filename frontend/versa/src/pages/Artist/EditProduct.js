import React from "react";
import { Title } from "../../components/Reusable/Title";
import InputText from "../../components/ProductFormDetail/InputText";
import InputTextArea from "../../components/ProductFormDetail/InputTextArea";
import Button from "../../components/Reusable/Button";

const EditProduct = () => {
    return (
        <div>
            <Title>Edit Product</Title>
            <Title subHeading>Product Details</Title>
            <InputText name="pName" label="Name:" />
            <InputText name="pPrice" type="number" label="Price: " />
            <InputTextArea name="pDescription" label="Description:" />
            <InputTextArea name="pFit" label="Size and fit:" />
            <InputTextArea name="pMaterials" label="Materials:" />
            <Title subHeading>Colours</Title>
            <Button secondary>Add</Button>
            <Title subHeading>Sizes</Title>
            <Button secondary>Add</Button>
            <Title subHeading>Images</Title>
            <Button secondary>Add</Button>
            <Button cancel>Cancel</Button>
            <Button submit>Submit</Button>
        </div>
    );
};

export default EditProduct;
