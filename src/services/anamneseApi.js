import axios from 'axios';

const anamneseApiPost = process.env.AZURE_FUNCTION_ANAMNESE_API_POST;
const anamneseApiGet  = process.env.AZURE_FUNCTION_ANAMNESE_API_GET;;

export const postAnamneseForm = async (anamneseForm) => {
  try {
    const response = await axios.post(anamneseApiPost, anamneseForm);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAnamneseForms = async () => {
  try {
    const response = await axios.get(anamneseApiGet);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAnamneseFormById = async (id) => {
  try {
    const response = await axios.get(anamneseApiGet + `&id=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAnamneseFormByName = async (name) => {
  try {
    const response = await axios.get(anamneseApiGet + `&nome=${name}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default { postAnamneseForm, getAnamneseForms, getAnamneseFormById, getAnamneseFormByName };

