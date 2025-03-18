import axios from 'axios';

const apiPost = import.meta.env.VITE_ENDPOINT_POST + import.meta.env.VITE_CODE_AZURE_FUNCTION_POST;
const apiGet  = import.meta.env.VITE_ENDPOINT_GET + import.meta.env.VITE_CODE_AZURE_FUNCTION_GET;
const apiPutSignedFileLink = import.meta.env.VITE_ENDPOINT_PUT_SIGNED_FILE_LINK;
const apiCodePutSignedFileLink = import.meta.env.VITE_CODE_AZURE_FUNCTION_PUT_SIGNED_FILE_LINK;
const apiDelete = import.meta.env.VITE_ENDPOINT_DELETE;
const apiCodeDelete = import.meta.env.VITE_CODE_AZURE_FUNCTION_DELETE;

export const postAnamneseForm = async (anamneseForm) => {
  try {
    const response = await axios.post(apiPost, anamneseForm);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAnamneseForms = async () => {
  try {
    const response = await axios.get(apiGet);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAnamneseFormById = async (id) => {
  try {
    const response = await axios.get(apiGet + `&id=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAnamneseFormByName = async (name) => {
  try {
    const response = await axios.get(apiGet + `&nome=${name}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const putAddSignedFileLink = async (id, anamneseForm) => {
  try {
    const response = await axios.put(apiPutSignedFileLink + `/${id}` + apiCodePutSignedFileLink, anamneseForm);
    
    if (response.status != 200) {
      throw error('Falha ao adicionar link do documento assinado');
    } else {
      return response.data;
    }    
  } catch (error) {
    console.error(error);
  }
};

export const deleteAnamneseFormById = async (id) => {
  try {
    const response = await axios.delete(apiDelete + `/${id}` + apiCodeDelete);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default { postAnamneseForm, getAnamneseForms, getAnamneseFormById, getAnamneseFormByName };

