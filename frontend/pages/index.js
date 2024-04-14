import { useState } from 'react';
import dynamic from 'next/dynamic';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { php } from '@codemirror/lang-php';
import { apiUrl } from '../config';

const CodeMirror = dynamic(() => {
  return import('@uiw/react-codemirror').then(mod => mod.default)
}, { ssr: false });

export default function Home() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analysisResult, setAnalysisResult] = useState('');
  const [errorResult, setErrorResult] = useState('');
  const [debugResult, setDebugResult] = useState('');
  const [loading, setLoading] = useState(false);

  const getLanguageMode = () => {
    switch(language) {
      case 'javascript':
        return javascript();
      case 'cpp':
        return cpp();
      case 'php':
        return php();
      default:
        return javascript();
    }
  };

  const fetchAnalysis = async (endpoint, setState) => {
    const response = await fetch(`${apiUrl}/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language })
    });
    const data = await response.json();
    setState(data.result);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Perform three API requests for different types of analysis
    await Promise.all([
      fetchAnalysis('analyze', setAnalysisResult),
      fetchAnalysis('errors', setErrorResult),
      fetchAnalysis('suggestions', setDebugResult)
    ]);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-center mb-4">Static Code Analysis Tool</h1>
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-2 p-2 border border-gray-300 rounded"
      >
        <option value="javascript">JavaScript</option>
        <option value="cpp">C++</option>
        <option value="php">PHP</option>
      </select>
      <CodeMirror
        value={code}
        height="200px"
        extensions={[getLanguageMode()]}
        onChange={(value, viewUpdate) => {
          setCode(value);
        }}
        className="w-full font-mono text-sm border border-gray-300 rounded shadow-sm"
      />
      <button
        onClick={handleSubmit}
        className={`mt-4 w-full ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`}
        disabled={loading}
      >
        Analyze Code
      </button>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Detailed Code Analysis</h2>
        <pre className="p-2 bg-gray-100 rounded">{analysisResult}</pre>
        <h2 className="text-lg font-semibold">Errors Detected</h2>
        <pre className="p-2 bg-gray-100 rounded">{errorResult}</pre>
        <h2 className="text-lg font-semibold">Corrective Suggestions</h2>
        <pre className="p-2 bg-gray-100 rounded">{debugResult}</pre>
      </div>
    </div>
  );
}
