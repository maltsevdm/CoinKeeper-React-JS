import axios from "axios";
import { CURRENT_URL } from "../services/config";

const API_URL = CURRENT_URL + "transactions/";

export async function getGeneralData () {
    return (await axios.get(CURRENT_URL + 'general_data')).data
}

export async function sendTransaction (group, category_from, category_to, amount, date) {
    return (await axios.post(API_URL + 'add', 
        {group, category_from, category_to, amount, date}
    )).data
}