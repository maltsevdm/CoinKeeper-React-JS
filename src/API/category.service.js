import axios from "axios";
import { CURRENT_URL } from "../services/config";

const API_URL = CURRENT_URL + "categories/";


export async function getCategoryData (group) {
    return (await axios.get(API_URL + 'all?group=' + group)).data
}

export async function addCategory (name, icon, group, position) {
    await axios.post(API_URL + 'add', {name, icon, group, position})
}
