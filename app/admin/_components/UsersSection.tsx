"use client";

import React from "react";
import { useAdminUsers, User } from "@/hooks/useAdminUsers";
import { Role } from "@/types/role";

export default function UsersSection() {
  const { users, loading, updateRole, deleteUser } = useAdminUsers();

  if (loading)
    return <p className="text-center">Loading users...</p>;

  const handleRoleChange = (id: number, newRole: Role) => {
    updateRole(id, newRole);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User management</h1>
      <table className="w-full border-collapse bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(user.id, e.target.value as Role)
                  }
                  className="p-1 border rounded w-full"
                >
                  <option value={Role.GUEST}>Guest</option>
                  <option value={Role.USER}>User</option>
                  <option value={Role.ADMIN}>Admin</option>
                </select>
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
