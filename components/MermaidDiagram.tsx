
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'JetBrains Mono',
});

interface MermaidDiagramProps {
  content: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ content }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute('data-processed');
      mermaid.contentLoaded();
    }
  }, [content]);

  return (
    <div className="flex justify-center bg-gray-900/50 p-8 rounded-lg border border-gray-800 overflow-x-auto">
      <div className="mermaid" ref={ref}>
        {content}
      </div>
    </div>
  );
};

export default MermaidDiagram;
