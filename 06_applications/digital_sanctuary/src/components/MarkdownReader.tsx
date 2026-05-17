import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownReaderProps {
  path: string;
  title: string;
  onBack: () => void;
  githubUrl?: string;
}

const GITHUB_RAW = 'https://raw.githubusercontent.com/SabaFTW/ConsMAP/main';

const mdComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-xl font-light mt-8 mb-3 first:mt-0" style={{ color: '#d8e8d8' }}>{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-light mt-6 mb-2" style={{ color: 'rgba(216,232,216,0.9)' }}>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-medium mt-5 mb-2" style={{ color: 'rgba(216,232,216,0.82)' }}>{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-sm font-medium mt-4 mb-1" style={{ color: 'rgba(216,232,216,0.75)' }}>{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-sm leading-[1.9] mb-4" style={{ color: 'rgba(216,232,216,0.75)' }}>{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 pl-5 space-y-1.5" style={{ listStyleType: 'disc' }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 pl-5 space-y-1.5" style={{ listStyleType: 'decimal' }}>{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-sm leading-[1.75]" style={{ color: 'rgba(216,232,216,0.72)' }}>{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote
      className="pl-4 my-5 italic"
      style={{ borderLeft: '2px solid rgba(92,184,112,0.38)', color: 'rgba(216,232,216,0.6)' }}
    >
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre
      className="rounded-xl px-4 py-4 mb-4 overflow-x-auto"
      style={{ background: 'rgba(15,20,15,0.72)', border: '1px solid rgba(71,85,105,0.35)' }}
    >
      {children}
    </pre>
  ),
  code: ({ children, className }) => {
    const isBlock = !!className;
    return isBlock ? (
      <code className="text-xs font-mono" style={{ color: 'rgba(216,232,216,0.82)' }}>{children}</code>
    ) : (
      <code
        className="px-1.5 py-0.5 rounded text-[11px] font-mono"
        style={{ background: 'rgba(92,184,112,0.12)', color: '#5cb870' }}
      >
        {children}
      </code>
    );
  },
  hr: () => (
    <hr className="my-6" style={{ border: 'none', borderTop: '1px solid rgba(71,85,105,0.35)' }} />
  ),
  strong: ({ children }) => (
    <strong style={{ color: '#d8e8d8', fontWeight: 600 }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em style={{ color: 'rgba(216,232,216,0.72)', fontStyle: 'italic' }}>{children}</em>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#5cb870', textDecoration: 'underline', textDecorationColor: 'rgba(92,184,112,0.35)' }}
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="text-sm w-full" style={{ borderCollapse: 'collapse' }}>{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th
      className="text-left px-3 py-2 text-[10px] font-mono uppercase tracking-wider"
      style={{ color: 'rgba(92,184,112,0.7)', borderBottom: '1px solid rgba(71,85,105,0.4)' }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td
      className="px-3 py-2 text-xs"
      style={{ color: 'rgba(216,232,216,0.7)', borderBottom: '1px solid rgba(71,85,105,0.2)' }}
    >
      {children}
    </td>
  ),
};

const MarkdownReader: React.FC<MarkdownReaderProps> = ({ path, title, onBack, githubUrl }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setContent('');
    fetch(`${GITHUB_RAW}${path}`)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [path]);

  return (
    <div className="max-w-2xl mx-auto py-10 md:py-14 px-5">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        onClick={onBack}
        className="text-[10px] font-mono tracking-[0.2em] uppercase mb-8 block hover:opacity-100 transition-opacity duration-300"
        style={{ color: '#5cb870' }}
      >
        ← back to archive
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="text-[10px] font-mono uppercase tracking-[0.28em] mb-2" style={{ color: 'rgba(92,184,112,0.5)' }}>
          ConsMAP / Archive
        </div>
        <h1 className="text-xl md:text-2xl font-light tracking-tight" style={{ color: '#d8e8d8' }}>
          {title}
        </h1>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-[9px] font-mono uppercase tracking-[0.18em] hover:opacity-100 transition-opacity"
            style={{ color: 'rgba(92,184,112,0.35)' }}
          >
            View source on GitHub ↗
          </a>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {loading && (
          <p className="text-[10px] font-mono animate-pulse" style={{ color: 'rgba(92,184,112,0.4)' }}>
            Fetching from archive…
          </p>
        )}
        {error && (
          <div className="rounded-2xl border px-4 py-4" style={{ borderColor: 'rgba(71,85,105,0.4)', background: 'rgba(15,20,15,0.5)' }}>
            <p className="text-xs font-mono mb-2" style={{ color: 'rgba(216,232,216,0.45)' }}>
              Could not load document ({error}).
            </p>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono uppercase tracking-[0.16em]"
                style={{ color: '#5cb870' }}
              >
                Open on GitHub ↗
              </a>
            )}
          </div>
        )}
        {!loading && !error && (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {content}
          </ReactMarkdown>
        )}
      </motion.div>
    </div>
  );
};

export default MarkdownReader;
