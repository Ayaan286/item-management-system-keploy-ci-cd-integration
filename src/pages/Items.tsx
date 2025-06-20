
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import ItemForm from '@/components/ItemForm';
import ItemList from '@/components/ItemList';

interface Item {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const Items = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingItem(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Item Management System</h1>
          <p className="text-gray-600">Create, read, update, and delete items using Supabase</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ItemList 
              onEdit={handleEdit} 
              onAdd={handleAdd}
              refreshTrigger={refreshTrigger}
            />
          </div>
          
          {showForm && (
            <div className="lg:col-span-1">
              <ItemForm
                item={editingItem}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            </div>
          )}
        </div>

        {!showForm && (
          <div className="mt-8 text-center">
            <Button onClick={handleAdd} size="lg">
              Add Your First Item
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;
