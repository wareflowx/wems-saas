# Features - Version 1

## Overview

This document describes the complete feature set planned for Version 1 of the Employee Management System. These features represent the minimum viable product that delivers core value to HR administrators.

## Feature Areas

### 1. Employee Profile Management
### 2. Document Management
### 3. CACES Certification Tracking
### 4. Medical Visit Management
### 5. Alerts and Notifications
### 6. Dashboard and Overview
### 7. Search and Filtering
### 8. Data Export and Backup
### 9. Reference Data Management

---

## 1. Employee Profile Management

### F1.1: Employee Profile Structure

**Description:** Comprehensive employee profiles containing all relevant HR information.

**Profile Sections:**

#### 1.1.1 Identity Information (Required)
- First name
- Last name
- Date of birth
- Nationality
- Personal address
  - Street
- City
- Postal code
- Country
- Personal phone
- Personal email
- Emergency contact (name, relationship, phone)

#### 1.1.2 Position Information (Required)
- Job title
- Department
- Manager/supervisor
- Start date
- Employment status (active, on leave, terminated)
- Employment type (permanent, fixed-term, internship)

#### 1.1.3 Contract Information (Required)
- Contract type (CDI, CDD, internship, etc.)
- Work schedule (full-time, part-time)
- Weekly hours
- Salary
- Collective agreement

#### 1.1.4 Optional Information
- Profile photo
- Professional email
- Professional phone
- Work location
- Team/group
- Cost center
- Notes

### F1.2: Profile History Tracking

**Description:** Complete audit trail of all changes to employee records.

**History Tracked:**
- Position changes (promotions, transfers, department changes)
- Contract modifications (salary changes, hours changes, contract renewals)
- Status changes (leaves, terminations, rehires)
- Any field-level change with timestamp

**History Display:**
- Chronological list
- Filterable by change type
- Shows previous and new values
- Shows date and user who made change

### F1.3: Employee List View

**Description:** Tabular view of all employees with sorting and filtering.

**Display Columns:**
- Name
- Department
- Job title
- Status (active, on leave, terminated)
- Start date
- Actions (view, edit)

**Capabilities:**
- Sort by any column
- Multi-column sorting
- Quick search by name
- Filter by department, status, employment type
- Save filter configurations

### F1.4: Create/Edit Employee Modal

**Description:** Multi-tab modal for creating and editing employees.

**Tab Structure:**
- **Tab 1: Identity** (5-6 fields)
- **Tab 2: Position** (5-6 fields)
- **Tab 3: Contract** (4-5 fields)
- **Tab 4: Emergency Contact** (3 fields)
- **Optional Section** (collapsed)

**Navigation:**
- Previous/Next buttons between tabs
- Validation per tab before allowing navigation
- Create button only on final tab when all valid

---

## 2. Document Management

### F2.1: Document Upload

**Description:** Import and attach documents to employee records.

**Upload Features:**
- Drag-and-drop or file selection
- Support for multiple file types (PDF, JPG, PNG, DOC, DOCX, XLS, XLSX)
- File size limits (configurable, default 50MB)
- Bulk upload capability (multiple files at once)

**Document Metadata:**
- Document name (from filename, editable)
- Document type (required)
- Description (optional)
- Issue date (optional)
- Expiration date (optional)

### F2.2: Document Organization

**Description:** Documents organized by employee and linked to relevant actions.

**Organization Structure:**
- Documents attached to specific employee
- Documents linked to action types (CACES, medical visit, Contract, Other)
- Automatic categorization by document type

### F2.3: Document Viewing

**Description:** View and download attached documents.

**Viewing Features:**
- Document list per employee
- Preview for common file types (PDF, images)
- Download to local computer
- Open in default application
- Show document metadata (upload date, type, description)

### F2.4: Document Search

**Description:** Search and filter documents across all employees.

**Search Criteria:**
- Document name
- Document type
- Employee
- Upload date range
- Expiration date range

