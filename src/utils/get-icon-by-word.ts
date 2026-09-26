// Define the mapping dictionary
const ICON_MAP: Record<string, string> = {
  ac: "mdi:air-conditioner",
  airconditioning: "mdi:air-conditioner",
  airconditioner: "mdi:air-conditioner",
  aircondition: "mdi:air-conditioner",
  breakfast: "lucide:coffee",
  sunrise: "material-symbols:wb-sunny-outline-rounded",
  wifi: "mdi:wifi",
  parking: "mdi:car-parking",
  gym: "mdi:dumbbell",
  pool: "mdi:pool",
  kitchen: "mdi:kitchen",
  tv: "mdi:television",
  chandelier: "mdi:chandelier",
  shower: "temaki:shower",
  smarttv: "streamline-ultimate:smart-tv-and-phone-bold",
  towel: "ph:towel-fill",
  microwave: "material-symbols-light:microwave-gen",
  wardrobe: "mdi:wardrobe",
  hairdryer: "mdi:hair-dryer",
  iron: "mdi:iron",
  ironboard: "mdi:iron-board",
  ironingboard: "mdi:iron-board",
  powergenerator: "roentgen:power-generator",
  generator: "roentgen:power-generator",
  powerbackup: "roentgen:power-generator",
  safebox: "mingcute:safe-box-fill",
  minifridge: "game-icons:fridge",
  fridge: "game-icons:fridge",
  coffeemaker: "mdi:coffee-maker",
  "wi-firouter": "solar:wi-fi-router-bold",
  workdesk: "game-icons:desk",
  desk: "ph:desk-fill",
  table: "ph:desk-fill",
  television: "mdi:television",
  toiletries: "mdi:bathroom-tissue",
  towels: "boxicons:towel-filled",
  waterheater: "mdi:electric-water-heater",
  bedsidelamp: "bi:lamp-fill",
  lamp: "bi:lamp-fill",
  chair: "streamline-ultimate:office-chair-bold",
  electrickettle: "mdi:kettle",
  sofa: "mdi:sofa",
};

/**
 * Takes a string (e.g., "Air Conditioner" or "AC")
 * and returns the corresponding Iconify name.
 */
export const getIconByWord = (word: string): string => {
  if (!word) return "mdi:help-circle-outline"; // Fallback for empty strings

  // Normalize: "Air Conditioner" -> "airconditioner"
  const normalizedWord = word.toLowerCase().replace(/\s+/g, "");

  // Return the mapped icon or a default "info" icon if not found
  return ICON_MAP[normalizedWord] || "mdi:information-outline";
};
