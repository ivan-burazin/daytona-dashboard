import { useState } from 'react';
import { WorkspaceTable } from './components/WorkspaceTable';
import { ApiKeyTable } from './components/ApiKeyTable';
import { Button } from './components/ui/button';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'workspaces' | 'apikeys'>('workspaces');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daytona Dashboard</h1>
      <div className="flex gap-2 mb-4">
        <Button
          variant={activeTab === 'workspaces' ? 'default' : 'outline'}
          onClick={() => setActiveTab('workspaces')}
        >
          Workspaces
        </Button>
        <Button
          variant={activeTab === 'apikeys' ? 'default' : 'outline'}
          onClick={() => setActiveTab('apikeys')}
        >
          API Keys
        </Button>
      </div>
      {activeTab === 'workspaces' ? <WorkspaceTable /> : <ApiKeyTable />}
    </div>
  );
}

export default App;
