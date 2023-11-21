'use client'
import { useUserService } from "@/_services/useUserService"
import { useForm } from "react-hook-form"

export default function Page(){
    const userService = useUserService()
    const {register, handleSubmit, formState} = useForm()
    const {errors} = formState

    async function onSubmit({username, password}: any){
        await userService.login(username, password)
    }

    return (
        <div>
            <h3>Login</h3>
            <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-input-container">
                    <label className="form-label">Username</label>
                    <input type="text" {...register('username')} />
                </div>
                <div className="form-input-container">
                    <label className="form-label">Password</label>
                    <input type="text" {...register('password')} />
                </div>
                <button className="form-submit-button" disabled={formState.isSubmitting}>
                    Login
                </button>
            </form>
        </div>
    )
}

