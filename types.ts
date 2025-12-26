
export interface DocFile {
  id: string;
  name: string;
  path: string;
  content: string;
  type: 'markdown' | 'mermaid' | 'text' | 'survival-guide';
  metadata?: any;
}

export interface DocCategory {
  id: string;
  name: string;
  files: DocFile[];
}

export interface RepoStructure {
  categories: DocCategory[];
}
