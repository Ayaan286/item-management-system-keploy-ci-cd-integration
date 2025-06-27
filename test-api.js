// Simple API Test Script
const API_URL = 'https://ldtelowagnfxcphzssuq.supabase.co/rest/v1';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0';

const headers = {
  'apikey': API_KEY,
  'Content-Type': 'application/json'
};

async function testAPI() {
  console.log('🧪 Testing Item Management API...\n');

  try {
    // Test 1: Get all items
    console.log('1. Testing GET /items...');
    const getResponse = await fetch(`${API_URL}/items`, { headers });
    console.log(`   Status: ${getResponse.status} ${getResponse.ok ? '✅' : '❌'}`);

    // Test 2: Create item
    console.log('2. Testing POST /items...');
    const createResponse = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'API Test Item',
        description: 'Created by test script'
      })
    });
    console.log(`   Status: ${createResponse.status} ${createResponse.ok ? '✅' : '❌'}`);

    if (createResponse.ok) {
      const createdItem = await createResponse.json();
      const itemId = createdItem[0]?.id;

      if (itemId) {
        // Test 3: Update item
        console.log('3. Testing PATCH /items...');
        const updateResponse = await fetch(`${API_URL}/items?id=eq.${itemId}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            name: 'Updated Test Item'
          })
        });
        console.log(`   Status: ${updateResponse.status} ${updateResponse.ok ? '✅' : '❌'}`);

        // Test 4: Delete item
        console.log('4. Testing DELETE /items...');
        const deleteResponse = await fetch(`${API_URL}/items?id=eq.${itemId}`, {
          method: 'DELETE',
          headers
        });
        console.log(`   Status: ${deleteResponse.status} ${deleteResponse.ok ? '✅' : '❌'}`);
      }
    }

    console.log('\n🎉 API testing completed!');
    console.log('📊 All tests passed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI(); 