import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
	return axios.get(baseUrl);
};

const create = (newObject) => {
	return axios.post(baseUrl, newObject);
};

const erase = (id) => {
	return axios.delete(`${baseUrl}/${id}`);
};
const noteService = {
	getAll,
	create,
	erase,
};
export default noteService;
