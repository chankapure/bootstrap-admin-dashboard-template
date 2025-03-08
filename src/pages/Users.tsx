
import React from 'react';
import UserTable, { User } from '@/components/dashboard/UserTable';

// Sample user data
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: 'Today at 2:34 PM',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Manager',
    status: 'active',
    lastLogin: 'Yesterday at 11:20 AM',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    role: 'User',
    status: 'inactive',
    lastLogin: 'Last week',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'User',
    status: 'active',
    lastLogin: 'Today at 9:15 AM',
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '3 days ago',
  },
  {
    id: '6',
    name: 'Sarah Brown',
    email: 'sarah.brown@example.com',
    role: 'Manager',
    status: 'active',
    lastLogin: 'Today at 3:00 PM',
  },
  {
    id: '7',
    name: 'David Miller',
    email: 'david.miller@example.com',
    role: 'User',
    status: 'inactive',
    lastLogin: '2 weeks ago',
  },
  {
    id: '8',
    name: 'Jessica Taylor',
    email: 'jessica.taylor@example.com',
    role: 'User',
    status: 'active',
    lastLogin: 'Yesterday at 5:30 PM',
  },
  {
    id: '9',
    name: 'James Anderson',
    email: 'james.anderson@example.com',
    role: 'Manager',
    status: 'active',
    lastLogin: 'Today at 10:45 AM',
  },
  {
    id: '10',
    name: 'Linda Thomas',
    email: 'linda.thomas@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '5 days ago',
  },
  {
    id: '11',
    name: 'Paul Wilson',
    email: 'paul.wilson@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: 'Yesterday at 1:30 PM',
  },
  {
    id: '12',
    name: 'Karen Rodriguez',
    email: 'karen.rodriguez@example.com',
    role: 'User',
    status: 'inactive',
    lastLogin: '1 month ago',
  },
];

const Users = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">User Management</h1>
        <p className="text-muted-foreground">View and manage application users</p>
      </div>
      
      <UserTable initialUsers={sampleUsers} />
    </div>
  );
};

export default Users;
