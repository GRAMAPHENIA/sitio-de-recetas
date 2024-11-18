'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from '@/store/authStore'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { setUser } = useAuthStore()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      toast({
        title: "Error al registrarse",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Registro exitoso",
        description: "Se ha creado tu cuenta. Iniciando sesión...",
      })
      if (data.user) {
        setUser(data.user)
        // Iniciar sesión automáticamente después del registro
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) {
          toast({
            title: "Error al iniciar sesión",
            description: signInError.message,
            variant: "destructive",
          })
        } else {
          toast({
            title: "Inicio de sesión exitoso",
            description: "Has iniciado sesión correctamente.",
          })
        }
      }
    }
    setIsLoading(false)
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Has iniciado sesión correctamente.",
      })
      if (data.user) {
        setUser(data.user)
      }
    }
    setIsLoading(false)
  }

  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Iniciar Sesión</TabsTrigger>
        <TabsTrigger value="signup">Registrarse</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signin-email">Email</Label>
            <Input
              id="signin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"  // Se agrega el atributo autocomplete
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signin-password">Contraseña</Label>
            <Input
              id="signin-password"
              type="password"
              value={password}
              autoComplete="current-password"  // Se agrega el atributo autocomplete
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </Button>
        </form>
      </TabsContent>
      <TabsContent value="signup">
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"  // Se agrega el atributo autocomplete
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Contraseña</Label>
            <Input
              id="signup-password"
              type="password"
              value={password}
              autoComplete="new-password"  // Se agrega el atributo autocomplete para contraseña nueva
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Registrarse'}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  )
}
