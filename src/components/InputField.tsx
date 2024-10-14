'use client';

import { useState, ChangeEvent } from 'react';

export default function InputField() {
    const [value, setValue] = useState<string>('');
    const [codeSnippet, setCodeSnippet] = useState<string>('');
    const [analysisResult, setAnalysisResult] = useState<{ message: string, status: 'positive' | 'negative' }>({
        message: '',
        status: 'positive',
    });

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCodeSnippet(e.target.value);
    };

    const performWCAGAnalysis = async () => {
        if (value) {
            // Perform WCAG analysis on the URL via API
            const urlAnalysisResult = await analyzeUrlForWCAG(value);
            setAnalysisResult(urlAnalysisResult);
        } else if (codeSnippet) {
            // Perform WCAG analysis on the code snippet
            const codeAnalysisResult = analyzeCodeSnippetForWCAG(codeSnippet);
            setAnalysisResult(codeAnalysisResult);
        } else {
            setAnalysisResult({ message: 'No URL or code snippet provided.', status: 'negative' });
        }
    };

    const analyzeUrlForWCAG = async (url: string): Promise<{ message: string, status: 'positive' | 'negative' }> => {
        try {
            const response = await fetch('/api/wcag-analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            let errorMessage = 'An unknown error occurred';

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            return { message: `Error during WCAG analysis: ${errorMessage}`, status: 'negative' };
        }
    };

    return (
        <div className="w-full">
            <label htmlFor="userInput" className="block text-sm font-medium text-gray-400">
                Enter a URL:
            </label>
            <input
                type="text"
                id="userInput"
                value={value}
                onChange={handleUrlChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter URL..."
            />
            <label htmlFor="codeInput" className="block mt-6 text-sm font-medium text-gray-400">
                Or paste your code snippet:
            </label>
            <textarea
                id="codeInput"
                value={codeSnippet}
                onChange={handleCodeChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Paste your code here..."
                rows={6}
            />
            <button
                onClick={performWCAGAnalysis}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Analyze for WCAG
            </button>

            {analysisResult.message && (
                <div
                    className={`mt-4 p-4 border rounded-md ${analysisResult.status === 'positive' ? 'border-green-300 bg-green-50 text-green-700' : 'border-red-300 bg-red-50 text-red-700'
                        }`}
                >
                    {analysisResult.message}
                </div>
            )}
        </div>
    );
}

export function analyzeCodeSnippetForWCAG(code: string): { message: string, status: 'positive' | 'negative' } {
    const issues: string[] = [];

    // Check for missing `alt` attributes in images
    const imgTagRegex = /<img[^>]*>/g;
    const imgTags = code.match(imgTagRegex);

    if (imgTags) {
        imgTags.forEach((tag) => {
            if (!tag.includes('alt=')) {
                issues.push('Image tag missing `alt` attribute.');
            }
        });
    }

    // Check for missing ARIA roles in interactive elements
    const buttonTagRegex = /<button[^>]*>/g;
    const buttonTags = code.match(buttonTagRegex);

    if (buttonTags) {
        buttonTags.forEach((tag) => {
            if (!tag.includes('aria-label') && !tag.includes('aria-labelledby')) {
                issues.push('Button tag missing `aria-label` or `aria-labelledby`.');
            }
        });
    }

    if (issues.length > 0) {
        return {
            message: `WCAG analysis of the code snippet found issues:\n${issues.join('\n')}`,
            status: 'negative',
        };
    }

    return { message: 'WCAG analysis of the code snippet is positive! No major issues found.', status: 'positive' };
}
