import * as request  from "../utills/httpRequest";
export const LoginAPI = async()=>{
    try {
        const res = await request.get(`/login`,{
           
            
        })
        return res
    } catch (error) {
        console.log(error)
    }
}