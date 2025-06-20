
# Item Management API Documentation

This application uses Supabase's auto-generated REST API for all database operations. Below are the equivalent API endpoints and their usage.

## Base URL
```
https://ldtelowagnfxcphzssuq.supabase.co/rest/v1
```

## Authentication
All requests require the following headers:
```
apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0
Content-Type: application/json
```

## Endpoints

### 1. GET /items - Retrieve All Items

**Method:** `GET`
**Endpoint:** `https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items`

**Description:** Retrieves all items from the database ordered by creation date (newest first).

**Query Parameters:**
- `order=created_at.desc` - Orders results by created_at descending
- `select=*` - Selects all columns (default behavior)

**Example Request:**
```bash
curl -X GET "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items?order=created_at.desc" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0"
```

**Example Response:**
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Sample Item",
    "description": "This is a sample item description",
    "created_at": "2024-01-20T10:30:00.000Z",
    "updated_at": "2024-01-20T10:30:00.000Z"
  }
]
```

### 2. POST /items - Add New Item

**Method:** `POST`
**Endpoint:** `https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items`

**Description:** Creates a new item in the database.

**Request Body:**
```json
{
  "name": "string (required)",
  "description": "string (optional)"
}
```

**Example Request:**
```bash
curl -X POST "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Item",
    "description": "This is a new item"
  }'
```

**Example Response:**
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174001",
    "name": "New Item",
    "description": "This is a new item",
    "created_at": "2024-01-20T11:00:00.000Z",
    "updated_at": "2024-01-20T11:00:00.000Z"
  }
]
```

### 3. PATCH /items - Update Item by ID

**Method:** `PATCH`
**Endpoint:** `https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items?id=eq.{item_id}`

**Description:** Updates an existing item by its ID.

**Query Parameters:**
- `id=eq.{item_id}` - Filters to update only the item with the specified ID

**Request Body:**
```json
{
  "name": "string (optional)",
  "description": "string (optional)"
}
```

**Example Request:**
```bash
curl -X PATCH "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items?id=eq.123e4567-e89b-12d3-a456-426614174000" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Item Name",
    "description": "Updated description"
  }'
```

**Example Response:**
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Updated Item Name",
    "description": "Updated description",
    "created_at": "2024-01-20T10:30:00.000Z",
    "updated_at": "2024-01-20T12:00:00.000Z"
  }
]
```

### 4. DELETE /items - Delete Item by ID

**Method:** `DELETE`
**Endpoint:** `https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items?id=eq.{item_id}`

**Description:** Deletes an item by its ID.

**Query Parameters:**
- `id=eq.{item_id}` - Filters to delete only the item with the specified ID

**Example Request:**
```bash
curl -X DELETE "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items?id=eq.123e4567-e89b-12d3-a456-426614174000" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0"
```

**Example Response:**
```json
[]
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "code": "PGRST116",
  "details": "The result contains 0 rows",
  "hint": null,
  "message": "JSON object requested, multiple (or no) rows returned"
}
```

### 401 Unauthorized
```json
{
  "code": "401",
  "message": "Invalid API key"
}
```

### 500 Internal Server Error
```json
{
  "code": "500",
  "message": "Internal server error"
}
```

## Database Schema

The `items` table has the following structure:

| Column      | Type                     | Constraints    | Description                    |
|-------------|--------------------------|----------------|--------------------------------|
| id          | uuid                     | Primary Key    | Auto-generated unique identifier |
| name        | text                     | NOT NULL       | Item name                      |
| description | text                     | NULL           | Item description (optional)    |
| created_at  | timestamp with time zone | NOT NULL       | Auto-generated creation time   |
| updated_at  | timestamp with time zone | NOT NULL       | Auto-updated modification time |

## JavaScript Client Usage

The application uses the Supabase JavaScript client for easier API interaction:

```javascript
import { supabase } from '@/integrations/supabase/client';

// Get all items
const { data, error } = await supabase
  .from('items')
  .select('*')
  .order('created_at', { ascending: false });

// Create new item
const { data, error } = await supabase
  .from('items')
  .insert({ name: 'Item Name', description: 'Description' });

// Update item
const { data, error } = await supabase
  .from('items')
  .update({ name: 'Updated Name' })
  .eq('id', itemId);

// Delete item
const { data, error } = await supabase
  .from('items')
  .delete()
  .eq('id', itemId);
```
