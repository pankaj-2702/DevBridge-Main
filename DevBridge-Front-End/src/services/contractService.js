import api from "./api";

export const getAllContracts = async () => {

    const response = await api.get("/contracts");

    return response.data;

};

export const getContractById = async (id) => {

    const response = await api.get(`/contracts/${id}`);

    return response.data;

};

export const completeContract = async (id) => {

    const response = await api.post(`/contracts/${id}/complete`);

    return response.data;

};