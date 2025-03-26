import { get } from "../axiosWrapper";
import { routes } from "../routes";

export const getAllCrons = async () => {
    console.log("getAllCrons F");
    const response = await get(routes?.dashboard?.schedule?.getAllCrons);
    console.log("getAllCrons F R",response  );
    return response;
}