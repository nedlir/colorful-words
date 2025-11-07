# Word Cloud Generator

A full-stack application that fetches random words, calculates their frequency, and visualizes them as an interactive word cloud with real-time updates.

## Quick Start

```bash
docker-compose up --build
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:3001`

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Deployment**: Docker + Docker Compose

## Scaling Function

Word font sizes are scaled logarithmically based on frequency using the formula:

```
fontSize = minSize + (log(frequency) / log(maxFrequency)) * (maxSize - minSize)
```

This ensures visual distinction between common and rare words while keeping sizes readable (12px-64px range).

(I used chatGPT to actually get this right... there might be a better way to do it, but I was short on time)

---

## what I would do if I had more time:

### backend

1. tests with vitest

2. swagger - documentation

3. logger (maybe something like Pino for a project of this scale)

4. roll my own service of random word on a different port since the ones I was using were limiting me for suspicion of DDOS

### front

1. add SVG logos for HOME and WORDS in the nav bar.

2. better typing

## Scaling considerations

- If this was a real life project I'd use redis to cache the words received (would use a docker container for it)

- rate limiting on the backend (probably nginx)
