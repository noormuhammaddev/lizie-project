import React from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../firebase'
import logoutImg from "../../assets/logout.svg";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const Logout = () => {
  const {t}= useTranslation()
  const navigate = useNavigate()

  const signingOut = (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate('/home')
    signOut(auth)
  }

  return (
    <div className="user flex gap-[8px]">
      <img src={logoutImg} alt="" className='w-[20px]'/>
      <button className='text-m font-semibold' onClick={(event)=>signingOut(event)}>{t('logout')}</button>
    </div>
  )
}

export default Logout