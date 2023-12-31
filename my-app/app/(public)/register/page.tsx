'use client'
import {useForm} from "react-hook-form"
import { useUserService } from "@/_services/useUserService"
import {useState} from 'react'

export default function Page(){
    const userService = useUserService()
    const {register, handleSubmit, formState} = useForm()
    const {errors} = formState

    const [serverError, setServerError] = useState('')

    async function onSubmit(user: any){
        try{
            await userService.register(user)
        }
        catch(e: any){
            setServerError(e)
        }
    }
    function clearError(){
        serverError==='' ? null : setServerError('')
    }
    
    return (
        <div>
            <h3>Register</h3>
            <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-input-container">
                    <label className="form-label">Username</label>
                    <input type="text" {...register('username', {required: 'Username is required', onChange: ()=>clearError()})} />
                    <p className="form-error in-line">{errors.username?.message?.toString()}</p>
                </div>
                <div className="form-input-container">
                    <label className="form-label">Password</label>
                    <input type="password" {...register('password', {required: 'Password is required', onChange: ()=>clearError()})} />
                    <p className="form-error in-line">{errors.password?.message?.toString()}</p>
                </div>
                <p className="form-error">{serverError}</p>
                <button className="form-submit-button" disabled={formState.isSubmitting}>
                    Register
                </button>
            </form>
        </div>
    )
}

