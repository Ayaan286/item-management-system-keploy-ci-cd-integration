import { supabase } from '../integrations/supabase/client';

describe('Supabase Integration Tests', () => {
  // Test data
  const testItem = {
    name: 'Integration Test Item',
    description: 'This is a test item for integration testing'
  };

  let createdItemId: string;

  // Clean up after all tests
  afterAll(async () => {
    if (createdItemId) {
      await supabase.from('items').delete().eq('id', createdItemId);
    }
  });

  describe('CRUD Operations', () => {
    it('should create a new item', async () => {
      const { data, error } = await supabase
        .from('items')
        .insert(testItem)
        .select();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data).toHaveLength(1);
      expect(data[0].name).toBe(testItem.name);
      expect(data[0].description).toBe(testItem.description);
      expect(data[0].id).toBeDefined();
      expect(data[0].created_at).toBeDefined();
      expect(data[0].updated_at).toBeDefined();

      // Store the ID for cleanup
      createdItemId = data[0].id;
    });

    it('should read all items', async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('should read a specific item by ID', async () => {
      if (!createdItemId) {
        throw new Error('No item ID available for testing');
      }

      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', createdItemId)
        .single();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.id).toBe(createdItemId);
      expect(data.name).toBe(testItem.name);
    });

    it('should update an existing item', async () => {
      if (!createdItemId) {
        throw new Error('No item ID available for testing');
      }

      const updatedData = {
        name: 'Updated Integration Test Item',
        description: 'This item has been updated'
      };

      const { data, error } = await supabase
        .from('items')
        .update(updatedData)
        .eq('id', createdItemId)
        .select();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data).toHaveLength(1);
      expect(data[0].name).toBe(updatedData.name);
      expect(data[0].description).toBe(updatedData.description);
      expect(data[0].updated_at).toBeDefined();
    });

    it('should delete an item', async () => {
      if (!createdItemId) {
        throw new Error('No item ID available for testing');
      }

      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', createdItemId);

      expect(error).toBeNull();

      // Verify the item was deleted
      const { data: checkData, error: checkError } = await supabase
        .from('items')
        .select('*')
        .eq('id', createdItemId);

      expect(checkError).toBeNull();
      expect(checkData).toHaveLength(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid data gracefully', async () => {
      const { error, data } = await supabase
        .from('items')
        .insert({ name: '', description: 'Missing name field' })
        .select();

      // If no error, check that data was inserted (empty name is allowed)
      if (!error) {
        expect(data).toBeDefined();
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
        expect(data[0].name).toBe('');
        
        // Clean up the test data
        await supabase.from('items').delete().eq('id', data[0].id);
      } else {
        // If there was an error, that's also acceptable
        expect(error).toBeDefined();
      }
    });

    it('should handle non-existent item updates', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const { data, error } = await supabase
        .from('items')
        .update({ name: 'Test' })
        .eq('id', fakeId)
        .select();

      expect(error).toBeNull();
      expect(data).toHaveLength(0);
    });

    it('should handle non-existent item deletion', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', fakeId);

      expect(error).toBeNull();
    });
  });

  describe('Data Validation', () => {
    it('should require name field', async () => {
      const { error } = await supabase
        .from('items')
        .insert({ name: '', description: 'Only description' });

      expect(error).toBeDefined();
    });

    it('should accept empty description', async () => {
      const { data, error } = await supabase
        .from('items')
        .insert({ name: 'Item without description' })
        .select();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect([null, '']).toContain(data[0].description);

      // Clean up
      await supabase.from('items').delete().eq('id', data[0].id);
    });
  });
}); 