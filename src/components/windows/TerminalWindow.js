import React, { useState, useRef, useEffect } from 'react';
import '../../styles/windows/TerminalWindow.css';

const STATIC_COMMANDS = {
  help: `AVAILABLE COMMANDS

PROFILE
  about
  whoami
  education
  experience

PROJECTS
  projects
  project 1
  project 2
  project 3

SKILLS
  skills

SYSTEM
  ls
  pwd
  neofetch
  date
  clear

CONTACT
  contact
  resume
  hire

FUN
  coffee
  motivate
  bossfight
  sudo hire-deepith`,

  about: `DEEPITH N

Software Developer

Passionate about building scalable applications,
AI-powered solutions and impactful software.

Open to opportunities in software engineering,
full-stack development and emerging technologies.`,

  whoami: `deepith@odyssey

Role      : Software Developer
Location  : Bengaluru, India
Status    : Open To Work
Level     : 21`,

  education: `EDUCATION

B.E Computer Science & Engineering

Focused on:
- Software Development
- AI & Machine Learning
- Data Systems
- Problem Solving`,

  experience: `EXPERIENCE

MR Tech Labs Internship

Built:
- Blogging Platform
- Frontend Components
- Backend Features

Duration:
Completed Successfully`,

  skills: `SKILL TREE

Programming
Python      ████████████ Lv 5
Java        █████████░░░ Lv 4
SQL         █████████░░░ Lv 4

Frontend
React       █████████░░░ Lv 4
Next.js     ███████░░░░░ Lv 3

Backend
Node.js     ███████░░░░░ Lv 3

AI / ML
Machine Learning █████████░ Lv 4
NLP              ███████░░░ Lv 3`,

  projects: `MISSIONS

[1] AI Resume Screener
[2] Fake Review Detection
[3] Warehouse AI System
[4] Courier Management System
[5] Portfolio OS
[6] Open Source Contributions`,

  contact: `CONTACT

Email:
deepithdeekshith@gmail.com

GitHub:
github.com/deepith-18

LinkedIn:
linkedin.com`,

  resume: `Opening Resume...`,

  ls: `about
education
experience
skills
projects
contact
resume.pdf`,

  pwd: `/home/deepith`,

  neofetch: `

██████╗ ███╗   ██╗
██╔══██╗████╗  ██║
██║  ██║██╔██╗ ██║
██║  ██║██║╚██╗██║
██████╔╝██║ ╚████║
╚═════╝ ╚═╝  ╚═══╝

User      : Deepith N
Role      : Software Developer
Projects  : 10+
Skills    : 25+
Status    : Online
Version   : 1.0.0`,

  hire: `Excellent choice.

Recommended next steps:

1. Review Resume
2. Schedule Interview
3. Discuss Opportunities`,

  coffee: `Brewing coffee...

██████████████ 100%

Developer energy restored.`,

  motivate: `Keep building.

Every project compounds.

Every line of code matters.`,

  bossfight: `FINAL BOSS

Software Engineering Interview

Difficulty:
██████████

Recommended Weapons:
✓ DSA
✓ Projects
✓ Communication
✓ Confidence`
};

const HIRE_SEQUENCE = [
  'sudo: checking credentials...',
  'sudo: access granted',
  '',
  'Running hire_deepith.sh...',
  '',
  '   Candidate   : Deepith N',
  '   Role        : Software Developer / Data Engineer',
  '   Status      : EXCEPTIONAL CHOICE',
  '',
  '   [████████████████████] 100%',
  '',
  '✓ hire_confirmed.sh executed successfully',
  '✓ Opening calendar for interview...',
];

