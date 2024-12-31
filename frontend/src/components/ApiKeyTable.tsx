import { useState } from 'react';
import { ApiKey, apiKeyApi } from '../lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function ApiKeyTable() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState('');

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const data = await apiKeyApi.list();
      setApiKeys(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch API keys');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newKeyName) return;
    try {
      const newKey = await apiKeyApi.create(newKeyName);
      setApiKeys([...apiKeys, newKey]);
      setNewKeyName('');
    } catch (err) {
      setError('Failed to create API key');
      console.error(err);
    }
  };

  const handleDelete = async (name: string) => {
    try {
      await apiKeyApi.delete(name);
      setApiKeys(apiKeys.filter(key => key.name !== name));
    } catch (err) {
      setError('Failed to delete API key');
      console.error(err);
    }
  };

  if (loading) return <div>Loading API keys...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <Input
          placeholder="Enter API key name"
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
        />
        <Button disabled={!newKeyName} onClick={handleCreate}>Generate Key</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Key Hash</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((key) => (
            <TableRow key={key.name}>
              <TableCell>{key.name}</TableCell>
              <TableCell>{key.type}</TableCell>
              <TableCell>{key.hash}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleDelete(key.name)}>Revoke</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
