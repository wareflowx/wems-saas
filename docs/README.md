# Employee Management System - Documentation

## Overview

This project is an internal desktop application designed to streamline HR and administrative management for small to medium-sized enterprises (11-50 employees). The application focuses on centralizing employee profiles, administrative documents, and critical alerts (CACES, medical visits) in a user-friendly interface.

## Project Context

### Current Situation
- HR team currently manages employee data using Excel spreadsheets and manual file systems
- No centralized system for tracking document expirations and compliance requirements
- Risk of missing critical deadlines (CACES renewals, medical visits, administrative documents)
- Time-consuming manual processes for data retrieval and reporting

### Target Users
- **Primary Users:** HR administrators and managers (5+ concurrent users)
- **Usage Environment:** Office-based, desktop-only application
- **Access Method:** Shared network environment with offline capability

## Project Objectives

### Primary Goals
1. **Time Savings:** Reduce time spent on administrative tasks through centralized management
2. **Reliability:** Minimize errors and missed deadlines through automated alerts
3. **Visibility:** Provide clear overview of workforce status and compliance requirements
4. **Centralization:** Consolidate all employee information and documents in one place

### Success Metrics
- Reduced time for employee data retrieval
- Zero missed deadlines for critical documents and medical visits
- Improved data consistency across HR team
- Easy onboarding for new HR team members

## Documentation Structure

This documentation is organized into the following sections:

### [Product Vision](./product-vision.md)
Detailed description of the product vision, target audience, and strategic objectives.

### [User Stories](./user-stories.md)
Detailed user stories organized by user type and feature area.

### [Features - Version 1](./features-v1.md)
Complete specification of features planned for the initial release.

### [Functional Requirements](./functional-requirements.md)
Detailed functional requirements organized by feature area.

### [Architecture Requirements](./architecture-requirements.md)
Technical architecture requirements, constraints, and design principles.

### [Workflows & Processes](./workflows.md)
Description of key business workflows and processes the application must support.

### [Data Model](./data-model.md)
Overview of the data structure and relationships without technical implementation details.

### [Pages & Screens](./pages-and-screens.md)
Complete list of all pages, modals, and UI components with navigation structure.

### [Pages & Screens - Detailed](./pages-detailed.md)
In-depth specifications for Documents, CACES, Medical Visits, Alerts, and Settings pages.

## Project Priorities

The project follows these priority order:

1. **Usability:** Simple, intuitive interface requiring minimal training
2. **Reliability:** Robust application that handles concurrent usage safely
3. **Development Speed:** Fast delivery of V1 with iterative improvements

## Scope - Version 1

The initial release focuses on core functionality:

- Employee profile management with comprehensive information
- Document import and organization (contracts, certificates, CACES, medical visits)
- Alert system for upcoming deadlines and expirations
- Dashboard with key metrics and action items

Future versions will expand based on user feedback and business needs.

## Technology Stack

### Frontend
- **React** + TypeScript - Component-based UI framework
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Data fetching and state management
- **TanStack Table** - Powerful table components
- **shadcn/ui** - Accessible UI component library
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

### Desktop
- **Electron** - Cross-platform desktop framework
- **Vite** - Fast build tool

### Data
- **better-sqlite3** - Synchronous SQLite database for Electron
- **Drizzle ORM** - Type-safe SQL ORM for TypeScript

## Navigation

- **Start Here:** Read the [Product Vision](./product-vision.md) to understand the project context
- **For Developers:** Review [Architecture Requirements](./architecture-requirements.md) and [Functional Requirements](./functional-requirements.md)
- **For Product:** See [User Stories](./user-stories.md) and [Features V1](./features-v1.md)
- **For Design:** Reference [Workflows](./workflows.md) and [Pages & Screens](./pages-and-screens.md)

## Document Status

- **Version:** 1.0
- **Last Updated:** February 2025
- **Status:** Requirements complete, architecture decisions finalized
- **Next Review:** Before development start