export default function TerminalWindow() {
  const [lines, setLines] = useState([
    { type: 'system', text: 'DeepithOS Shell v1.0.0' },
    { type: 'system', text: 'Type "help" to see available commands.' },
    { type: 'system', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const addLines = (newLines) => {
    setLines(prev => [...prev, ...newLines]);
  };

  const handleHireSequence = () => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < HIRE_SEQUENCE.length) {
        setLines(prev => [...prev, { type: i >= 8 ? 'success' : 'output', text: HIRE_SEQUENCE[i] }]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 180);
  };

  const callAI = async (userInput) => {
    setLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are the AI assistant embedded in DeepithOS — Deepith N's portfolio OS.
You respond in a terminal/shell style: concise, monospace-friendly, no markdown.
Keep responses under 8 lines. Always stay in character as a helpful OS NPC.
Facts about Deepith:
- Software Developer from Bengaluru, India
- Level 21, specializes in AI, Data Engineering, Full Stack
- Skills: Python (Lv5), Java (Lv4), React (Lv4), ML (Lv4), SQL (Lv4)
- Projects: AI Resume Screener (Legendary), Fake Review Detection (Legendary), Warehouse AI (Epic), Courier Management (Epic)
- Open to work, seeking Data Engineer role
- Contributions to kubernetes-sigs/kro open source project`,
          messages: [{ role: 'user', content: userInput }],
        }),
      });
      const data = await res.json();
      const text = data?.content?.[0]?.text || 'No response.';
      text.split('\n').forEach(line => {
        addLines([{ type: 'ai', text: line }]);
      });
    } catch {
      addLines([{ type: 'error', text: 'AI subsystem unreachable. Check your API setup.' }]);
    }
    setLoading(false);
  };

  const runCommand = async (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    addLines([{ type: 'prompt', text: `deepith@DeepithOS:~$ ${cmd}` }]);

    if (!trimmed) return;

    if (trimmed === 'clear') { setLines([]); return; }

    // Intercept targeted custom inline commands
    if (trimmed === "date") {
      addLines([
        {
          type: "output",
          text: new Date().toLocaleDateString()
        }
      ]);
      return;
    }

    if (trimmed === "project 1") {
      addLines([
        {
          type: "output",
          text: `AI Resume Screener

Stack:
React
Node.js
Python

Status:
Completed`
        }
      ]);
      return;
    }

    if (trimmed === "project 2") {
      addLines([
        {
          type: "output",
          text: `Fake Review Detection

Stack:
Python
Machine Learning
NLP

Status:
Completed`
        }
      ]);
      return;
    }

    if (trimmed === "project 3") {
      addLines([
        {
          type: "output",
          text: `Warehouse AI System

Stack:
React
Node
AI

Status:
Completed`
        }
      ]);
      return;
    }

    if (trimmed === "sudo hire-deepith") {
      handleHireSequence();
      return;
    }

    if (trimmed === 'resume') {
      addLines([{ type: 'output', text: STATIC_COMMANDS.resume }]);
      return;
    }

    // Process general static commands
    if (STATIC_COMMANDS[trimmed]) {
      const out = STATIC_COMMANDS[trimmed];
      out.split('\n').forEach(line => addLines([{ type: 'output', text: line }]));
      return;
    }

    // Unknown command → AI Fallback
    await callAI(cmd);
  };

  const onKeyDown = async (e) => {
    if (e.key === 'Enter' && !loading) {
      const cmd = input.trim();
      setHistory(prev => cmd ? [cmd, ...prev] : prev);
      setHistIdx(-1);
      setInput('');
      if (cmd) await runCommand(cmd);
    } else if (e.key === 'ArrowUp') {
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] || '');
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
      e.preventDefault();
    }
  };

  return (
    <div className="term-win" onClick={() => inputRef.current?.focus()}>
      <div className="term-output">
        {lines.map((line, i) => (
          <div key={i} className={`term-line term-${line.type}`}>
            {line.text}
          </div>
        ))}
        {loading && (
          <div className="term-line term-ai">
            <span className="term-spinner">▋</span> AI processing...
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="term-input-row">
        <span className="term-prompt-label">deepith@DeepithOS:~$</span>
        <input
          ref={inputRef}
          className="term-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={loading}
          autoFocus
          spellCheck={false}
          placeholder="type a command or ask anything..."
        />
      </div>
    </div>
  );
}