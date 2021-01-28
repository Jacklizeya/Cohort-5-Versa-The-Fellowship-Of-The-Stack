import { getProductByID } from "../../axios/gets";
export const login = (user) => {
    return async (dispatch) => {
        dispatch({
            type: "LOGIN",
            paylod: user,
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