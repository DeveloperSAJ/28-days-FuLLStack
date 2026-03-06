-- Create database
CREATE DATABASE nature_db;

-- Connect to database
\c nature_db;

-- Create categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create plants table
CREATE TABLE plants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    scientific_name VARCHAR(200),
    description TEXT,
    category_id INTEGER REFERENCES categories(id),
    image_url TEXT,
    care_instructions TEXT,
    sunlight VARCHAR(100),
    watering VARCHAR(100),
    temperature VARCHAR(100),
    soil_type VARCHAR(200),
    native_region VARCHAR(200),
    bloom_time VARCHAR(100),
    is_poisonous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trees table
CREATE TABLE trees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    scientific_name VARCHAR(200),
    description TEXT,
    category_id INTEGER REFERENCES categories(id),
    image_url TEXT,
    height VARCHAR(100),
    spread VARCHAR(100),
    growth_rate VARCHAR(50),
    soil_type VARCHAR(200),
    sunlight VARCHAR(100),
    water_needs VARCHAR(100),
    native_region VARCHAR(200),
    is_evergreen BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample categories
INSERT INTO categories (name, description, image_url) VALUES
('Flowering Plants', 'Beautiful plants that produce colorful flowers to brighten any garden', 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6'),
('Succulents', 'Drought-resistant plants with thick, fleshy parts that store water', 'https://images.unsplash.com/photo-1459411552882-8410e99660d8'),
('Ferns', 'Non-flowering plants with feathery leaves that thrive in shade', 'https://images.unsplash.com/photo-1599676704918-d4694748a0d5'),
('Deciduous Trees', 'Trees that shed their leaves annually, showing beautiful seasonal changes', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e'),
('Evergreen Trees', 'Trees that retain their leaves throughout the year, providing constant greenery', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09'),
('Fruit Trees', 'Trees that produce delicious fruits, perfect for home orchards', 'https://images.unsplash.com/photo-1597843786271-10cb90e3cd31');

-- Insert sample plants
INSERT INTO plants (name, scientific_name, description, category_id, sunlight, watering, temperature, soil_type, native_region, bloom_time, is_poisonous) VALUES
('Rose', 'Rosa', 'Classic flowering plant known for its beautiful and fragrant blooms', 1, 'Full sun', 'Regular', '60-75°F', 'Well-draining loamy soil', 'Asia', 'Spring to Fall', false),
('Aloe Vera', 'Aloe barbadensis', 'Succulent plant with medicinal properties, easy to care for', 2, 'Bright indirect', 'Low', '55-80°F', 'Sandy, well-draining', 'Arabian Peninsula', 'Summer', false),
('Boston Fern', 'Nephrolepis exaltata', 'Lush, feathery fern perfect for hanging baskets', 3, 'Partial shade', 'Regular', '60-75°F', 'Moist, rich soil', 'Tropical Americas', 'Non-flowering', false);

-- Insert sample trees
INSERT INTO trees (name, scientific_name, description, category_id, height, spread, growth_rate, soil_type, sunlight, water_needs, native_region, is_evergreen) VALUES
('Oak', 'Quercus', 'Majestic tree known for its strength and longevity', 4, '40-80 ft', '40-80 ft', 'Slow', 'Well-draining', 'Full sun', 'Moderate', 'Northern Hemisphere', false),
('Pine', 'Pinus', 'Evergreen conifer with needle-like leaves', 5, '50-100 ft', '20-40 ft', 'Fast', 'Sandy, acidic', 'Full sun', 'Low', 'Northern Hemisphere', true),
('Apple', 'Malus domestica', 'Popular fruit tree producing delicious apples', 6, '15-30 ft', '15-30 ft', 'Moderate', 'Well-draining loam', 'Full sun', 'Regular', 'Central Asia', false);