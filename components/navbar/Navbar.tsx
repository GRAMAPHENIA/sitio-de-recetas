'use client'

// import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { User, LogOut } from 'lucide-react'
import Auth from '@/components/auth/Auth'
import { useAuthStore } from '@/store/authStore'
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const { toast } = useToast()
    const { user, signOut } = useAuthStore()

    const handleSignOut = async () => {
        try {
            await signOut()
            toast({
                title: "Sesión cerrada",
                description: "Has cerrado sesión correctamente.",
            })
            setIsAuthOpen(false)
        } catch {
            toast({
                title: "Error al cerrar sesión",
                description: "Ocurrió un error al cerrar la sesión.",
                variant: "destructive",
            })
        }
    }

    return (
        <header className="bg-background border-b">
            {/* ... (rest of the Navbar code remains the same) ... */}
            <Sheet open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        {user ? (
                            <Avatar>
                                <AvatarImage src={user.user_metadata.avatar_url} />
                                <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        ) : (
                            <User className="h-5 w-5" />
                        )}
                        <span className="sr-only">
                            {user ? 'Menú de usuario' : 'Iniciar sesión'}
                        </span>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{user ? 'Perfil de Usuario' : 'Autenticación'}</SheetTitle>
                        <SheetDescription>
                            {user ? `Bienvenido, ${user.email}` : 'Inicia sesión o regístrate para acceder a todas las funciones.'}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="mt-4">
                        {user ? (
                            <div className="space-y-4">
                                <p>Email: {user.email}</p>
                                <Button onClick={handleSignOut} className="w-full">
                                    <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
                                </Button>
                            </div>
                        ) : (
                            <Auth />
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    )
}