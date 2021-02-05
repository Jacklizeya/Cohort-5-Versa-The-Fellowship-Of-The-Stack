import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FieldContainer, Input, Label, TextField } from "../Reusable/Input";
import Button from "../Reusable/Button";
import axios from "axios";
import { Redirect, useParams } from "react-router";
import { setFormErrors } from "../../redux/actions/Errors";
import { setFormInputs } from "../../redux/actions/Forms";
import { getEventByID } from "../../axios/gets";
import {
    ImageList,
    ImagesDiv,
    ImageUpload,
} from "../ProductForm/styledComponents";
import { ImageInput } from "../ProductForm/ImageInput";
import { mapImages } from "../ProductForm/maps/mapImages";
const options = ["Artist showcase", "Meetup", "Exhibition", "Other"];
const statusOptions = ['Active', 'Inactive', 'Pending']
const EventForm = (props) => {
    const params = useParams();
    const id = params.id;
    const formError = useSelector((state) => state.formErrors.event.form);
    const input = useSelector((state) => state.formInputs.event);
    const images = useSelector((state) => state.images.eventForm);
    const redirect = useSelector((state) => state.redirect.eventForm);
    const dispatch = useDispatch();
    useEffect(() => {
        const getUserData = async () => {
            let data = await getEventByID(id);
            dispatch(setFormInputs("event", "name", data.name));
            dispatch(setFormInputs("event", "description", data.description));
            dispatch(setFormInputs("event", "capacity", data.capacity));
            dispatch(setFormInputs("event", "startTime", data.startTime));
            dispatch(setFormInputs("event", "endTime", data.endTime));
            dispatch(setFormInputs("event", "type", data.type));
            dispatch(setFormInputs("event", "location", data.location));
            dispatch(setFormInputs("event", "status", data.status));
            dispatch(setFormInputs("event", "type", data.type));
        };
        if (props.type === "Edit") {
            getUserData();
        }
    }, [dispatch, props.type, id]);

    const submitData = (e) => {
        e.preventDefault();
        const userInfo = {
            name: input.name,
            description: input.description,
            capacity: input.capacity,
            startTime: input.startTime,
            endTime: input.endTime,
            type: input.type,
            location: input.location,
            status: input.status,
        };
        const sendData = async () => {
            if (props.type === "Add") {
                axios.post("/events/create", {
                    data: userInfo,
                });
            } else {
                axios.put(
                    "/events/edit/" + id,
                    {
                        data: userInfo,
                    },
                    { withCredentials: true }
                );
            }
            // window.location.href = "/";
        };
        let error = document.getElementById("error");
        if (!error) {
            sendData();
        } else {
            dispatch(setFormErrors("event", "Please check all input is valid"));
        }
    };

    return redirect ? (
        <Redirect to={redirect} />
    ) : (
        <Form onSubmit={submitData}>
            <Instruction>Hello, what is the name of your event?</Instruction>
            <RowContainer>
                <TextField
                    multi={false}
                    tests={[
                        {
                            test: (input) => input.length < 1,
                            error: "Required",
                        },
                        {
                            test: (input) => input.length < 2,
                            error: "Minimum 2 characters.",
                        },
                    ]}
                    label="Name"
                    // value={inputName}
                    form="event"
                    name="name"></TextField>
            </RowContainer>
            <Instruction>What kind of event is it?</Instruction>
                <RowContainer>
                    <FieldContainer>
                    <Label>Category</Label>
                <select
                    onChange={(e) => {
                        dispatch(setFormInputs('event','type',e.target.value))
                    }}>
                    {options.map((one) => {
                        return <option value={one}>{one}</option>;
                    })}
                </select><br /></FieldContainer>
                {input.type === "Other" && (
                    <TextField
                        multi={false}
                        tests={[
                            {
                                test: (input) => input.length < 1,
                                error: "Required",
                            },
                            {
                                test: (input) => input.length < 2,
                                error: "Minimum 2 characters.",
                            },
                        ]}
                        label="Enter your own"
                        // value={inputName}
                        form="event"
                        name="type"></TextField>
                )}
            </RowContainer>
            <Instruction>What is your event all about?</Instruction>
            <RowContainer>
                <TextField
                    multi={true}
                    tests={[
                        {
                            test: (input) => input.length < 3,
                            error: "Minimum 2 characters",
                        },
                    ]}
                    label="Description"
                    form="event"
                    name="description"></TextField>
            </RowContainer>
            <Instruction>Where will your event be located</Instruction>
            <RowContainer>
                <TextField
                    multi={false}
                    tests={[
                        {
                            test: (input) => input.length < 10,
                            error: "Minimum 10 characters",
                        },
                    ]}
                    label="Location"
                    form="event"
                    name="location"></TextField>
            </RowContainer>
            <Instruction>
                How many people can you accomodate at the event? Leave blank for
                no limit
            </Instruction>
            <RowContainer>
                <TextField
                    multi={false}
                    tests={[
                        {
                            test: (input) => isNaN(input),
                            error: "Enter a numerical value",
                        },
                    ]}
                    label="Capacity"
                    form="event"
                    name="capacity"></TextField>
            </RowContainer>
            <Instruction>
                Choose the date and time that your event will start and end
            </Instruction>
            <RowContainer>
                <FieldContainer>
                    <Label>Start Time</Label>
                    <Input
                        onChange={(e) => {
                            dispatch(
                                setFormInputs(
                                    "event",
                                    "startTime",
                                    e.target.value
                                )
                            );
                        }}
                        type="datetime-local"
                    />
                </FieldContainer>
                <br />
                <FieldContainer>
                    <Label> End Time</Label>
                    <Input
                        onChange={(e) => {
                            dispatch(
                                setFormInputs(
                                    "event",
                                    "endTime",
                                    e.target.value
                                )
                            );
                        }}
                        type="datetime-local"
                    />
                </FieldContainer>
            </RowContainer>
            <Instruction>
                Add some images of your event to be shown on the event page.
                <br /> <br /> Choose one image to be the thumbnail to show up in
                event listings. <br />
                <br /> Images will be cropped to be 1:1{" "}
            </Instruction>
            <RowContainer>
                <ImagesDiv>
                    <h2>Images</h2>
                    <ImageUpload>
                        {ImageInput(dispatch, images, "eventForm")}
                    </ImageUpload>
                    <ImageList>{images && mapImages(images)}</ImageList>
                </ImagesDiv>
                </RowContainer>
                <Instruction>Are you ready to accept registrants or would you
                just like to see who is interested
                </Instruction>
                <RowContainer><FieldContainer>
                    <Label>Status</Label>
                    
                    <select
                    onChange={(e) => {
                        dispatch(setFormInputs('event','type',e.target.value))
                    }}>
                    {statusOptions.map((one) => {
                        return <option value={one}>{one}</option>;
                    })}
                    </select>
                <Label>
                Active: Allow people to see and register for your event
                <br /><br/>
                Inactive: Allow people to see your event and mark that they are interested
                <br /><br />
                Pending: You haven't finalized the details and don't want the event to be visible to others</Label>
                </FieldContainer></RowContainer>
            <Instruction>
                Post your event so people can see your event!
            </Instruction>
            <RowContainer>
                <Container>
                    <Button primary onClick={submitData}>
                        Submit
                    </Button>
                </Container>
                {formError && <Error>{formError}</Error>}
            </RowContainer>
        </Form>
    );
};

export default EventForm;
const Form = styled.form`
    margin-top: 40px;
    grid-template-columns: 30% 65%;
    grid-template-rows: auto;
    display: grid;
    grid-column-gap: 5%;
    /* @media only screen and (min-width: 800px) {
        height: 95%; 
     } */
    @media (max-width: 600px) {
        grid-template-columns: 95%;
    }
`;
const RowContainer = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-column: 2;
    @media (max-width: 600px) {
        grid-column: 1;
    }
`;

const Instruction = styled.div`
    padding: 20px 20px 20px 0;
    grid-column: 1;
    border-bottom: 2px dashed #ccc;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const Error = styled.p`
    color: red;
`;