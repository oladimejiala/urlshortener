-- Database setup script for URL Shortener on Neon
-- Run this in your Neon SQL editor
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Create URLs table
CREATE TABLE IF NOT EXISTS urls (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    original_url TEXT NOT NULL,
    short_code VARCHAR(10) NOT NULL UNIQUE,
    custom_alias VARCHAR(50),
    click_count INTEGER DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
-- Create Clicks table
CREATE TABLE IF NOT EXISTS clicks (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    url_id VARCHAR NOT NULL REFERENCES urls(id) ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
    user_agent TEXT,
    ip_address VARCHAR(45)
);
-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_urls_short_code ON urls(short_code);
CREATE INDEX IF NOT EXISTS idx_urls_custom_alias ON urls(custom_alias);
CREATE INDEX IF NOT EXISTS idx_clicks_url_id ON clicks(url_id);
CREATE INDEX IF NOT EXISTS idx_clicks_timestamp ON clicks(timestamp);
-- Insert sample data (optional)
INSERT INTO urls (
        original_url,
        short_code,
        custom_alias,
        click_count,
        is_active,
        created_at
    )
VALUES (
        'https://example.com',
        'abc123',
        'example',
        0,
        true,
        NOW()
    ),
    (
        'https://github.com',
        'def456',
        'github',
        0,
        true,
        NOW()
    ) ON CONFLICT (short_code) DO NOTHING;