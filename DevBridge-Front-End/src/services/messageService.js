

import api from "./api";

export const getMessages = async (contractId, cursor = null) => {

    let url = `/contracts/${contractId}/messages`;

    if (cursor) {
        url += `?cursor=${cursor}`;
    }

    const response = await api.get(url);

    return response.data;
};

export const sendMessage = async (contractId, message) => {

    const response = await api.post(
        `/messages/${contractId}`,
        { message }
    );

    return response.data;
};