import axios from "axios";
import { CURRENT_URL } from "../services/config";

const API_URL = CURRENT_URL + "icons/";

export async function getAllIcons () {
    return (await axios.get(API_URL + 'all')).data
}

export async function getIcon (filename) {
    return (await axios.get(API_URL + filename)).data
}