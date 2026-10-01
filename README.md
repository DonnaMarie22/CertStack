# CertStack

**CertStack** is a gamified 8-bit certification learning platform built around active learning, adaptive practice, and up-to-date certification objectives.

## Why it exists

Traditional certification prep often depends on passive reading and memorization. CertStack turns certification objectives into short visual lessons, interactive activities, scenario battles, XP, levels, and later adaptive review.

The project is also intentionally being used as a learning vehicle for SQL, automation, cloud concepts, and AI-assisted development.

## Current vertical slice

The first playable lesson covers **AZ-900: IaaS vs PaaS vs SaaS** using:

- an 8-bit visual explanation
- a responsibility-routing interaction
- an exam-style scenario battle
- persistent XP and level progression via local storage
- an 8-bit Black tech-girl avatar
- responsive web layout for desktop and mobile

The lesson content is aligned to the Microsoft AZ-900 study guide, **skills measured as of July 20, 2026**.

Official source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900

## Roadmap

1. Expand the visual Learn → Play → Battle → Master loop
2. Add certification/world selection
3. Add Cloudflare D1 for SQL-backed progress and content
4. Add adaptive weak-area repetition
5. Add certification objective version tracking
6. Add Python tooling for source monitoring and content validation
7. Add boss-mode mock exams

## Deployment direction

The app is designed to live separately from the main portfolio and later deploy to:

certstack.feliciadonnamarie.com

The first version is intentionally static so it can deploy easily to Cloudflare Pages before the D1/Worker layer is added.
