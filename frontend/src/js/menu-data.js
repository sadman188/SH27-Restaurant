// Static fallback menu. Once the backend exists, GET /api/menu replaces this.
export const MENU = {
  s: { label: 'Starters', items: [
    ['Purple Corn Tostada', 36, 'Ricotta, goat cheese, beetroot and datterini.'],
    ['Smoked Scribble', 30, 'Culatello, spalla cotta, mortadella, pickles.'],
    ['Fresh Oysters Dozen', 59, 'Our selection of the day, lime, mignonette.'],
    ['Wild Mushroom Arancini', 18, 'Porcini purée, parmesan, basil.'],
    ['Burnt Aubergine Dip', 16, 'Smoked aubergine, tahini, pomegranate, flatbread.'],
    ['Bengal Prawn Skewers', 28, 'Mustard glaze, charred lime, curry leaf oil.']
  ]},
  m: { label: 'Main Dishes', items: [
    ['Crispy Skin Chicken', 33, 'Ricotta, radicchio, prosciutto salad, jus.'],
    ['Flank Steak', 35, 'Served medium rare, salad, mushroom sauce.'],
    ['Ebony Fillet Steak', 58, 'Truffle mash, black pepper sauce.'],
    ['Fish & Chips', 33, 'Atlantic cod, chips, salad, tartare, lemon.'],
    ['Wood-fired Hilsa', 42, 'Banana leaf, mustard, green chilli, saffron rice.'],
    ['Lamb Shoulder', 46, 'Slow roasted, jus, herbed potatoes.'],
    ['Teriyaki Glazed Salmon', 38, 'Sesame, spring onion, soy glaze, steamed rice.']
  ]},
  p: { label: 'Pizza & Sandwiches', items: [
    ['Wild Mushroom Pizza', 24, 'Mushroom, roast chicken, mozzarella, parmesan, parsley.'],
    ['Garden Pizza', 22, 'Peppers, red onion, olives, rosemary, mozzarella.'],
    ['Smoked Club Sandwich', 19, 'Toasted bread, ham, tomato, lettuce, house mayo, fries.'],
    ['Salami Roll', 17, 'Crusty roll, salami, smoked cheese, cucumber, chives.']
  ]},
  d: { label: 'Beverage', items: [
    ['Prickly Pear Tonic', 12, 'Prickly pear, key lime and tonic.'],
    ['Smoky Margarita', 13, 'Tequila, fresh lime, orange liqueur.'],
    ['Chicha Morada', 12, 'Purple corn, pineapple, apple, cinnamon.'],
    ['Better Boy', 10, 'Tomato, salt, black pepper, lemon.'],
    ['Green Apple Martini', 14, 'Apple, mint, vodka, lime.'],
    ['House Red Carafe', 38, 'Ask your host for tonight’s pour.']
  ]}
};
