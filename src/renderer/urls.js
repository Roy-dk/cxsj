import Axios from "axios";
Axios.defaults.baseURL = 'http://127.0.0.1:5000/';
export default Axios;

export async function get_camera_info(params) {
   return Axios.post("/get_camera_info", params);
}
export async function get_car_statistics(params) {
   return Axios.post("/get_car_statistics", params);
}
export async function get_state_list(params) {
   return Axios.post("/get_state_list", params);
}