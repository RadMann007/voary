import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { connectUser } from "@/lib/actions"
import { useState } from "react"
import { useToast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
import { Loader2 } from "lucide-react"

export function LoginForm() {

  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();
  const {toast} = useToast();

  const login = async () => {
    setIsloading(true)
    const connect = await connectUser({email: email, mdp: mdp});
    if(connect){
      router.push("/dashboard");
      setIsloading(true)
    }else{
      setIsloading(false);
      toast({title: "Erreur", description: "Veuillez réessayer svp!", variant: "destructive", action: <ToastAction altText="OK">OK</ToastAction>})
      return;
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required value={mdp} onChange={e => setMdp(e.target.value)} />
            </div>
            <Button type="submit" onClick={() => login()} className="w-full">
              {
                isLoading ? <p className="flex gap-2 items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />Chargement
                  </p> : <p>Connecter</p>
              }
            </Button>
          </div>
        </div>
      </div>
      <div className="h-screen hidden bg-muted lg:block">
        <Image
          src="/food5.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
