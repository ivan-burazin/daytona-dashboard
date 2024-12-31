import { useState } from 'react';
import { Workspace, workspaceApi } from '../lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';

export function WorkspaceTable() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      const data = await workspaceApi.list();
      setWorkspaces(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch workspaces');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await workspaceApi.delete(id);
      setWorkspaces(workspaces.filter(w => w.id !== id));
    } catch (err) {
      setError('Failed to delete workspace');
      console.error(err);
    }
  };

  if (loading) return <div>Loading workspaces...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!workspaces.length) return <div>No workspaces found</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Projects</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workspaces.map((workspace) => (
          <TableRow key={workspace.id}>
            <TableCell>{workspace.name}</TableCell>
            <TableCell>{workspace.projects.length}</TableCell>
            <TableCell>
              <span className={workspace.status === 'running' ? 'text-green-500' : 'text-gray-500'}>
                {workspace.status}
              </span>
            </TableCell>
            <TableCell>
              <Button variant="destructive" onClick={() => handleDelete(workspace.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
