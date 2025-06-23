# API Testing with cURL

This document provides step-by-step instructions for testing the Item Management System APIs using cURL commands.

## Prerequisites

- **cURL installed** on your system
- **API Key** from your Supabase project
- **Terminal/Command Prompt** access

## API Configuration

- **Base URL:** `https://ldtelowagnfxcphzssuq.supabase.co/rest/v1`
- **API Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0`

## Testing Commands

### 1. Get All Items (READ)

**Command:**
```bash
curl.exe -X GET "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0"
```

**Expected Response:**
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Sample Item",
    "description": "This is a sample item",
    "created_at": "2024-01-20T10:30:00.000Z",
    "updated_at": "2024-01-20T10:30:00.000Z"
  }
]
```

**What it tests:**
- API authentication
- Database connectivity
- Data retrieval functionality

---

### 2. Create New Item (CREATE)

**Command:**
```bash
curl.exe -X POST "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0" -H "Content-Type: application/json" -d "{\"name\": \"Test Item\", \"description\": \"This is a test item\"}"
```

**Expected Response:**
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174001",
    "name": "Test Item",
    "description": "This is a test item",
    "created_at": "2024-01-20T11:00:00.000Z",
    "updated_at": "2024-01-20T11:00:00.000Z"
  }
]
```

**What it tests:**
- Data insertion
- JSON parsing
- Required field validation
- Auto-generated timestamps

---

### 3. Update Item (UPDATE)

**Command:**
```bash
curl.exe -X PATCH "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items?id=eq.ITEM_ID" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0" -H "Content-Type: application/json" -d "{\"name\": \"Updated Item Name\", \"description\": \"Updated description\"}"
```

**Expected Response:**
```json
[
  {
    "id": "ITEM_ID",
    "name": "Updated Item Name",
    "description": "Updated description",
    "created_at": "2024-01-20T10:30:00.000Z",
    "updated_at": "2024-01-20T12:00:00.000Z"
  }
]
```

**What it tests:**
- Data modification
- ID-based filtering
- Timestamp updates

---

### 4. Delete Item (DELETE)

**Command:**
```bash
curl.exe -X DELETE "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items?id=eq.ITEM_ID" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0"
```

**Expected Response:**
```json
[]
```

**What it tests:**
- Data deletion
- ID-based filtering
- Empty response handling

---

## Advanced Testing Scenarios

### Test 1: Create Item with Empty Description
```bash
curl.exe -X POST "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0" -H "Content-Type: application/json" -d "{\"name\": \"Item Without Description\"}"
```

### Test 2: Create Item with Long Name
```bash
curl.exe -X POST "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0" -H "Content-Type: application/json" -d "{\"name\": \"This is a very long item name that tests the maximum length validation of the database field\", \"description\": \"Testing long name handling\"}"
```

### Test 3: Update Only Name
```bash
curl.exe -X PATCH "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items?id=eq.ITEM_ID" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0" -H "Content-Type: application/json" -d "{\"name\": \"Only Name Updated\"}"
```

---

## Error Testing

### Test 1: Invalid API Key
```bash
curl.exe -X GET "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items" -H "apikey: invalid_key"
```

**Expected Response:**
```json
{
  "code": "401",
  "message": "Invalid API key"
}
```

### Test 2: Missing Required Field
```bash
curl.exe -X POST "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0" -H "Content-Type: application/json" -d "{\"description\": \"Missing name field\"}"
```

### Test 3: Invalid JSON
```bash
curl.exe -X POST "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0" -H "Content-Type: application/json" -d "{\"name\": \"Invalid JSON\""
```

---

## Testing Workflow

### Complete CRUD Test Sequence

1. **Get all items** (should be empty initially)
2. **Create a new item** (note the returned ID)
3. **Get all items** (should show the new item)
4. **Update the item** (using the ID from step 2)
5. **Get all items** (should show updated item)
6. **Delete the item** (using the ID from step 2)
7. **Get all items** (should be empty again)

### Example Workflow Commands

```bash
# Step 1: Get all items
curl.exe -X GET "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0"

# Step 2: Create item
curl.exe -X POST "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0" -H "Content-Type: application/json" -d "{\"name\": \"Workflow Test Item\", \"description\": \"Testing complete CRUD workflow\"}"

# Step 3: Get all items again
curl.exe -X GET "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0"
```

---

## Troubleshooting

### Common Issues

1. **"curl is not recognized"**
   - Use `curl.exe` instead of `curl` in PowerShell
   - Or use Command Prompt instead of PowerShell

2. **"Empty or invalid json"**
   - Check JSON syntax
   - Ensure proper quote escaping in PowerShell
   - Use single quotes for JSON in PowerShell

3. **"401 Unauthorized"**
   - Verify API key is correct
   - Check if API key is expired

4. **"404 Not Found"**
   - Verify endpoint URL is correct
   - Check if item ID exists for update/delete operations

### PowerShell-Specific Commands

For PowerShell users, use these modified commands:

```bash
# Get all items (PowerShell)
curl.exe -X GET "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0"

# Create item (PowerShell)
curl.exe -X POST "https://ldtelowagnfxcphzssuq.supabase.co/rest/v1/items" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0" -H "Content-Type: application/json" -d '{"name": "PowerShell Test", "description": "Testing from PowerShell"}'
```

---

## Success Criteria

Your API is working correctly if:

✅ **GET requests** return JSON array of items  
✅ **POST requests** return the created item with ID  
✅ **PATCH requests** return the updated item  
✅ **DELETE requests** return empty array `[]`  
✅ **Error responses** include proper HTTP status codes  
✅ **Authentication** works with valid API key  
✅ **Validation** prevents invalid data  

---

## Next Steps

After successful cURL testing:

1. **Test the web application** by running `npm run dev`
2. **Compare results** between cURL and web interface
3. **Document any issues** found during testing
4. **Set up automated testing** with tools like Postman or Jest

---

*This testing guide covers all CRUD operations and common error scenarios for the Item Management System API.* 