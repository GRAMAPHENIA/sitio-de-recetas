import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'

interface FavoriteStore {
  favorites: number[]
  setFavorites: (favorites: number[]) => void
  addFavorite: (recipeId: number) => void
  removeFavorite: (recipeId: number) => void
  fetchFavorites: () => Promise<void>
}

export const useFavoriteStore = create(
  persist<FavoriteStore>(
    (set) => ({
      favorites: [],
      setFavorites: (favorites) => set({ favorites }),
      addFavorite: (recipeId) => set((state) => ({ favorites: [...state.favorites, recipeId] })),
      removeFavorite: (recipeId) => set((state) => ({ favorites: state.favorites.filter(id => id !== recipeId) })),
      fetchFavorites: async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data, error } = await supabase
            .from('favorites')
            .select('recipe_id')
            .eq('user_id', user.id)
          if (error) {
            console.error('Error fetching favorites:', error)
          } else {
            set({ favorites: data.map(fav => fav.recipe_id) })
          }
        }
      }
    }),
    {
      name: 'favorite-storage',
    }
  )
)