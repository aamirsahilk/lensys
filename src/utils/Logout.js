import { useDispatch, useSelector } from 'react-redux'
import { updateUserData } from '@/store/features/userdata/UserDataSlice'

export const Logout = ()=>{
    const dispatch = useDispatch();
    localStorage.removeItem('token');
    dispatch(updateUserData({loggedin:false}));
    console.log("logout");
}