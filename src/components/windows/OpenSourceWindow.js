import React, { useState } from 'react';
import { FaFirefoxBrowser, FaGithub, FaCheckCircle } from 'react-icons/fa';
import { SiKubernetes } from 'react-icons/si';
import '../../styles/windows/OpenSourceWindow.css';

const CONTRIBUTIONS = [
  {
    id: 'kro',
    icon: <SiKubernetes size={28} color="#326CE5" />,
    title: 'Kubernetes Controller (kro)',
    project: 'kubernetes-sigs/kro',
    desc: 'Investigated CEL expression handling in the kro Kubernetes controller by reproducing includeWhen evaluation behavior on the latest main branch. Set up a local Kind cluster, installed CRDs, ran the controller from source, and shared minimal repro cases while discussing error vs skip semantics with maintainers.',
    tech: ['Kubernetes', 'CEL', 'Controllers', 'Open Source'],
    role: 'CEL & CRD Investigator',
    activity: 'Bug Reporter & Reviewer',
    reproType: 'yaml',
    repro: `# Reproducing includeWhen evaluation behavior
kind create cluster --name kro-test
kubectl apply -f config/crd/bases/
go run cmd/main.go --zap-log-level=debug

# Observation:
# error vs skip semantics on empty expressions`
  },
  {
    id: 'wpt',
    icon: <FaCheckCircle size={28} color="#4CAF50" />,
    title: 'Web Platform Tests (WPT)',
    project: 'web-platform-tests/wpt',
    desc: 'Authored and contributed conformance tests for HTML & CSS to the Web Platform Tests suite used by major browser engines including Chromium, Firefox, and WebKit.',
    tech: ['HTML', 'CSS', 'Web Standards'],
    role: 'Test Author / Contributor',
    activity: 'Merged',
    reproType: 'html',
    repro: `<!-- Conformance test checking cross-browser Flexbox layout -->
<link rel="help" href="https://drafts.csswg.org/css-flexbox-1/">
<script src="/resources/testharness.js"></script>
<script src="/resources/testharnessreport.js"></script>
<style>
  .container { display: flex; align-content: space-between; }
</style>`
  },
  {
    id: 'firefox',
    icon: <FaFirefoxBrowser size={28} color="#FF7139" />,
    title: 'Mozilla Firefox',
    project: 'mozilla/gecko-dev (Bugzilla)',
    desc: 'Identified and reported a CSS Flexbox rendering issue in Firefox with a minimal reproducible test case, collaborating with Mozilla engineers via Bugzilla.',
    tech: ['Bugzilla', 'Flexbox', 'Rendering'],
    role: 'Bug Finder',
    activity: 'Resolved / Patched',
    reproType: 'text',
    repro: `Bug 1883921 - CSS Flexbox rendering issue in min-content flexboxes
Status: RESOLVED FIXED
Priority: P3
Severity: normal

Steps to Reproduce:
1. Render nesting element with flex-basis: 0% and flex-grow: 1
2. Observe element height calculated improperly in Gecko.`
  },
  {
    id: 'cicd',
    icon: <FaGithub size={28} color="#fff" />,
    title: 'Library Maintenance & CI/CD',
    project: 'Open Source Projects',
    desc: 'Collaborated with maintainers across open-source projects to debug CI/CD failures, resolve test instability, and perform safe refactors using advanced Git workflows.',
    tech: ['CI/CD', 'Git Rebase', 'Testing'],
    role: 'DevOps & CI Maintainer',
    activity: 'Merged PRs',
    reproType: 'bash',
    repro: `# Clean Git Rebase & Test Workflow
git checkout main
git pull origin main
git checkout feature/stability-fix
git rebase -i main
# Running testing harness locally
npm run test:ci`
  }
];

export default function OpenSourceWindow() {
  const [selectedId, setSelectedId] = useState('kro');

  const selected = CONTRIBUTIONS.find(c => c.id === selectedId) || CONTRIBUTIONS[0];

  return (
    <div className="os-contribs-win">
      {/* Sidebar List */}
      <div className="os-contribs-sidebar">
        <div className="sidebar-title">CONTRIBUTIONS</div>
        <div className="contribs-list">
          {CONTRIBUTIONS.map(c => (
            <button
              key={c.id}
              className={`contrib-item${selectedId === c.id ? ' active' : ''}`}
              onClick={() => setSelectedId(c.id)}
            >
              <span className="contrib-item-icon">{c.icon}</span>
              <div className="contrib-item-meta">
                <span className="contrib-item-title">{c.title}</span>
                <span className="contrib-item-repo">{c.project.split('/')[1] || c.project}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main View Area */}
      <div className="os-contribs-content">
        <div className="contribs-details">
          <div className="contribs-details-header">
            <span className="details-header-icon">{selected.icon}</span>
            <div>
              <h2 className="details-title">{selected.title}</h2>
              <p className="details-repo">{selected.project}</p>
            </div>
            <span className={`details-badge status-${selected.id}`}>
              {selected.activity.toUpperCase()}
            </span>
          </div>

          <div className="details-meta-grid">
            <div className="meta-item">
              <span className="meta-label">ROLE:</span>
              <span className="meta-value">{selected.role}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">STATUS:</span>
              <span className="meta-value attr-green">{selected.activity}</span>
            </div>
          </div>

          <div className="details-desc-section">
            <h3 className="section-label">CONTRIBUTION OVERVIEW</h3>
            <p className="details-desc">{selected.desc}</p>
          </div>

          <div className="details-tech-section">
            <h3 className="section-label">SKILL TREE / TECH USED</h3>
            <div className="details-tags">
              {selected.tech.map(t => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Terminal / Code Repro section */}
          <div className="details-terminal-section">
            <div className="terminal-bar">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span className="terminal-title">repro_manifest.{selected.reproType}</span>
            </div>
            <pre className="terminal-body">
              <code>{selected.repro}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
