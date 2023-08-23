import { toast, ToastContainer } from "react-toastify";

const toastOptions = { position: "bottom-center", hideProgressBar: false, autoClose: 2000, type: 'success' };
// toasts
const customToast = (text = "toast text", status = "success")=>{
    toast(text, {...toastOptions,type: status})
}

export default customToast;
