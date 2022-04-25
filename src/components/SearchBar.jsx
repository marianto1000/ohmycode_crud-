import React, { useState } from "react";
import { useQuery } from 'react-query';
import { getUserId } from "../services/api";
import { useFormik } from 'formik';
import './SearchBar.css';

const SearchBar = () => {
    const [userId, setUserId] = useState("");
    const formik = useFormik({
        initialValues: {
            userId: "",
        },
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
            setUserId(values.userId);
        },
    });

    const { data, error, isLoading } = useQuery(["userItemId", userId], () =>
        getUserId(userId)
    );
    console.log(data)
    return (
        <div className="searchBar">
            <h4>Find by ID</h4>
            <form onSubmit={formik.handleSubmit}>
                <input
                    userId="userId"
                    name="userId"
                    type="text"
                    onChange={formik.handleChange}></input>
            </form>
            {error && <p>Error!</p>}
            {data && (
                <p>
                    {data.name} {data.title}
                </p>
            )}
            {isLoading && <p>Loading..</p>}
        </div>
    );
}

export default SearchBar