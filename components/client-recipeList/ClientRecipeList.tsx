'use client'

import { useState } from 'react'
import { Recipe } from '@/types/recipe'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import CreateRecipe from '@/components/create-recipe/CreateRecipe'
import { Clock, Users, Heart } from 'lucide-react'

interface ClientRecipeListProps {
    initialRecipes: Recipe[]
    initialFavorites: number[]
    userId: string | undefined
}

export default function ClientRecipeList({ initialRecipes, initialFavorites, userId }: ClientRecipeListProps) {
    const [recipes, setRecipes] = useState(initialRecipes)
    const [favorites, setFavorites] = useState(initialFavorites)
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [showCreateRecipe, setShowCreateRecipe] = useState(false)
    const [showFavorites, setShowFavorites] = useState(false)

    const toggleFavorite = (recipeId: number) => {
        setFavorites(prevFavorites =>
            prevFavorites.includes(recipeId)
                ? prevFavorites.filter(id => id !== recipeId) // Quitar de favoritos
                : [...prevFavorites, recipeId] // Agregar a favoritos
        )
    }

    const filteredRecipes = recipes.filter(recipe =>
        (showFavorites ? favorites.includes(recipe.id) : true) &&
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === 'all' || recipe.category === categoryFilter)
    )

    const handleRecipeCreated = (newRecipe: Recipe) => {
        setRecipes([...recipes, newRecipe])
        setShowCreateRecipe(false)
    }

    return (
        <>
            {userId && (
                <div className="flex gap-4 mb-4 justify-center">
                    <Button onClick={() => setShowCreateRecipe(!showCreateRecipe)}>
                        {showCreateRecipe ? 'Cancelar' : 'Crear Nueva Receta'}
                    </Button>
                    <Button onClick={() => setShowFavorites(!showFavorites)}>
                        {showFavorites ? 'Mostrar Todas' : 'Mostrar Favoritos'}
                    </Button>
                </div>
            )}
            {showCreateRecipe && (
                <CreateRecipe onRecipeCreated={handleRecipeCreated} /> 
            )}

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Input
                    type="text"
                    placeholder="Buscar recetas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="Ensaladas">Ensaladas</SelectItem>
                        <SelectItem value="Platos Principales">Platos Principales</SelectItem>
                        <SelectItem value="Postres">Postres</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {userId && showFavorites && (
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <Heart className="mr-2 text-red-500" /> Tus Favoritos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.filter(recipe => favorites.includes(recipe.id)).map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} userId={userId} toggleFavorite={toggleFavorite} favorites={favorites} />
                        ))}
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-semibold mb-4">Todas las Recetas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} userId={userId} toggleFavorite={toggleFavorite} favorites={favorites} />
                ))}
            </div>
        </>
    )
}

function RecipeCard({ recipe, userId, toggleFavorite, favorites }: { recipe: Recipe; userId: string | undefined; toggleFavorite: (id: number) => void; favorites: number[] }) {
    const isFavorite = favorites.includes(recipe.id)

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    {recipe.title}
                    {userId && (
                        <LocalFavoriteButton
                            recipeId={recipe.id}
                            isFavorite={isFavorite}
                            onToggleFavorite={toggleFavorite}
                        />
                    )}
                </CardTitle>
                <CardDescription>{recipe.category}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="mb-4">{recipe.description}</p>
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {recipe.time} min
                    </span>
                    <span className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        {recipe.portions} porciones
                    </span>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Ver Receta</Button>
            </CardFooter>
        </Card>
    )
}

function LocalFavoriteButton({ recipeId, isFavorite, onToggleFavorite }: {
    recipeId: number;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
}): JSX.Element {
    return (
        <button
            onClick={() => onToggleFavorite(recipeId)}
            className={`text-lg ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
        >
            <Heart className={isFavorite ? 'fill-current' : ''} />
        </button>
    )
}

