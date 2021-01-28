import { getProductByID } from "../axios/gets";
export const loginAction = (user) => {
    return async (dispatch) => {
        console.log('action', user)
        dispatch({
            type: "LOGIN",
            payload: user,
        });
    };
};

export const fetchProduct = (id) => {
    return async (dispatch, getState) => {
        const data = getProductByID(id);

        dispatch({
            type: "FETCH_PRODUCT",
            payload: data,
        });
    };
};
export const setSelectedProduct = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: "SELECT_PRODUCT",
            payload: id,
        });
    };
};

export const setPage = (page) => {
    return (dispatch) => {
        dispatch({
            type: "SET_PAGE",
            payload: page,
        });
    };
};
