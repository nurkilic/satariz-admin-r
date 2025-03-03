import axios from "axios";
import {GET_USER_DATA} from "../paths/index.jsx";
import {store} from "../../redux/index.tsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import qs from 'qs'
import Swal from 'sweetalert2'

export const USER_DATA = async () => {
    const token = store.getState().authReducer.token
    const {data} = await axios.get(GET_USER_DATA, {
        headers: {
            Authorization: `Bearer ${token}`, // Token buraya ekleniyor
        },
    });
    return data;
}

export const apiRequest = async ({url, method = "GET", data = null}) => {
    const token = store.getState().authReducer.token
    const headers = token
        ? {
            Authorization: `Bearer ${token}`,
        }
        : {};
    if (method === "GET" && data) {
        // Data'yı URL parametrelerine dönüştür
        const queryString = qs.stringify(data, {addQueryPrefix: true}); // '?' ile başlatır
        url = `${url}${queryString}`; // URL'yi query string ile birleştir
    }

    const response = await axios({
        url,
        method,
        data: method === "GET" ? undefined : data, // GET isteği için data'yı göndermiyoruz
        headers,
    });

    console.log(response.data.message)

    if (response.data.status === 'success') {
        if (response.data.message) {
            Swal.fire({
                icon: "success",
                title: "Başarılı...",
                text: response.data.message,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500

            });
        }
        return response.data;
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Bir sorun oluştu! Hata kodu: " + response.status,
        });
    }
};

export const useDynamicQuery = (key, options) =>
    useQuery(key, () => apiRequest(options));

export const useDynamicMutation = () => {
    return useMutation({
        mutationFn: ({url, method = "POST", data}) => {
            return apiRequest({url, method, data})
        },
    })

};
