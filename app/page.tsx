import { Suspense } from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Recipe } from '@/types/recipe'
import { Navbar } from '@/components/navbar/Navbar'
import ClientRecipeList from '@/components/client-recipeList/ClientRecipeList'

async function getRecipes() {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.from('recipes').select('*')
  if (error) {
    console.error('Error fetching recipes:', error)
    return []
  }
  console.log("Recipes:", data)  // Agregar log para ver los datos
  return data as Recipe[]
}

async function getFavorites(userId: string) {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase
    .from('favorites')
    .select('recipe_id')
    .eq('user_id', userId)
  if (error) {
    console.error('Error fetching favorites:', error)
    return []
  }
  console.log("Favorites:", data)  // Agregar log para ver los datos
  return data.map(fav => fav.recipe_id)
}

export default async function RecipesPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  const recipes = await getRecipes()
  const favorites = session ? await getFavorites(session.user.id) : []

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Recetas Deliciosas</h1>
        <Suspense fallback={<div>Cargando...</div>}>
          <ClientRecipeList initialRecipes={recipes} initialFavorites={favorites} userId={session?.user.id} />
        </Suspense>
      </main>
    </div>
  )
}