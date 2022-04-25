import React from 'react'
import { useMutation, useQueryClient } from "react-query";
import { Link } from 'react-router-dom'
import { removeItem } from '../services/api';
import './Item.css';

const Item = ({ title, userId, completed, id }) => {

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(removeItem);

  const remove = async () => {
    await mutateAsync(id)
    queryClient.invalidateQueries("todos")
  }
  return (
    <div>
      <li className="list-group-item">
        <div>
          <span>Title:</span>
          <Link to={`/update/${id}`}>{title}</Link>
        </div>
        <div><span>User id:</span>
          <span>{userId}</span>
        </div>
        <div>
          <span>Status:</span>
          {
            completed === true ? <span>Completed</span> : <span>Not Completed</span>
          }
        </div>

        <button className="btn btn-warning btn-sm float-right mr-2" onClick={remove}> Remove
        </button>
      </li>
    </div>
  )
}

export default Item