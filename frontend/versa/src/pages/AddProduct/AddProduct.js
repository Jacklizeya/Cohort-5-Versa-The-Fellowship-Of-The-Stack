<<<<<<< HEAD
import React, { useRef, useState } from 'react'
import styled from "styled-components"
import { useForm } from 'react-hook-form'
import { DeleteIcon } from "../../images/icons";
import imageTest from "../../images/imageTest.png"
import axios from 'axios';
=======
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { DeleteIcon } from "../../images/icons";
import imageTest from "../../images/imageTest.png";
>>>>>>> 11a4a294915598d47229c867a9692400666d1c6a

const AddProduct = () => {
    const { register, handleSubmit, errors } = useForm();
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [images, setImages] = useState([]);

    const colorValue = useRef();
    const colorPick = useRef();
    const sizeLabel = useRef();
    const sizePrice = useRef();

    function onSubmit(data) {
<<<<<<< HEAD
        const productInfo = {
                    title: data.product_name,
                    price: data.product_price,
                    description: data.product_description,
                    colours: colors,
                    artist_id: '1',
                    sizes: sizes,
                    size_and_fit: data.product_size_fit,
                    materials: data.product_materials
        }
        const sendData = async () => {
            const response = await axios.post('http://localhost:5000/products/create', {
                data: productInfo
            })
        }
        sendData()
    }
    function setColorLabelAndValue() {
        if (colors.length < 3) {
            let temp = {
                label: colorPick.current.value,
                value: colorValue.current.value
            }
            let appendedColors = colors.concat([temp])
            setColors(appendedColors)
        }
=======
        console.log(data);
    }
    function setColorLabelAndValue() {
        let temp = {
            label: colorPick.current.value,
            value: colorValue.current.value,
        };
        let appendedColors = colors.concat([temp]);
        setColors(appendedColors);
>>>>>>> 11a4a294915598d47229c867a9692400666d1c6a
    }
    function setSizeLabelAndPrice() {
        let temp = {
            label: sizeLabel.current.value,
            price: sizePrice.current.value,
        };
        let appendedSizes = sizes.concat([temp]);
        setSizes(appendedSizes);
    }
    function imageHandler(e) {
        setImages([...images, e.target.files[0]]);
    }

    function removeImg(e) {
        console.log({ images });
    }
    return (
        <AddProductContainer>
<<<<<<< HEAD
        <FormContainer>
            <Title>Create a new product</Title>
            <CreateProductForm onSubmit={handleSubmit(onSubmit)}>
            <section>
            <StyledFieldSet>
            <h2>Product Details</h2>
            <label htmlFor="product_name">Name</label>
                <input name="product_name" type="text" ref={register({required: true, minLength: 2})}/>
                {errors.product_name?.type === "required" && "Input is required."}
                {errors.product_name?.type === "minLength" && "Must be at least 2 characters."}
                <br/>
                <label htmlFor="product_price">Price $</label>
                <input name="product_price" type="number" step="0.01" ref={register({required: true, valueAsNumber: true})}/>
                {errors.product_price?.type === "required" && "Input is required."}
                <br/>
                <label htmlFor="product_description">Description</label>
                <textarea name="product_description" type="text" ref={register({required: true, minLength: 2})} />
                {errors.product_description?.type === "required" && "Input is required."}
                {errors.product_description?.type === "minLength" && "Must be at least 2 characters."}
                <br/>
                <label htmlFor="product_sizes_fit">Sizes and fit</label>
                <textarea name="product_sizes_fit" type="text" ref={register}/>
                <br />
                <label htmlFor="product_materials">Materials</label>
                <textarea name="product_materials" type="text" ref={register({required: true, minLength: 2})}/>
                {errors.product_materials?.type === "required" && <error>Input is required.</error>}
                {errors.product_materials?.type === "minLength" && "Must be at least 2 characters."}
                <br/>
            </StyledFieldSet>
            </section>
                <section>
                <StyledFieldSet>
                <h2>Colors</h2>
                <label htmlFor="product_color_label">Color Name</label>
                    <input name="product_color_label" type="text" ref={register} ref={colorPick}/>
                    <label htmlFor="product_color">Color</label>
                    <input name="product_color" type="color" ref={register} ref={colorValue}/>
                    <NewColourContainer>
                    {colors.length > 0 ? colors.map(label=>{
                        return (
                            <CurrentColour>
                            {label.label}{label.value}
                            <ColourPreview colour={label.value}/>
                            <Delete src={DeleteIcon} alt="delete-icon"/> 
                            </CurrentColour>)
                    }):""}
                    </NewColourContainer>
                    
                    <button type="button" onClick={setColorLabelAndValue}>Add</button>
                </StyledFieldSet>   
                <StyledFieldSet>
                <h2>Sizes</h2>
                <label htmlFor="product_size">Size</label>
                    <select name="product_size" ref={register} ref={sizeLabel}>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="x-large">X-Large</option>
                    </select>
                    <label htmlFor="product_size_price">Additional Price</label>
                    <input name="product_size_price" defaultValue="0" step="0.01" type="number" ref={register({min: 0, valueAsNumber: true})} ref={sizePrice}/>
                    {errors.product_size_price?.type === "min" && "Value must be greater than "}
                    <NewSizeContainer>
                    {sizes.length > 0 ? sizes.map(size=>{
                        return (
                            <NewSize>
                            {size.label}{size.price}
                            <NewSizePrice />
                            <Delete src={DeleteIcon} alt="delete-icon"/> 
                            </NewSize>
                        )
                    }): ""}</NewSizeContainer>
                    
                    <button type="button" onClick={setSizeLabelAndPrice}>Add</button>
                </StyledFieldSet>   
                </section>  
                    <section>
                    <StyledFieldSet>
                    <h2>Images</h2>
                    <ChooseImage>
                    <label htmlFor="product_image">Upload Image</label>
                    <input name="product_image" type="file" ref={register}
                        onChange={imageHandler} accept="image/*"
                        />
                    <PreviewImg src={image} />
                    </ChooseImage>
                    
                    <ImageCardsContainer>
                    <ImageCard>
                    <UploadedImage src={imageTest} />
                    <File><ImgFileName>1234.jpg</ImgFileName><Delete src={DeleteIcon}/> </File>
                    <ChooseAsThumbnail>
                    <input type="radio" id="assdd" name="ChooseThumbnail" value="{FileName}"/>
                    <label for="{FileName}">Choose as thumbnail</label>
                    </ChooseAsThumbnail>
                    </ImageCard>
                    </ImageCardsContainer>
                    <button>Add</button>
                    </StyledFieldSet>
                    </section>
                    <SubmitButton type="submit">Submit</SubmitButton>
                </CreateProductForm>
            </FormContainer>
        </AddProductContainer>
    )
}

