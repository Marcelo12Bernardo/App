const response = {
  drinks: [
    {
      idDrink: '11009',
      strDrink: 'Moscow Mule',
      strDrinkAlternate: null,
      strTags: 'IBA,ContemporaryClassic',
      strVideo: null,
      strCategory: 'Punch / Party Drink',
      strIBA: 'Contemporary Classics',
      strAlcoholic: 'Alcoholic',
      strGlass: 'Copper Mug',
      strInstructions: 'Combine vodka and ginger beer in a highball glass filled with ice. Add lime juice. Stir gently. Garnish.',
      strInstructionsES: null,
      strInstructionsDE: 'Mischen Sie Wodka und Ingwerbier in einem mit Eis gefüllten Highball-Glas. Limettensaft hinzufügen. Vorsichtig umrühren. Garnieren.',
      strInstructionsFR: null,
      strInstructionsIT: 'Unisci la vodka e la ginger beer in un bicchiere highball pieno di ghiaccio.\r\nAggiungi il succo di lime.\r\nMescola delicatamente.',
      'strInstructionsZH-HANS': null,
      'strInstructionsZH-HANT': null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg',
      strIngredient1: 'Vodka',
      strIngredient2: 'Lime juice',
      strIngredient3: 'Ginger ale',
      strIngredient4: null,
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '2 oz ',
      strMeasure2: '2 oz ',
      strMeasure3: '8 oz ',
      strMeasure4: null,
      strMeasure5: null,
      strMeasure6: null,
      strMeasure7: null,
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strImageSource: 'https://commons.wikimedia.org/wiki/File:Moscow_Mule_at_Rye,_San_Francisco.jpg',
      strImageAttribution: 'Will Shenton\r\n',
      strCreativeCommonsConfirmed: 'Yes',
      dateModified: '2017-09-02 17:49:48',
    },
  ],
};
const { drinks } = response;
const results = [];
const magicNumber = 15;
drinks.forEach((drink) => {
  for (let i = 1; i <= magicNumber; i += 1) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];

    if (ingredient && measure) {
      results.push(`${ingredient} ${measure.trim()}`);
    }
  }
});

console.log(results);
