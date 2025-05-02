// hooks/useAdminUsers.ts
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Role } from "@/types/role";

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
}

export function useAdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get<User[]>("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id: number, newRole: Role) => {
    try {
      await api.patch(`/admin/users/${id}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, role: newRole } : user))
      );
    } catch (error) {
      console.error("Role change error:", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, updateRole, deleteUser };
}
