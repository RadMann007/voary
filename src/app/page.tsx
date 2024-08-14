"use client"

import InscriptionPage from '@/components/custom/inscriptionPage';
import { LoginForm } from '@/components/custom/loginForm';
import { getAllUser } from '@/lib/actions';
import { Utilisateur } from '@prisma/client';
import React, { useEffect, useState } from 'react'

export default function LoginPageComponent() {
  const [users, setUsers] = useState<Utilisateur[]>([]);
  const [isLoading, setIsloading] = useState(true)

    const getData = async () => {
        const lst = await getAllUser();
        setUsers(lst);
        setIsloading(false)
    }

    useEffect(() => {
        getData();
    }, [])

  return (
    <div>
      {
        isLoading && <LoginForm />
      }
        {
            users.length === 0 && <InscriptionPage />
        }
    </div>
  )
}
