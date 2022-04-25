import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import './ToDoList.css'
import { getAll } from '../services/api'
import Item from './Item';
import SearchBar from '../components/SearchBar'
import { auth } from '../firebase';
import { Spinner } from '../components/Spinner';

const ToDoList = (props) => {

    const [user, setUser] = useState(null)

    const { data, status, error, } = useQuery("todos", getAll);
    console.log(data)

    useEffect(() => {
        if (auth.currentUser) {
            setUser(auth.currentUser)
        } else {
            props.history.push('/login')
        }
    }, [props.history])



    if (status === "loading") {
        return <Spinner />;
    }
    if (error === "error") {
        return <p>Error</p>;
    }
    if (status === "success") {

        return (
            <div className='row'>
                <div className="col-12">
                    <SearchBar />
                    <ul className="list-group">

                        {data.map(({ userId, title, id, completed }) => (

                            <Item title={title} userId={userId} completed={completed} key={id} id={id} />

                        ))}

                    </ul>
                </div>
            </div>
        )
    }
}

export default ToDoList