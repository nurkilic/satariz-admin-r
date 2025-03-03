import axios from "axios";
import {GET_CONTRACTS, GET_SETTINGS_DATA, SETTING_IMAGE_STORE} from "../../paths/index.jsx";
import {store} from "../../../redux/index.tsx";

export const SETTINGS_DATA = async () => {
    const token = store.getState().authReducer.token
    const { data } = await axios.get(GET_SETTINGS_DATA, {
        headers: {
            Authorization: `Bearer ${token}`, // Token buraya ekleniyor
        },
    });
    return data;
};
export const CONTRACT_DATA = async () => {
    const token = store.getState().authReducer.token
    const { data } = await axios.get(GET_CONTRACTS, {
        headers: {
            Authorization: `Bearer ${token}`, // Token buraya ekleniyor
        },
    });
    return data;
};

export const UPDATE_SETTING_IMAGE = async (formData) => {
    const token = store.getState().authReducer.token
    const { data } = await axios.post(SETTING_IMAGE_STORE, formData,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};
