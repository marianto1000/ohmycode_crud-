import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ItemForm from '../components/ItemForm'
import { useQuery, useMutation } from 'react-query'
import { createItem } from '../services/api'

const CreateItem = () => {
    const history = useHistory();
    const { mutateAsync } = useMutation(createItem);
    const onFormSubmit = async (data) => {
        await mutateAsync(data)
        history.push('/')
    }
    return (
        <div className="mt-5">
            <h3 className="text-center">Create new task</h3>
            <ItemForm onFormSubmut={onFormSubmit} />
        </div>
    )
}

export default CreateItem