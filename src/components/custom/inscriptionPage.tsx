"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import React, { useState } from 'react'
import { insertOneUser } from "@/lib/actions"
import { useRouter } from "next/navigation"


export default function InscriptionPage() {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const insertUser = async () => {
    setIsLoading(true)
    const data = {
      email,
      firstname,
      lastname,
      password,
      id:0
    }
    await insertOneUser(data);
    setFirstname("");
    setLastName("");
    setEmail("");
    setPassword("");
    setIsLoading(false);

    router.refresh();
  }


  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-yellow-300">
      <Card className="mx-auto max-w-sm shadow-xl shadow-black/50">
        <CardHeader>
          <CardTitle className="text-xl uppercase text-center underline">Inscription</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstname">First name</Label>
                <Input id="firstname" placeholder="Max" value={firstname} onChange={e => setFirstname(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastname">Last name</Label>
                <Input id="lastname" placeholder="Robinson" value={lastname} onChange={e => setLastName(e.target.value)} required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="m@example.com"
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <Button onClick={insertUser} className="w-full">
              {isLoading ? <p>Chargement...</p> : <p>Create an account</p>}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="#" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
