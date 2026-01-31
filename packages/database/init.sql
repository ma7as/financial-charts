-- Initialization script for PostgreSQL
-- This runs automatically when the container starts for the first time

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set timezone
SET timezone = 'UTC';

-- Optional: Create additional schemas if needed
-- CREATE SCHEMA IF NOT EXISTS analytics;
