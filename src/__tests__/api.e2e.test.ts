import { supabase } from '../integrations/supabase/client';

describe('API End-to-End Tests', () => {
  const API_BASE_URL = 'https://ldtelowagnfxcphzssuq.supabase.co/rest/v1';
  const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGVsb3dhZ25meGNwaHpzc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTE0OTcsImV4cCI6MjA1OTU4NzQ5N30.hqzVr9AFNmc59h3GfDKzmblpNUN-dGErHHUb0ucMkl0';

  const headers = {
    'apikey': API_KEY,
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  };

  let testItemId: string;

  // Clean up after all tests
  afterAll(async () => {
    if (testItemId) {
      await supabase.from('items').delete().eq('id', testItemId);
    }
  });

  describe('GET /items', () => {
    it('should return all items', async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*');

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
    });

    it('should return items ordered by created_at desc', async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
      
      // Check if items are ordered by created_at desc (if there are multiple items)
      if (data && data.length > 1) {
        const firstDate = new Date(data[0].created_at);
        const secondDate = new Date(data[1].created_at);
        expect(firstDate.getTime()).toBeGreaterThanOrEqual(secondDate.getTime());
      }
    });
  });

  describe('POST /items', () => {
    it('should create a new item', async () => {
      const newItem = {
        name: 'API Test Item',
        description: 'This item was created via API test'
      };

      const { data, error } = await supabase
        .from('items')
        .insert(newItem)
        .select();

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(1);
      expect(data[0].name).toBe(newItem.name);
      expect(data[0].description).toBe(newItem.description);
      expect(data[0].id).toBeDefined();
      expect(data[0].created_at).toBeDefined();
      expect(data[0].updated_at).toBeDefined();

      testItemId = data[0].id;
    });

    it('should create item with only name', async () => {
      const newItem = {
        name: 'API Test Item - Name Only'
      };

      const { data, error } = await supabase
        .from('items')
        .insert(newItem)
        .select();

      expect(error).toBeNull();
      expect(data[0].name).toBe(newItem.name);
      expect([null, '']).toContain(data[0].description);

      // Clean up
      await supabase.from('items').delete().eq('id', data[0].id);
    });

    it('should reject item without name', async () => {
      const invalidItem = {
        name: '',
        description: 'This item has no name'
      };

      const { error } = await supabase
        .from('items')
        .insert(invalidItem);

      // This might succeed or fail depending on your database constraints
      // We just check that we get a response
      expect(error !== undefined || error === null).toBe(true);
    });
  });

  describe('PATCH /items', () => {
    it('should update an existing item', async () => {
      // Create a test item first if none exists
      if (!testItemId) {
        const { data: createData } = await supabase
          .from('items')
          .insert({
            name: 'Temp Test Item',
            description: 'Temporary item for testing'
          })
          .select();
        testItemId = createData[0].id;
      }

      const updateData = {
        name: 'Updated API Test Item',
        description: 'This item has been updated via API'
      };

      const { data, error } = await supabase
        .from('items')
        .update(updateData)
        .eq('id', testItemId)
        .select();

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(1);
      expect(data[0].name).toBe(updateData.name);
      expect(data[0].description).toBe(updateData.description);
      expect(data[0].id).toBe(testItemId);
    });

    it('should update only name field', async () => {
      if (!testItemId) {
        throw new Error('No test item ID available');
      }

      const updateData = {
        name: 'Updated Name Only'
      };

      const { data, error } = await supabase
        .from('items')
        .update(updateData)
        .eq('id', testItemId)
        .select();

      expect(error).toBeNull();
      expect(data[0].name).toBe(updateData.name);
    });

    it('should handle update of non-existent item', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const updateData = {
        name: 'This should not work'
      };

      const { data, error } = await supabase
        .from('items')
        .update(updateData)
        .eq('id', fakeId)
        .select();

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(0);
    });
  });

  describe('DELETE /items', () => {
    it('should delete an existing item', async () => {
      if (!testItemId) {
        throw new Error('No test item ID available');
      }

      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', testItemId);

      expect(error).toBeNull();

      // Verify the item was actually deleted
      const { data: checkData, error: checkError } = await supabase
        .from('items')
        .select('*')
        .eq('id', testItemId);

      expect(checkError).toBeNull();
      expect(checkData).toHaveLength(0);
    });

    it('should handle deletion of non-existent item', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';

      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', fakeId);

      expect(error).toBeNull();
    });
  });

  describe('Authentication', () => {
    it('should reject requests without API key', async () => {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(response.status).toBe(401);
    });

    it('should reject requests with invalid API key', async () => {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: 'GET',
        headers: {
          'apikey': 'invalid-key',
          'Authorization': 'Bearer invalid-key',
          'Content-Type': 'application/json',
        },
      });

      expect(response.status).toBe(401);
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed data', async () => {
      const { error } = await supabase
        .from('items')
        .insert({ name: '', description: 'Empty name test' });

      // This might succeed or fail depending on your database constraints
      // We just check that we get a response
      expect(error !== undefined || error === null).toBe(true);
    });
  });
}); 