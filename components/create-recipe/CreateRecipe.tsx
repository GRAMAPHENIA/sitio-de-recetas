import { useState } from 'react';
import { Recipe } from '@/types/recipe'; // Importa el tipo Recipe
import { supabase } from '@/lib/supabase';
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

interface CreateRecipeProps {
  onRecipeCreated: (newRecipe: Recipe) => void; // Definimos la propiedad onRecipeCreated
}

export default function CreateRecipe({ onRecipeCreated }: CreateRecipeProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [time, setTime] = useState('');
  const [portions, setPortions] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para crear una receta.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('recipes')
        .insert([{
          title,
          description,
          ingredients: ingredients.split('\n'),
          instructions: instructions.split('\n'),
          category,
          time: parseInt(time),
          portions: parseInt(portions),
          user_id: user.id,
        }])
        .select();

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "La receta ha sido creada correctamente.",
      });

      if (data && data[0]) {
        // Pasar la receta recién creada al componente padre
        onRecipeCreated(data[0]);
      }

      // Limpiar el formulario
      setTitle('');
      setDescription('');
      setIngredients('');
      setInstructions('');
      setCategory('');
      setTime('');
      setPortions('');

      router.refresh();
    } catch (error) {
      console.error('Error creating recipe:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la receta. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Crear Nueva Receta</CardTitle>
        <CardDescription>Comparte tu receta favorita con la comunidad.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Aquí va el formulario */}
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creando...' : 'Crear Receta'}
        </Button>
      </CardFooter>
    </Card>
  );
}
