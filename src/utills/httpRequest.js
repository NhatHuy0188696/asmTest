import axios from 'axios';
// search
const request = axios.create({

    baseURL:'https://6407deed2f01352a8a8571c7.mockapi.io/localhost/user',
   
})
export const get = async(path,option={})=>{
    const response = await request.get(path,option);
    return response.data
}
export{
    request,
} 
