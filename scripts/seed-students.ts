require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");
const path = require("path");

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Constants
const TOTAL_STUDENTS = 30;

const firstNames = [
  "Juan",
  "María",
  "Carlos",
  "Ana",
  "Luis",
  "Laura",
  "Pedro",
  "Sofia",
  "Miguel",
  "Isabella",
  "Diego",
  "Valentina",
  "Andrés",
  "Camila",
  "José",
  "Lucía",
  "Fernando",
  "Paula",
  "Ricardo",
  "Carmen",
];

const lastNames = [
  "García",
  "Rodríguez",
  "Martínez",
  "López",
  "González",
  "Pérez",
  "Sánchez",
  "Ramírez",
  "Torres",
  "Flores",
  "Vargas",
  "Ruiz",
  "Reyes",
  "Cruz",
  "Morales",
  "Ortiz",
  "Castro",
  "Silva",
  "Núñez",
  "Mendoza",
];

const cities = [
  "Bogotá",
  "Medellín",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Cúcuta",
  "Bucaramanga",
  "Pereira",
  "Santa Marta",
  "Manizales",
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Function to generate creation date within the specified range
function generateCreatedAtDate(): Date {
  const startDate = new Date('2024-03-01');
  const endDate = new Date('2025-03-01');
  const today = new Date();
  
  // Use the earliest date between March 2025 and today
  const effectiveEndDate = endDate < today ? endDate : today;
  
  return generateRandomDate(startDate, effectiveEndDate);
}

function generateRandomPhone(): string {
  return `3${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}`;
}

// Function to remove accents and special characters
function removeAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');
}

function generateRandomStudent() {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const normalizedFirstName = removeAccents(firstName.toLowerCase());
  const normalizedLastName = removeAccents(lastName.toLowerCase());
  const email = `${normalizedFirstName}.${normalizedLastName}${Math.floor(
    Math.random() * 100
  )}@example.com`;
  const birthDate = generateRandomDate(
    new Date(1990, 0, 1),
    new Date(2005, 11, 31)
  );
  const createdAt = generateCreatedAtDate();

  return {
    first_name: firstName,
    last_name: lastName,
    identification_number: Math.floor(
      Math.random() * 9000000000 + 1000000000
    ).toString(),
    gender: getRandomElement(["male", "female"]),
    birth_date: birthDate,
    city: getRandomElement(cities),
    address: `Calle ${Math.floor(Math.random() * 100)} #${Math.floor(
      Math.random() * 100
    )}-${Math.floor(Math.random() * 100)}`,
    mobile_number: generateRandomPhone(),
    email,
    study_branch: getRandomElement([
      "mathematics",
      "social_sciences",
      "engineering",
      "fashion",
      "audiovisual_arts",
    ]),
    modality: getRandomElement(["online", "in_person"]),
    status: getRandomElement(["active", "inactive"]),
    created_at: createdAt,
    updated_at: createdAt, // The update date will be set to the current date and time
  };
}

async function seedStudents() {
  try {
    // First, create the table if it doesn't exist
    const { error: createTableError } = await supabase.rpc(
      "create_students_table"
    );
    if (createTableError) {
      console.error("Error creating table:", createTableError);
      return;
    }

    // Generate and insert students
    const students = Array.from(
      { length: TOTAL_STUDENTS },
      generateRandomStudent
    );

    const { error: insertError } = await supabase
      .from("students")
      .insert(students);

    if (insertError) {
      console.error("Error inserting students:", insertError);
      return;
    }

    console.log(`Successfully seeded ${TOTAL_STUDENTS} students`);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Run the seed function
seedStudents();
