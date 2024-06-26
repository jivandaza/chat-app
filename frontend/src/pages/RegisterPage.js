import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';

const RegisterPage = () => {

    const [data, setData] = useState({
        name : "",
        email : "",
        password : "",
        profile_pic : ""
    });

    const [uploadPhoto, setUploadPhoto] = useState("");
    const navigate = useNavigate();

    const handleOnChange = (e)=>{
        const {name, value} = e.target;

        setData((previousValue)=>{
            return {
                ...previousValue,
                [name] : value
            }
        });
    }

    const handleUploadPhoto = async (e)=> {
        const file = e.target.files[0];

        const uploadPhoto = await uploadFile(file);

        setUploadPhoto(file);

        setData((previousValue)=> {
            return {
                ...previousValue,
                profile_pic : uploadPhoto?.url
            };
        });
    };

    const handleClearUploadPhoto = (e)=> {
        e.stopPropagation();
        e.preventDefault();
        setUploadPhoto(null);
    }

    const handleSubmit = async(e)=> {
        e.preventDefault();
        e.stopPropagation();

        const URL = `${window.location.origin}/api/register`;

        try {
            const response = await axios.post(URL, data);

            if (response.data.success) {
                toast.success(response.data.message);

                setData({
                    name : "",
                    email : "",
                    password : "",
                    profile_pic : ""
                });

                navigate('/login-correo');
            }

        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <div className='mt-5'>
            <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
                <h3>Registrarse en Chat app!</h3>

                <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='name'>Nombre :</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Ingresar nombre'
                            className='bg-slate-100 px-2 py-1 focus:outline-primary'
                            value={data.name}
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor='username'>Correo electrónico:</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Ingresar correo electrónico'
                            className='bg-slate-100 px-2 py-1 focus:outline-primary'
                            value={data.email}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor='password'>Contraseña :</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Ingresar contraseña'
                            className='bg-slate-100 px-2 py-1 focus:outline-primary'
                            value={data.password}
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor='profile_pic'>Foto :

                            <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                                <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                                    {
                                        uploadPhoto?.name ? uploadPhoto?.name : "Subir foto de perfil"
                                    }
                                </p>
                                {
                                    uploadPhoto?.name && (
                                        <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                                            <IoClose/>
                                        </button>
                                    )
                                }

                            </div>

                        </label>

                        <input
                            type='file'
                            id='profile_pic'
                            name='profile_pic'
                            className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
                            onChange={handleUploadPhoto}
                        />
                    </div>


                    <button
                        className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
                    >
                        Registrarme
                    </button>

                </form>

                <p className='my-3 text-center'>Ya tienes una cuenta? <Link to={'/username'} className='hover:text-primary font-semibold'>Iniciar Sesión</Link></p>
            </div>
        </div>
    );
};

export default RegisterPage;