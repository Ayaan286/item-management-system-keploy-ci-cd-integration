
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Code, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Full-Stack CRUD Application
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A complete item management system built with React and Supabase
          </p>
          <Link to="/items">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Powered by Supabase PostgreSQL with real-time capabilities and automatic APIs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Frontend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Modern React application with TypeScript, Tailwind CSS, and shadcn/ui components
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                CRUD Operations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Complete Create, Read, Update, Delete functionality for item management
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Create new items with name and description
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                View all items in a responsive table
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Edit existing items inline
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Delete items with confirmation
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Real-time data synchronization
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Error handling and user feedback
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Responsive design for all devices
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Form validation and loading states
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
