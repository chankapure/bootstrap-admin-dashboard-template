
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Edit, Trash, Plus } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface UserTableProps {
  initialUsers: User[];
}

const UserTable = ({ initialUsers }: UserTableProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  const usersPerPage = 8;
  
  // Filter users by search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );
  
  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const start = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(start, start + usersPerPage);
  
  const handleNewUser = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };
  
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };
  
  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };
  
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const status = formData.get('status') as 'active' | 'inactive';
    
    if (editingUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === editingUser.id 
          ? { ...user, name, email, role, status } 
          : user
      );
      setUsers(updatedUsers);
    } else {
      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role,
        status,
        lastLogin: 'Never'
      };
      setUsers([...users, newUser]);
    }
    
    setIsDialogOpen(false);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
        <Button onClick={handleNewUser} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.role}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEditUser(user)}
                        className="h-8 w-8"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteUser(user.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center md:justify-between py-2">
          <div className="hidden md:block text-sm text-muted-foreground">
            Showing <span className="font-medium">{start + 1}</span> to{' '}
            <span className="font-medium">{Math.min(start + usersPerPage, filteredUsers.length)}</span> of{' '}
            <span className="font-medium">{filteredUsers.length}</span> users
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogDescription>
              {editingUser 
                ? 'Update the user details and save changes.' 
                : 'Fill in the user details to create a new user.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name="name" 
                defaultValue={editingUser?.name || ''} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                defaultValue={editingUser?.email || ''} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select 
                id="role" 
                name="role" 
                defaultValue={editingUser?.role || 'User'}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
                <option value="Guest">Guest</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select 
                id="status" 
                name="status" 
                defaultValue={editingUser?.status || 'active'}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingUser ? 'Save Changes' : 'Create User'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserTable;
