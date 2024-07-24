import { useState } from "react";
import axios from "axios";

const signup = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([]) // array of errors

    const onSubmit = async(event) =>{
        event.preventDefault();

        try{
            await axios.post('/api/users/signup', {
                email,
                password
            })
        } catch(err){
            console.log("errors: ", err)
            setErrors(err.response.data)
        }
    }

    return (
        <form className="border-gray-400 border-2 p-8 rounded-[2.5rem] m-3 w-fit mx-auto mt-[8rem]" onSubmit={(e)=>onSubmit(e)}>
            <h1 className="font-bold text-lg ml-2">Register</h1>
            <div className="form-group m-3">
                <label>Email</label>
                <input value={email} placeholder="Email" className="form-control block text-sm p-2 mt-2 border-black border-[1px] rounded mb-2" onChange={(e)=>setEmail(e.target.value)}/>
                <label>Password</label>
                <input placeholder="Password" value={password} className="text-sm p-2 block mt-2 border-black border-[1px] rounded" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button className="bg-black text-white p-2 text-sm border-white border-[1px] rounded ml-3 hover:bg-gray-300 hover:text-black duration-300"  type="submit">Sign up</button>
            <div className="bg-red-300 border-red-600 p-4 text-red-700 rounded-md m-2 mt-3">
                <h1 className="font-bold">Ooops...doopsy..</h1>
                {errors.map((err)=> <li key={err.message}>{err.message}</li>)}</div>
        </form>
    )

}

export default signup;