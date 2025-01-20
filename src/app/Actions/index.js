import { clearUserDetails, setUserDetails } from "@/store/UserSlice"
import { useDispatch } from "react-redux"


export async function getUserDetails(id){
    const dipatch = useDispatch()
    const response = await fetch(`api/user/getUserDetails/${id}`)
    const data = await response.json()
    console.log("data fetched is : ",data.user)
    dipatch(setUserDetails(data.user))
    return data.user
  }

 
  export async function updateUserDetails(formData,dispatch) {
    console.log("Formdata is ",formData)
    try {
      const response = await fetch(`/api/user/updateUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log('data fetched is:', data);
  
      if(data.status==true){
        dispatch(setUserDetails(data.user));
      }
      if(data.status==false){
        dispatch(clearUserDetails())
      }
     
      return data;
    } catch (error) {
      console.error('Error updating user details:', error);
      throw error;
    }
  }
  