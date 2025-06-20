
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Item {
  id?: string;
  name: string;
  description: string;
}

interface ItemFormProps {
  item?: Item;
  onSuccess: () => void;
  onCancel: () => void;
}

const ItemForm = ({ item, onSuccess, onCancel }: ItemFormProps) => {
  const [name, setName] = useState(item?.name || '');
  const [description, setDescription] = useState(item?.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (item?.id) {
        // Update existing item
        const { error } = await supabase
          .from('items')
          .update({ name: name.trim(), description: description.trim() })
          .eq('id', item.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Item updated successfully",
        });
      } else {
        // Create new item
        const { error } = await supabase
          .from('items')
          .insert({ name: name.trim(), description: description.trim() });

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Item created successfully",
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error saving item:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save item",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{item ? 'Edit Item' : 'Add New Item'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name *
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter item name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter item description"
              rows={3}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Saving...' : (item ? 'Update' : 'Create')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ItemForm;
