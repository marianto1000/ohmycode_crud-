import React, { useCallback, useState } from 'react'
import { auth, db } from '../firebase'
import { withRouter } from "react-router-dom";
import './Login.css'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(null)
    const [register, setRegister] = useState(true)

    const registerUser = e => {
        e.preventDefault()
        if (!email.trim() || !pass.trim()) {
            setError('Email is mandatory!')
            return
        }
        if (!pass.trim()) {
            setError('Password is mandatory!')
            return
        }
        if (pass.length < 6) {
            setError('Password need six characters')
            return
        }
        setError(null)
        if (register) {
            registerNewUser()
        } else {
            login()
        }

    }

    const login = useCallback(async () => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user)
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/')
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('Usuario o contraseña incorrecta')
            }
            if (error.code === 'auth/wrong-password') {
                setError('Usuario o contraseña incorrecta')
            }
            console.log(error.code)
            console.log(error.message)
        }
    }, [email, pass, props.history])
    const registerNewUser = useCallback(async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res.user)
            await db.collection('users').doc(res.user.uid).set({
                email: res.user.email,
                uid: res.user.uid
            })
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/')
        } catch (error) {
            console.log(error)
            // setError(error.message)
            if (error.code === 'auth/email-already-in-use') {
                setError('User already register')
                return
            }
            if (error.code === 'auth/invalid-email') {
                setError('Email not valid')
                return
            }
        }
    }, [email, pass])
    return (
        <div className="mt-5">
            <h3 className="text-center">{
                register ? 'Register an account' : 'Login'
            }</h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={registerUser}>
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : null
                        }
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="password"
                            onChange={e => setPass(e.target.value)}
                            value={pass}
                        />
                        <div className='buttonArea'>
                            <button
                                className="btn btn-lg btn-dark btn-block"
                                type="submit"
                            >
                                {
                                    register ? 'Register' : 'Login'
                                }
                            </button>
                            <button
                                className="btnLink"
                                type="button"
                                onClick={() => setRegister(!register)}
                            >
                                {register ? 'Already have an account?' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login) 