import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { getItem, updateItem } from '../services/api'
import ItemForm from '../components/ItemForm'
import { Spinner } from '../components/Spinner'

const UpdateItem = () => {
  const { id } = useParams()
  const history = useHistory()
  const { data, status, error, } = useQuery(['item', { id }], getItem);
  const {mutateAsync} = useMutation(updateItem);
  const onFormSubmit = async (data) => {
      await mutateAsync({...data, id});
      history.push('/');
  }


  if (status === "loading") {
    return <Spinner/>;
  }
  if (error === "error") {
    return <p>Error</p>;
  }
  if (status === "success") {

    return (
      <div>
        <div>
          <h3 className="text-center">Update Task</h3>
          <ItemForm defaultValues={data} onFormSubmit={onFormSubmit}/>
        </div>
      </div>
    )
  }
}

export default UpdateItem