export default AddProduct;


const AddProductContainer = styled.div`
padding: 100px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;


@media (max-width: 768px) {
    padding: 20px;
    
}
`;


const FormContainer = styled.div`
align-items: flex-start;
`;

const Title = styled.h1`
font-size:  48px;
@media (max-width: 768px) {
    font-size: 30px;
}
=======
            <Title>Create a new product</Title>
            <CreateProductForm onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <StyledFieldSet>
                        <h2>Product Details</h2>
                        <label htmlFor="product-name">Name:</label>
                        <input name="product-name" type="text" ref={register} />
                        <label htmlFor="product-price">Price:</label>
                        <input
                            name="product-price"
                            type="number"
                            ref={register}
                        />
                        <label htmlFor="product-description">
                            Description:
                        </label>
                        <input
                            name="product-description"
                            type="text"
                            ref={register}
                        />
                        <label htmlFor="product-sizes&fit">
                            Sizes and fit:
                        </label>
                        <input
                            name="product-sizes&fit"
                            type="text"
                            ref={register}
                        />
                        <label htmlFor="product-materials">Materials:</label>
                        <input
                            name="product-materials"
                            type="text"
                            ref={register}
                        />
                    </StyledFieldSet>
                </section>
                <section>
                    <StyledFieldSet>
                        <h2>Colors</h2>
                        <label htmlFor="product-color-label">
                            Color Label:
                        </label>
                        <input
                            name="product-color-label"
                            type="text"
                            ref={(register, colorPick)}
                        />
                        <label htmlFor="product-color">Color:</label>
                        <input
                            name="product-color"
                            type="color"
                            ref={(register, colorValue)}
                        />
                        <NewColourContainer>
                            {colors.length > 0
                                ? colors.map((label) => {
                                      return (
                                          <CurrentColour>
                                              {label.label}
                                              {label.value}
                                              <ColourPreview />
                                              <Delete src={DeleteIcon} />
                                          </CurrentColour>
                                      );
                                  })
                                : ""}
                        </NewColourContainer>

                        <button type="button" onClick={setColorLabelAndValue}>
                            Add
                        </button>
                    </StyledFieldSet>
                    <StyledFieldSet>
                        <h2>Sizes</h2>
                        <label htmlFor="product-size">Size:</label>
                        <select name="product-size" ref={(register, sizeLabel)}>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="x-large">X-Large</option>
                        </select>
                        <label htmlFor="product-size-price">
                            New Size Price:
                        </label>
                        <input
                            name="product-size-price"
                            defaultValue="0"
                            type="number"
                            ref={(register, sizePrice)}
                        />
                        <NewSizeContainer>
                            {sizes.length > 0
                                ? sizes.map((size) => {
                                      return (
                                          <NewSize>
                                              {size.label}
                                              {size.price}
                                              <NewSizePrice />
                                              <Delete src={DeleteIcon} />
                                          </NewSize>
                                      );
                                  })
                                : ""}
                        </NewSizeContainer>

                        <button type="button" onClick={setSizeLabelAndPrice}>
                            Add
                        </button>
                    </StyledFieldSet>
                </section>
                <section>
                    <StyledFieldSet>
                        <h2>Images</h2>
                        <label htmlFor="product-image">Product Image:</label>
                        <input
                            name="product-image"
                            type="file"
                            ref={register}
                            onChange={(e) => {
                                imageHandler(e);
                            }}
                            accept="image/*"
                        />
                        {images.map((image) => (
                            <img src={image} width="300px" height="160px" />
                        ))}

                        <button onClick={removeImg()}>Delete Image</button>
                        {/* <button onClick={updateImg}>Update Image</button> */}
                        <ImageCardsContainer>
                            <ImageCard>
                                <UploadedImage src={imageTest} />
                                <File>
                                    <ImgFileName>1234.jpg</ImgFileName>
                                    <Delete src={DeleteIcon} />{" "}
                                </File>
                                <ChooseAsThumbnail>
                                    <input
                                        type="radio"
                                        id="assdd"
                                        name="ChooseThumbnail"
                                        value="{FileName}"
                                    />
                                    <label for="{FileName}">
                                        Choose as thumbnail
                                    </label>
                                </ChooseAsThumbnail>
                            </ImageCard>
                        </ImageCardsContainer>
                        <button>Add</button>
                    </StyledFieldSet>
                </section>
                <SubmitButton type="submit">Submit</SubmitButton>
            </CreateProductForm>
        </AddProductContainer>
    );
};

export default AddProduct;

const AddProductContainer = styled.div``;
>>>>>>> 11a4a294915598d47229c867a9692400666d1c6a

const Title = styled.h1`
    font-size: 48px;
