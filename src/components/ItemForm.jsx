import React from 'react'
import { useForm } from 'react-hook-form'
import './ItemForm.css'
const ItemForm = ({ defaultValues, onFormSubmit }) => {

    const { register, handleSubmit, errors } = useForm({ defaultValues })
    const onSubmit = handleSubmit((data) => {
        onFormSubmit(data)
    })
    return (
        <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <form className='form' onSubmit={onSubmit}>
                    <label htmlFor='title'>Title</label>
                    <input className="form-control mb-2" ref={register({ required: true, maxLength: 200 })} id="title" name="title" type="text" />
                    {errors.title && <span>Title is required</span>}
                    <label htmlFor='userId'>User Identification</label>
                    <input className="form-control mb-2" ref={register({ required: true, min: 1 })} id="userId" name="userId" type="number" />
                    {errors.userId && <span>An userId is required</span>}
                    <label htmlFor='completed'>Status</label>
                    <select name="completed" ref={register({ required: true })} >
                        <option value="true">completed</option>
                        <option value="false">not completed</option>
                    </select>
                    <button className= "btn btn-lg btn-dark btn-block">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ItemForm