**Results Display:**
- Show document name and type
- Show employee name
- Show upload date
- Show expiration status
- Link to employee profile

---

## 3. CACES Certification Tracking

### F3.1: CACES Records

**Description:** Track equipment certifications (CACES) for each employee.

**CACES Information:**
- Employee
- CACES category (1A, 1B, 3, 5, 7, 9, etc.)
- Date obtained
- Expiration date
- Certificate PDF
- Notes (optional)

**Display Features:**
- Days until expiration calculated automatically
- Color coding (green: valid, yellow: expiring soon, red: expired)
- Sortable by expiration date

### F3.2: CACES Alerts

**Description:** Automatic alerts for CACES approaching expiration.

**Alert Configuration:**
- Configurable warning periods (30, 60, 90 days before expiration)
- Alert appears on dashboard
- Alert shows employee name, CACES category, expiration date
- Alert persists until acknowledged or renewed

### F3.3: CACES History

**Description:** Track CACES renewals and history.

**History Features:**
- Original certification record
- Renewal records with new dates
- Upload new certificates
- Complete audit trail

---

## 4. Medical Visit Management

### F4.1: Medical Visit Records

**Description:** Track all medical visits for each employee.

**Visit Information:**
- Employee
- Visit type (initial, periodic, return-to-work, other)
- Scheduled date
- Actual date (when completed)
- Visit status (scheduled, completed, cancelled)
- Fitness status (fit, unfit, partial fit, pending)
- Medical report (PDF attachment)
- Notes

### F4.2: Medical Visit Scheduling

**Description:** Schedule and track upcoming medical visits.

**Scheduling Features:**
- Schedule new visit with date and type
- Automatic calculation of next required visit date
- Calendar view of scheduled visits
- Reminder alerts for upcoming visits

### F4.3: Return-to-Work Visits

**Description:** Special tracking for return-to-work visits after absences.

**Special Features:**
- Triggered by long-term absences (sick leave, accident)
- Specific fitness assessment
- Work restrictions or accommodations
- Follow-up scheduling

### F4.4: Medical Visit History

**Description:** Complete history of all medical visits per employee.

**History Display:**
- Chronological list
- Visit type and date
- Results and fitness status
- Link to medical report
- Calculated next visit date

### F4.5: Medical Visit Alerts

**Description:** Alerts for upcoming and overdue medical visits.

**Alert Types:**
- Upcoming visit reminders (configurable days before)
- Overdue visit alerts (past due date)
- Missing initial visit alerts for new hires

---

## 5. Alerts and Notifications

### F5.1: Dashboard Alerts

**Description:** Centralized alert display on main dashboard.

**Alert Categories:**
- CACES expired
- CACES expiring soon
- Medical visits overdue
- Medical visits upcoming
- Document expirations (optional for V1)

**Alert Display:**
- Grouped by category
- Count by category
- Most critical alerts highlighted
- Click to view details

### F5.2: Configure Alert Settings

**Description:** Configure when alerts appear.

**Configurable Settings:**
- CACES warning threshold (days before expiration)
- Medical visit reminder threshold (days before visit)
- Enable/disable alert categories
- Alert refresh frequency

### F5.3: Alert Details

**Description:** Detailed view of specific alert.

**Detail Information:**
- Alert type and description
- Affected entity (employee, CACES, etc.)
- Due date or expiration date
- Recommended action
- Link to relevant employee profile or record

---

## 6. Dashboard and Overview

### F6.1: Main Dashboard

**Description:** Primary screen showing workforce overview and action items.

**Dashboard Sections:**

#### 6.1.1 Key Metrics
- Total employees (active)
- New hires this month
- Departures this month
- Employees on leave

#### 6.1.2 Active Alerts
- Count by alert type
- Quick access to alert details
- Most urgent alerts highlighted

#### 6.1.3 Upcoming Deadlines
- Next 7 days
- Next 30 days
- Grouped by type (CACES, visits)

#### 6.1.4 Recent Activity (optional)
- Recently added employees
- Recent document uploads
- Recent updates

