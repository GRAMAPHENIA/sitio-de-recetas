import { Recipe } from '@/types/recipe'

export const recipes: Recipe[] = [
    {
        id: 1,
        title: "Ensalada de Pollo con Palta y Nueces",
        description:
          "Una deliciosa ensalada balanceada con proteínas animales, grasas saludables y un bajo índice glucémico.",
        ingredients: [
          "200g de pechuga de pollo cocida",
          "1 palta madura",
          "50g de nueces",
          "1 zanahoria rallada",
          "1 manzana verde en cubos",
          "100g de yogurt natural sin azúcar",
          "Hojas verdes al gusto",
          "Sal y pimienta al gusto",
        ],
        instructions: [
          "Cortar la pechuga de pollo en trozos pequeños.",
          "Pelar y cortar la palta en cubos.",
          "En un bol grande, mezclar las hojas verdes, zanahoria, manzana, pollo y nueces.",
          "Agregar el yogurt como aderezo y mezclar bien.",
          "Sazonar con sal y pimienta al gusto antes de servir.",
        ],
        category: "Ensaladas",
        time: 15, // en minutos
        portions: 2,
      },
      {
        id: 2,
        title: "Morcilla a la Parrilla con Manzana y Nueces",
        description:
          "Un platillo creativo que combina el sabor intenso de la morcilla con el toque dulce y crujiente de la manzana y las nueces.",
        ingredients: [
          "2 morcillas frescas",
          "1 manzana roja en rodajas",
          "50g de nueces picadas",
          "Aceite de oliva",
          "Sal y pimienta al gusto",
        ],
        instructions: [
          "Calentar la parrilla a fuego medio.",
          "Cocinar las morcillas durante 10 minutos, girándolas ocasionalmente.",
          "En un sartén, saltear las rodajas de manzana con un poco de aceite de oliva hasta que estén doradas.",
          "Servir las morcillas acompañadas de las manzanas y espolvorear nueces picadas por encima.",
        ],
        category: "Parrilla",
        time: 20,
        portions: 2,
      },
      {
        id: 3,
        title: "Riñón al Vino Tinto con Zanahorias y Palta",
        description:
          "Una receta rica en proteínas animales y baja en carbohidratos para los amantes de sabores fuertes.",
        ingredients: [
          "300g de riñón de res limpio",
          "1 zanahoria en rodajas",
          "1 palta en rebanadas",
          "1 taza de vino tinto seco",
          "1 diente de ajo picado",
          "Aceite de oliva",
          "Sal y pimienta al gusto",
        ],
        instructions: [
          "Cortar el riñón en trozos pequeños y saltearlo con aceite de oliva y ajo hasta dorar.",
          "Agregar el vino tinto y cocinar a fuego lento por 15 minutos.",
          "Mientras tanto, cocinar la zanahoria al vapor hasta que esté suave.",
          "Servir el riñón acompañado de zanahorias y rebanadas de palta fresca.",
        ],
        category: "Gourmet",
        time: 30,
        portions: 3,
      },
      {
        id: 4,
        title: "Carne de Res con Yogurt y Nueces",
        description:
          "Un platillo simple pero delicioso con carne de res tierna y una salsa cremosa de yogurt y nueces.",
        ingredients: [
          "200g de carne de res en tiras",
          "50g de nueces molidas",
          "100g de yogurt natural sin azúcar",
          "1 zanahoria rallada",
          "1 diente de ajo picado",
          "Aceite de oliva",
          "Sal y pimienta al gusto",
        ],
        instructions: [
          "Saltear la carne de res con aceite de oliva y ajo hasta que esté bien cocida.",
          "Agregar la zanahoria rallada y cocinar por 5 minutos.",
          "Mezclar el yogurt con las nueces molidas para formar una salsa.",
          "Servir la carne con la salsa por encima.",
        ],
        category: "Platos Fuertes",
        time: 25,
        portions: 2,
      },
]