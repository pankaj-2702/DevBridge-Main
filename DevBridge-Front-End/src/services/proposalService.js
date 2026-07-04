import api from "./api";

export const submitProposal = async (projectId, proposalData) => {
  const response = await api.post(
    
    `/proposals/${projectId}`,
    proposalData
  );
//console.log(response)
  return response.data;
};

export const getMyProposals = async ()=>{
    const response = await api.get('/proposals/me');

    return response.data;
}


export const withdrawProposal = async (id)=>{

  const response = await api.delete(`/proposals/${id}`);

    return response.data;
}

export const getProposalById = async (id)=>{

  const response = await api.get(`/proposals/${id}`);

    return response.data;
}


export const editProposal = async (id , fromData)=>{

  const response = await api.patch(`/proposals/${id}`,fromData);

    return response.data;
}

export const getProposals = async (id)=>{

  const response = await api.get(`/projects/${id}/proposals`);

    return response.data;
}

export const acceptProposals = async (id)=>{

  const response = await api.post(`/proposals/${id}/accept`);

    return response.data;
}