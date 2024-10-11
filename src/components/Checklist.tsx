'use client';

import { useState, useEffect, ReactNode, isValidElement } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface ChecklistProps {
  children: ReactNode;
}

export default function Checklist({ children }: ChecklistProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const parsedTasks: Task[] = [];

    // Extract text from children and handle line breaks
    const extractText = (child: ReactNode, index: number) => {
      if (typeof child === 'string') {
        // Split the string by line breaks to create individual tasks
        const lines = child.split('\n').filter(Boolean); // filter to remove empty lines
        lines.forEach((line: string, lineIndex: number) => {
          parsedTasks.push({
            id: index * 100 + lineIndex + 1, // Create unique ids
            text: line.trim(),
            completed: false,
          });
        });
      } else if (isValidElement(child)) {
        if (typeof child.props.children === 'string') {
          const lines = child.props.children.split('\n').filter(Boolean);
          lines.forEach((line: string, lineIndex: number) => {
            parsedTasks.push({
              id: index * 100 + lineIndex + 1,
              text: line.trim(),
              completed: false,
            });
          });
        }
      }
    };

    if (Array.isArray(children)) {
      children.forEach((child, index) => extractText(child, index));
    } else {
      extractText(children, 0);
    }

    setTasks(parsedTasks);
  }, [children]);

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-blue-500/20 bg-blue-50/50 px-4 pt-2 leading-6 text-blue-900 dark:border-blue-500/30 dark:bg-blue-500/5 dark:text-blue-200 dark:[--tw-prose-links-hover:theme(colors.blue.300)] dark:[--tw-prose-links:theme(colors.white)]">
      <ul  className="[&>:first-child]:mt-0 [&>:last-child]:mb-0" style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: '8px' }}>
            <label style={{display:'flex', alignItems:'flex-start'}}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                style={{ marginRight: '8px', marginTop:'5px' }}
              />
              {task.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}


