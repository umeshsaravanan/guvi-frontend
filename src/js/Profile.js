import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import '../css/Profile.css';
import { RiAccountCircleFill } from "react-icons/ri";

const Profile = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [phone, setPhone] = useState('');
    const [Dob, setDob] = useState('');
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/${id}`)
            .then((response) => {
                setData(response.data);
                setPhone(response.data.PhoneNumber || '');
                if (response.data.DOB) {
                    setDob(new Date(response.data.DOB).toISOString().split('T')[0]);
                    calculateAge(response.data.DOB);
                } else {
                    setDob('');
                    setAge(null);
                }
                setGender(response.data.Gender || '');
            })
            .catch((err) => {
                if (err.response.status === 404)
                    navigate('/notFound');
            });
    }, [id, navigate]);

    const calculateAge = (dob) => {
        const dobDate = new Date(dob);
        const today = new Date();
        const ageDiff = today.getFullYear() - dobDate.getFullYear();
        if (
            today.getMonth() < dobDate.getMonth() ||
            (today.getMonth() === dobDate.getMonth() && today.getDate() < dobDate.getDate())
        ) {
            setAge(ageDiff - 1);
        } else {
            setAge(ageDiff);
        }
    };

    const handleDobChange = (e) => {
        setDob(e.target.value);
        calculateAge(e.target.value);
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/update`, {
            userName: data.userName,
            email: data.email,
            password: data.password,
            PhoneNumber: phone,
            Gender: gender,
            DOB: Dob,
            Age: age
        })
            .then((response) => {
                if (!response.data.message)
                    setEditMode(!editMode);
                
                setError(response.data.message);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const handleEditClick = () => {
        setEditMode(!editMode);
    };
    const handleLogout = () => {
        navigate('/');
    }

    return (
        <div className='bg-dark min-vh-100 p-3'>
            {data ? (
                <>
                    <div className='container d-flex align-items-center justify-content-between text-white col-lg-11 col-md-11 col-sm-11 col-xs-11 col-11 mx-auto mb-2'>
                        <h1 className='text-capitalize'>{data.userName}</h1>
                        <button className='btn w-1 bg-white text-dark' style={{ fontSize: '0.8rem', height: '2rem' }} onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                    <div className='profile p-4 d-flex flex-column flex-sm-row align-items-start justify-content-between bg-secondary col-lg-11 col-md-11 col-sm-11 col-xs-11 col-11 mx-auto'>
                        
                    <div className='col-12 col-sm-6 my-auto d-flex flex-column align-items-center justify-content-center'>
                            <RiAccountCircleFill size={250} />
                        </div>
                        <div className='col-12 col-sm-6'>
                            <p className='border-bottom'>Email: {data.email}</p>
                            <form onSubmit={handleUpdate}>
                                <div className='form-group mb-2'>
                                    <label className='form-label' htmlFor='phone'>
                                        Phone
                                    </label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={phone || ''}
                                        name='phone'
                                        onChange={(e) => setPhone(e.target.value)}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label' htmlFor='gender'>
                                        Gender
                                    </label>
                                    <select
                                        className='form-control'
                                        value={gender || ''}
                                        name='gender'
                                        onChange={(e) => setGender(e.target.value)}
                                        disabled={!editMode}
                                    >
                                        <option value=''>Select Gender</option>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                    </select>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label' htmlFor='dob'>
                                        D.O.B
                                    </label>
                                    <input
                                        className='form-control'
                                        type='date'
                                        value={Dob || ''}
                                        name='dob'
                                        onChange={handleDobChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label' htmlFor='age'>
                                        Age
                                    </label>
                                    <input
                                        className='form-control'
                                        type='Number'
                                        value={age || ''}
                                        name='age'
                                        disabled
                                    />
                                </div>
                                <button
                                    type='button'
                                    className='btn btn-success mt-2 mx-4 col-auto'
                                    onClick={handleEditClick}
                                >
                                    {editMode ? 'Cancel' : 'Edit'}
                                </button>
                                <button
                                    type='submit'
                                    className='btn btn-primary mt-2 mx-4 col-auto'
                                    disabled={!editMode}
                                    hidden={!editMode}
                                >
                                    Update
                                </button>
                            </form>
                            {error ? <p className='text-danger text-center'>{error}</p> : null} 
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default Profile
