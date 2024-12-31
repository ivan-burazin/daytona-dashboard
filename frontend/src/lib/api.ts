import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Project {
  id: string;
  name: string;
  repository: {
    url: string;
    branch: string;
  };
  build: {
    command: string;
    target: string;
  };
  runtime: {
    name: string;
    version: string;
  };
  status: 'running' | 'stopped';
}

export interface Workspace {
  id: string;
  name: string;
  projects: Project[];
  status: 'running' | 'stopped';
}

export interface ApiKey {
  name: string;
  type: string;
  hash: string;
}

export const workspaceApi = {
  list: async (): Promise<Workspace[]> => {
    const response = await axios.get(`${API_URL}/workspace`);
    return response.data;
  },
  create: async (workspace: Partial<Workspace>): Promise<Workspace> => {
    const response = await axios.post(`${API_URL}/workspace`, {
      ...workspace,
      id: crypto.randomUUID(),
      target: workspace.target || 'local',
      projects: workspace.projects || []
    });
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/workspace/${id}`);
  }
};

export const apiKeyApi = {
  list: async (): Promise<ApiKey[]> => {
    const response = await axios.get(`${API_URL}/apikey`);
    return response.data;
  },
  create: async (name: string): Promise<ApiKey> => {
    const response = await axios.post(`${API_URL}/apikey/${name}`);
    return response.data;
  },
  delete: async (name: string): Promise<void> => {
    await axios.delete(`${API_URL}/apikey/${name}`);
  }
};
