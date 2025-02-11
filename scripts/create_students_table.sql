-- Enable the UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the students table
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    identification_number VARCHAR(20) NOT NULL UNIQUE,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female')),
    birth_date DATE NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    study_branch VARCHAR(50) NOT NULL CHECK (study_branch IN ('mathematics', 'social_sciences', 'engineering', 'fashion', 'audiovisual_arts')),
    modality VARCHAR(20) NOT NULL CHECK (modality IN ('online', 'in_person')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for frequently accessed columns
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_identification ON students(identification_number);
CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);

-- Create the RPC function to ensure the table exists
CREATE OR REPLACE FUNCTION create_students_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- The table creation is handled by the previous statements
    -- This function exists to provide a safe way to ensure the table exists
    -- without giving direct table creation privileges to the client
    NULL;
END;
$$; 