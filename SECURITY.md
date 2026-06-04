# Security Policy

## Scope

MuscleMap is a client-side rendering library. It has no network, storage, auth
or server component. The most likely concern is the SVG/DOM output rendered
from caller-supplied data.

## Reporting a vulnerability

Please **do not** open a public issue for security problems. Instead, report
privately via GitHub's *Security → Report a vulnerability* (Private Vulnerability
Reporting) on this repository, or contact the maintainer directly.

We'll acknowledge within a reasonable time frame and coordinate a fix and
disclosure.

## Notes for integrators

- `values` / `partValues` are numeric scores and are clamped; they are not
  interpreted as HTML.
- `labels` and `backgroundImage*` are caller-supplied strings rendered into the
  DOM/SVG — pass trusted values (don't feed unsanitized user input as image URLs
  or labels).