### F6.2: Employee Data Export

**Description:** Export employee data to Excel format.

**Export Options:**
- Export all employees
- Export filtered set
- Include visible columns only
- Include history

### F6.3: Data Backup

**Description:** Backup all application data.

**Backup Content:**
- All employee records
- All documents
- All settings
- All reference data

---

## 7. Search and Filtering

### F7.1: Employee Search

**Description:** Quick search by employee name.

**Search Features:**
- Search input field
- Results as user types
- Searches first and last name
- Handles partial matches
- Highlights matching text

### F7.2: Advanced Filtering

**Description:** Complex filtering for employee lists.

**Filter Criteria:**
- Department (multi-select)
- Employment status
- Job title
- Start date range
- Custom filters

### F7.3: Document Search

**Description:** Search across all documents.

**Search Criteria:**
- Document name
- Document type
- Employee
- Date ranges

---

## 8. Data Export and Backup

### F8.1: Excel Export

**Description:** Export employee data to Excel format.

**Export Features:**
- Export all employees or filtered set
- Excel-compatible format
- Headers included
- Formatted data

### F8.2: Data Backup

**Description:** Create complete data backup.

**Backup Content:**
- Database (all employee records)
- Documents (files)
- Settings
- Reference data

### F8.3: Data Restore

**Description:** Restore from backup file.

**Restore Features:**
- Select backup file
- Preview contents
- Warning before overwriting
- Progress indicator
- Verification after restore

---

## 9. Reference Data Management

### F9.1: Manage Departments

**Description:** Manage organizational departments.

**Department Properties:**
- Department name
- Description (optional)
- Manager (optional)
- Active/inactive status

### F9.2: Manage Job Titles

**Description:** Manage job titles/positions.

**Job Title Properties:**
- Title name
- Description (optional)
- Department (optional)
- Active/inactive status

### F9.3: Manage Contract Types

**Description:** Manage employment contract types.

**Contract Types:**
- CDI (permanent)
- CDD (fixed-term)
- Internship
- Apprenticeship
- Temporary
- Custom types

### F9.4: Manage Document Types

**Description:** Manage document categories.

**Document Types:**
- Contract
- Amendment
- Certificate
- CACES
- Medical report
- Identification
- Other (custom)

### F9.5: Manage CACES Categories

**Description:** Manage CACES certification categories.

**Categories:**
- 1A, 1B, 3, 5, 7, 9, etc.
- Custom categories
- Default validity periods

### F9.6: Manage Visit Types

**Description:** Manage medical visit types.

**Visit Types:**
- Initial visit
- Periodic visit
- Return-to-work visit
- Other (custom)

### F9.7: Manage Employment Statuses

**Description:** Manage employment status types.

**Status Types:**
- Active
- On leave (sick, parental, unpaid)
- Notice period
- Terminated
- Resigned

---

## Feature Priority Summary

### Critical Path (Must Have)
- Employee profiles with basic CRUD
- Document upload and viewing
- CACES tracking and expiration alerts
- Medical visit scheduling and alerts
- Dashboard with metrics and alerts
- Basic search and filtering
- Data backup/restore
- Reference data management

### High Priority (Should Have)
- Employee history tracking
- Advanced filtering
- Alert configuration
- Excel export
- Document search

### Medium Priority (Could Have)
- Advanced reporting
- Advanced search
- Bulk operations
- Document preview in-app
- Custom fields

### Deferred (Future Versions)
- Employee self-service
- Mobile access
- Advanced analytics
- Workflow automation
- Integration capabilities

---

## Success Criteria for V1

V1 will be considered successful when:

1. **All critical features implemented** as specified
2. **All HR team can perform daily tasks** efficiently without Excel
3. **No critical bugs** in core workflows
4. **Performance acceptable** for typical operations
5. **Data backup and restore** tested and working
6. **User documentation** completed
7. **HR team trained** and using system daily

---

**Next Steps:** Review [Functional Requirements](./functional-requirements.md) for detailed technical specifications.
