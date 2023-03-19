import React from 'react';
import Swal from 'sweetalert2';
import style from './Login.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { handleSubmit, formState: { errors } } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [token, setToken] = useState('');
  const [jsonInfo, setJsonInfo] = useState([]);
  const navigate = useNavigate();

  const emailData = (e) => {
    setEmail(e.target.value);
  };

  const passwordData = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    localStorage.clear();

    const userVerify = async () => {
      const userData = await axios.get('http://localhost:5173/src/service/users.json', {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setJsonInfo(userData.data.users);
    };

    userVerify();
  }, []);

  useEffect(() => {
    try {
      const returnToken = async () => {
        const adminToken = await axios.get('http://localhost:5173/src/service/token.json', {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        setToken(adminToken.data.token);
        localStorage.setItem('token', token);
      };

      returnToken();
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const submitHandler = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedEmail = email.trim();
    const isEmailValid = emailRegex.test(trimmedEmail);
    setEmail(trimmedEmail);
    setIsEmailValid(isEmailValid);

    if (email === '' || password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No pueden haber campos vacios!!'
      });

      return;
    }

    if (!isEmailValid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifica la direccion de correo'
      });
    }

    if (email !== jsonInfo[0].email || password !== jsonInfo[0].password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'usuario o contraseña incorrectos'
      });

      return;
    }

    navigate('/dashboard');
  };
  return (
    <div id={style.Login}>
      <div className={style.formBox}>
        <form className={style.form} onSubmit={handleSubmit(submitHandler)}>
          <span className={style.title}>Sign in</span>
          <span className={style.subtitle}>Inicia secion con tu correo y tu contraseña</span>
          <div className={style.formContainer}>
            <input type="email" className={style.input} placeholder="Email" onChange={emailData} />
            <input type="password" className={style.input} placeholder="Password" onChange={passwordData} />
          </div>
          <button type='submit'>Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login
