import _ from "lodash";
const initState = {
    cart: {},
    cartUpdate: {},
    modalVisibility: {
        productForm: { sizes: false, colours: false },
    },
    productChoices: { image: 0, colour: 0, size: 0 },
    formErrors: {
        account: {},
        product: {},
        login: {},
        event: {},
        cart: {},
    },
    formInputs: {
        account: {},
        product: {},
        login: {},
        event: {},
        cart: { quantity: 0 },
    },
    user: "",
    productData: {},
    images: {
        productForm: [],
        productPage: [],
        searchPage: [],
        eventForm: [],
        eventPage: [],
    },
    selectedProduct: null,
    redirect: { productForm: "", eventForm: "" },
};

const productReducer = (state = initState, action) => {
    console.log('state at top of product reducer',state)
    let newState = _.cloneDeep(state);
    switch (action.type) {
        case "UPDATE_CART":
            console.log('cart is updated')
            newState.cart = _.cloneDeep(newState.cartUpdate)
            return newState
        case "SET_CART_INPUT":
            console.log('set_cart_input')
            const cartItem = action.payload.cartItem
            newState.cart = state.cart
            if (newState.cartUpdate[cartItem.productID]) {
                if (
                    newState.cartUpdate[cartItem.productID][
                        cartItem.colour
                    ]
                ) {
                    
                        newState.cartUpdate[cartItem.productID][
                            cartItem.colour
                        ][cartItem.size] = +action.payload.newQuantity;
                    
                } else {
                    newState.cartUpdate[cartItem.productID][
                        cartItem.colour
                    ] = { [cartItem.size]: +action.payload.newQuantity };
                }
            } else {
                newState.cartUpdate[cartItem.productID] = {
                    [cartItem.colour]: {
                        [cartItem.size]: +action.payload.newQuantity,
                    },
                };
            }
            console.log('newState cartUpdate reducer', newState)
            console.log('old cart === new cart')
            return newState;
        case "REMOVE_FROM_CART":
            console.log("remove from cart");
            delete newState.cart[action.payload.cartProduct][
                action.payload.colour
            ][action.payload.size];
            return newState;
        case "ADD_TO_CART":
            console.log('add_to_cart')
            const { cartProduct, colour, size, quantity } = action.payload;
            if (newState.cart[cartProduct]) {
                if (newState.cart[cartProduct][colour]) {
                    if (newState.cart[cartProduct][colour][size]) {
                        newState.cart[cartProduct][colour][size] += quantity;
                    } else {
                        newState.cart[cartProduct][colour][size] = quantity;
                    }
                } else {
                    newState.cart[cartProduct][colour] = { [size]: quantity };
                }
            } else {
                newState.cart[cartProduct] = { [colour]: { [size]: quantity } };
            }
            console.log('add to cart newState',newState);
            return newState;
        case "MODIFY_CART":
            
            console.log("modifying cart",action.payload);
            const { mCartProduct, mColour, mSize, mQuantity } = action.payload;

            newState.cart[mCartProduct][mColour][mSize] = Math.round(mQuantity);
            return newState;
        case "SET_MODAL_VISIBLE":
            let { modalPage, modalName, visible } = action.payload;
            newState.modalVisibility[modalPage][modalName] = visible;
            return newState;
        case "PRODUCT_SET_CHOICES":
            let { choiceKey, choiceValue } = action.payload;
            newState.productChoices[choiceKey] = choiceValue;
            return newState;
        case "SET_IMAGES":
            let { page, images } = action.payload;
            newState.images[page] = images;
            return newState;
        case "SET_INPUT_ERRORS":
            let { form, textField, value } = action.payload;
            newState.formErrors[form][textField] = value;
            return newState;
        case "SET_FORM_ERRORS":
            let { form: formName, value: errorValue } = action.payload;
            if (newState.formErrors[formName]) {
                newState.formErrors[formName].form = errorValue;
            } else {
                newState.formErrors[formName] = { form: errorValue };
            }
            return newState;
        case "FORM_CLEAR_INPUTS":
            const formToClear = action.payload;
            newState.formInputs[formToClear] = {};
            return newState;
        case "FORM_SET_INPUTS":
            let {
                form: inputFormName,
                key: inputFormKey,
                value: inputFormValue,
            } = action.payload;

            newState.formInputs[inputFormName][inputFormKey] = inputFormValue;

            return newState;
        case "LOGIN_SET_EMAIL":
            newState.loginEmail = action.payload;
            return newState;
        case "LOGIN_SET_PASSWORD":
            newState.loginPassword = action.payload;
            return newState;
        case "LOGIN":
            newState.user = action.payload;
            return newState;
        case "FETCH_PRODUCT":
            newState.productData = action.payload;
            return newState;
        case "SELECT_PRODUCT":
            console.log('selecting product reducer', action.payload)
            newState.selectedProduct = action.payload;
            return newState;
        case "SET_REDIRECT":
            let { redirectPage, redirectValue } = action.payload;
            newState.redirect[redirectPage] = redirectValue;
            return newState;
        default:
            return newState;
    }
};

export default productReducer;
