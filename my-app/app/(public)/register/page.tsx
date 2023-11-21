'use client'
import {useForm} from "react-hook-form"
import { useUserService } from "@/_services/useUserService"


export default function Page(){
    const userService = useUserService()
    const {register, handleSubmit, formState} = useForm()
    const {errors} = formState

    async function onSubmit(user: any){
        await userService.register(user)
    }
    
    return (
        <div>
            <h3>Register</h3>
            <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-input-container">
                    <label className="form-label">Username</label>
                    <input type="text" {...register('username', {required: 'Username is required'})} />
                </div>
                <div className="form-input-container">
                    <label className="form-label">Password</label>
                    <input type="text" {...register('password', {required: 'Password is required'})} />
                </div>
                <button className="form-submit-button" disabled={formState.isSubmitting}>
                    Register
                </button>
            </form>
        </div>
    )
}

