'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Heart } from 'lucide-react'
import { useFavoriteStore } from '@/store/favoriteStore'
import { supabase } from '@/lib/supabase'
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from '@/store/authStore'

interface FavoriteButtonProps {
  recipeId: number
}

export default function FavoriteButton({ recipeId }: FavoriteButtonProps) {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore()
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const isFavorite = favorites.includes(recipeId)

  const handleToggleFavorite = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para guardar favoritos.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    try {
      if (isFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('recipe_id', recipeId)
        
        if (error) throw error;
        
        removeFavorite(recipeId)
        toast({
          title: "Éxito",
          description: "Receta eliminada de favoritos.",
        })
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({ user_id: user.id, recipe_id: recipeId })
        
        if (error) throw error;
        
        addFavorite(recipeId)
        toast({
          title: "Éxito",
          description: "Receta agregada a favoritos.",
        })
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast({
        title: "Error",
        description: `No se pudo ${isFavorite ? 'eliminar de' : 'agregar a'} favoritos. Por favor, intenta de nuevo.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleFavorite}
      disabled={isLoading}
    >
      <Heart className={isFavorite ? "fill-current text-red-500" : ""} />
    </Button>
  )
}