`;

const CreateProductForm = styled.form`
<<<<<<< HEAD
input {
    
    font: inherit;
    border:none;
    height: 30px;
    min-width: 650px;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    
}

label{
    font-size: 18px;
    margin-bottom: 10px;
    }


textarea {
    font: inherit;
    margin-top: 10px;
    border:none;
    height: 90px;
    min-width: 650px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}



@media (max-width: 768px) {
    margin: 15px 0;
}
`;

const StyledFieldSet = styled.section`
background-color: inherit;
border: none;
margin: 30px 0;
h2{
    margin-bottom: 20px;
    font-size: 24px;
}
button{
    background: #FFB649;
    border-radius: 50px;
    padding: 5px 10px;
=======
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 100px;
    margin: 30px 0;
    input {
        label {
            font-size: 18px;
        }
    }
`;

const StyledFieldSet = styled.section`
    background-color: inherit;
>>>>>>> 11a4a294915598d47229c867a9692400666d1c6a
    border: none;
    margin: 30px 0;
    h2 {
        margin-bottom: 10px;
        font-size: 24px;
    }
    button {
        background: #ffb649;
        border-radius: 50px;
        padding: 5px 10px;
        border: none;
    }

<<<<<<< HEAD



@media (max-width: 768px) {
    h2{
        font-size: 20px;
    }
}
=======
    input {
        padding: 5px;
        margin-bottom: 10px;
        border: none;
    }
>>>>>>> 11a4a294915598d47229c867a9692400666d1c6a
`;

const error = styled.p`
font: inherit;
color: red;
`;

const PreviewImg = styled.img`
width: 200px;
    height: 250px;
`;

const SubmitButton = styled.button`
    padding: 10px 40px;
    background: #038d82;
    border-radius: 50px;
    border: none;
    color: white;
`;

const NewColourContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
`;

const CurrentColour = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;
    background-color: #C5C3FF;
`;

const ColourPreview = styled.div`
    border-radius: 100;
    background-color: #c5c3ff;
`;

const Delete = styled.svg`
    width: 16px;
    color: #444444;
`;

const NewSizeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
`;

const NewSize = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    background: #c5c3ff;
`;

const NewSizePrice = styled.p``;

const ChooseImage = styled.div`
display: flex;
flex-direction: column;
`;

const ImageCardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    
`;

const ImageCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #c5c3ff;
    margin: 10px 0px;
`;

const UploadedImage = styled.img`
    width: 200px;
    height: 250px;
`;

const ImgFileName = styled.p`
    font-size: 18px;
`;

const File = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
`;

const ChooseAsThumbnail = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
`;