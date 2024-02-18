// List of available allergies with types and descriptions
const settings = [
  { value: "Font Size", src: "/icons/add.png", alt: "add icon" },
  { value: "Use Bold Text", src: "/icons/bold.png", alt: "capital b" },
  { value: "Dark Mode", src: "/icons/day-and-night.png", alt: "dark mode" },
  {
    value: "Use Descriptive Links",
    src: "/icons/information.png",
    alt: "Descriptive Links",
  },
  {
    value: "High Contrast Mode",
    src: "/icons/adjustment.png",
    alt: "High contrast mode",
  },
  { value: "Alt for images", src: "/icons/image.png", alt: "alt for images" },
];

// List of available allergies with types and descriptions
const AllergiesInformation = [
  { type: "Peanuts", description: "Allergic to peanuts." },
  { type: "Tree Nuts", description: "Allergic to tree nuts." },
  { type: "Milk", description: "Lactose or milk allergy." },
  { type: "Mustard", description: "Allergic to mustard." },
  { type: "Fish", description: "Allergic to fish." },
  { type: "Egg", description: "Allergic to eggs." },
  { type: "Soy", description: "Allergic to soy products." },
  { type: "Wheat", description: "Wheat or gluten allergy." },
  { type: "Sesame", description: "Allergic to sesame seeds." },
  { type: "Corn", description: "Allergic to corn products." },
  { type: "Shellfish", description: "Allergic to shellfish." },
  { type: "Meat", description: "Allergic to meat products." },
];

// List of available allergies with types and descriptions
const chronicConditions = [
  { type: "Diabetes", description: "Affects blood sugar regulation." },
  { type: "Hypertension", description: "High blood pressure." },
  {
    type: "Asthma",
    description: "Respiratory condition causing breathing difficulties.",
  },
  { type: "Heart Disease", description: "Cardiovascular health issues." },
  { type: "Arthritis", description: "Inflammation of the joints." },
  { type: "Cancer", description: "Abnormal cell growth." },
  {
    type: "Alzheimer's",
    description: "Progressive memory loss and cognitive decline.",
  },
  { type: "Chronic Pain", description: "Persistent, long-term pain." },
  { type: "Osteoporosis", description: "Weakening of bones." },
  { type: "Obesity", description: "Excessive body weight." },
  {
    type: "Chronic Kidney Disease",
    description: "Kidney function impairment.",
  },
  { type: "COPD", description: "Chronic lung diseases like emphysema." },
];

// dietery restrictions array and it's descriptions
const foodTypeInformation = [
  { type: "Vegan", description: "No animal products." },
  { type: "Vegetarian", description: "Plant-based diet without meat." },
  { type: "Omnivore", description: "Eats both plants and animals." },
  {
    type: "Paleo",
    description: "Emphasizes whole foods, like our ancestors.",
  },
  { type: "Pescatarian", description: "Vegetarian with fish and seafood." },
  { type: "Carnivore", description: "Primarily meat-based diet." },
  {
    type: "Flexitarian",
    description: "Mainly plant-based with occasional meat.",
  },
  { type: "Keto", description: "High-fat, low-carb diet for ketosis." },
  { type: "Gluten-free", description: "Avoids gluten-containing foods." },
  { type: "Lactose-free", description: "Avoids lactose in dairy products." },
  { type: "Dairy-free", description: "Excludes all dairy products." },
  {
    type: "Shellfish-free",
    description: "Avoids shellfish due to allergies.",
  },
  { type: "Soy-free", description: "Excludes soy-based foods." },
  { type: "Allergen-free", description: "Avoids common allergens." },
  { type: "Low-carb", description: "Restricts carbohydrates." },
  { type: "Mediterranean", description: "Based on Mediterranean cuisine." },
  { type: "Low-fat", description: "Emphasizes low-fat foods." },
  { type: "Low-sugar", description: "Limits sugar intake." },
  { type: "Low-food", description: "Reduces overall food consumption." },
];

export {
  settings,
  AllergiesInformation,
  chronicConditions,
  foodTypeInformation,
};
