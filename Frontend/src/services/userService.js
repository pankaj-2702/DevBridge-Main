import api from './api'

export const getMe = async () => {
    const res = await api.get('/users/me');
    return res.data
}

export const updateMe = async (formdata) => {
    const res = await api.patch('/users/me',formdata);
    return res.data
}

export const uploadPhoto = async (photo) => {

    const formData = new FormData();

    formData.append("profilePhoto", photo);

    const response = await api.post(
        "/users/me/photo",
        formData
    );

    return response.data;
};


export const getUserById = async (id) => {
    //console.log(id)
    const response = await api.get(`/users/${id}`);
    //console.log(response.data.user)
    return response.data;

}