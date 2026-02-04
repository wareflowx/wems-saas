# Functional Requirements

## Overview

This document provides detailed functional requirements for the Employee Management System. Each requirement is specified with acceptance criteria and business rules.

## Requirements Organization

Requirements are organized by feature area and identified with unique IDs:
- **FR-E**: Employee Management
- **FR-D**: Document Management
- **FR-C**: CACES Management
- **FR-M**: Medical Visit Management
- **FR-A**: Alerts and Notifications
- **FR-H**: Dashboard
- **FR-S**: Search and Filtering
- **FR-X**: Export and Backup
- **FR-R**: Reference Data

---

## 1. Employee Management Requirements

### FR-E1: Create Employee Profile

**Description:** System shall allow creation of new employee profiles with required information.

**Acceptance Criteria:**
- System presents form with all required fields
- System validates all required fields before saving
- System saves employee record to database
- System generates unique identifier for employee
- System records creation timestamp
- System displays newly created employee in list
- System prevents creation of duplicate employees (same name + start date)

**Required Fields:**
- First name
- Last name
- Date of birth
- Nationality
- Address
- Personal phone
- Personal email
- Emergency contact name
- Emergency contact relationship
- Emergency contact phone
- Job title
- Department
- Start date
- Employment status (default: active)
- Contract type
- Work schedule
- Weekly hours
- Salary

**Business Rules:**
- Start date cannot be in future (unless for planned hires)
- Salary must be greater than zero
- Weekly hours must be between 1 and 48
- Email must be valid format
- Phone number must be valid format

---

### FR-E2: View Employee Profile

**Description:** System shall display complete employee profile in organized manner.

**Acceptance Criteria:**
- System displays all employee information
- Information is grouped into logical sections
- Sections are collapsible/expandable
- Optional fields show placeholder text if not populated
- System displays employee photo if available
- System shows last update timestamp
- System shows last updated by user

**Display Sections:**
1. Identity
2. Position & Employment
3. Contract
4. Emergency Contact
5. Optional Information
6. History
7. Documents
8. CACES
9. Medical Visits

---

### FR-E3: Update Employee Profile

**Description:** System shall allow modification of employee information.

**Acceptance Criteria:**
- System allows editing of all fields
- System validates field values on save
- System saves changes to database
- System records change in history
- System updates all affected displays
- System prevents concurrent editing
- System notifies user of successful save

**Concurrency Control:**
- Record-level locking when opened for editing
- System displays warning if another user is editing
- System prevents save if record was modified by another user
- System shows current values if conflict detected

**History Recording:**
- Records field name, old value, new value
- Records timestamp of change
- Records user who made change
- Preserves complete history

---

### FR-E4: Change Employment Status

**Description:** System shall support changes to employment status.

**Acceptance Criteria:**
- System allows status change (active → on leave/terminated/etc.)
- System prompts for effective date
- System prompts for reason (optional)
- System records status change in history
- System updates employee list accordingly
- System handles status-based filtering

**Status Types:**
- Active
- On leave (sick, parental, unpaid)
- Notice period
- Terminated
- Resigned

---

### FR-E5: Delete Employee Record

**Description:** System shall allow deletion of employee records with safeguards.

**Acceptance Criteria:**
- System requires confirmation before deletion
- System warns about associated data (documents, CACES, visits)
- System offers to archive instead of delete
- System removes record from active lists if deleted
- System preserves data in audit log if deleted

**Business Rules:**
- Cannot delete if critical documents exist (optional for V1)
- Archive preferred over permanent deletion
- Deleted records not recoverable (except from backup)

---

## 2. Document Management Requirements

### FR-D1: Upload Document

**Description:** System shall allow file upload and attachment to employee records.

**Acceptance Criteria:**
- System presents file selection dialog
- System accepts drag-and-drop of files
- System validates file type
- System validates file size
- If invalid: system shows error, HR selects different file
- System prompts for document metadata
- System stores file in storage
- System links document to employee
- System shows upload progress
- System confirms successful upload

**Supported File Types:**
- PDF (.pdf)
- Images (.jpg, .jpeg, .png, .gif)
- Documents (.doc, .docx)
- Spreadsheets (.xls, .xlsx)

**File Size Limits:**
- Maximum 50MB per file
- Configurable by administrator

**Document Metadata:**
- Document name (from filename, editable)
- Document type (required)
- Description (optional)
- Issue date (optional)
- Expiration date (optional)

---

### FR-D2: View Document List

**Description:** System shall display list of documents for an employee.

**Acceptance Criteria:**
- System shows all documents linked to employee
- Documents grouped by type
- Display shows document name, type, upload date
- Display shows expiration status if applicable
- System provides options to open, download, delete
- System sorts documents by date (newest first)

---

### FR-D3: Download Document

**Description:** System shall allow downloading of documents.

**Acceptance Criteria:**
- System prompts for save location
- System downloads file with original name
- System preserves file integrity
- System handles large files without timeout

---

### FR-D4: Link Document to Action

**Description:** System shall allow linking documents to specific actions.

**Acceptance Criteria:**
- System allows selection of action type
- Action types include: CACES, Medical Visit, Contract, Other
- If CACES/medical visit: HR selects specific record
- System stores link in document metadata
- System displays linked document in action section

**Business Rules:**
- Document can be linked to only one action type
- Linking can be changed after upload
- Unlinking doesn't delete document

---

### FR-D5: Delete Document

**Description:** System shall allow removal of documents with safeguards.

**Acceptance Criteria:**
- System requires confirmation before deletion
- System warns if document is linked to action
- System removes file from storage
- System removes document references
- System records deletion in history

---

## 3. CACES Management Requirements

### FR-C1: Add CACES Certification

**Description:** System shall allow recording of CACES certifications.

**Acceptance Criteria:**
- System presents form for CACES information
- Required fields: category, date obtained, expiration date
- System validates dates (expiration after obtained date)
- System allows certificate upload
- System saves CACES record
- System links to employee
- System calculates days until expiration

**CACES Information:**
- Employee (required)
- Category (required, e.g., 1A, 1B, 3, 5, 7, 9)
- Date obtained (required)
- Expiration date (required)
- Certificate file (optional)
- Notes (optional)

---

### FR-C2: Update CACES Information

**Description:** System shall allow modification of CACES records.

**Acceptance Criteria:**
- System allows editing of CACES fields
- System allows upload of new certificate
- System updates expiration date
- System recalculates days until expiration
- System records changes in history

---

### FR-C3: View Expiring CACES

**Description:** System shall identify CACES certifications approaching expiration.

**Acceptance Criteria:**
- System filters CACES by expiration date
- System shows CACES expiring within configured threshold
- System displays employee name and category
- System shows days until expiration
- System provides link to employee profile

**Expiration Categories:**
- Expired (0 days)
- Critical (1-7 days)
- Warning (8-30 days, configurable)
- Upcoming (31-90 days, configurable)

---

### FR-C4: CACES Renewal

**Description:** System shall support CACES renewal workflow.

**Acceptance Criteria:**
- System allows update of expiration date
- System allows upload of new certificate
- System maintains history of renewal
- System removes alert upon renewal
- System recalculates expiration status

---

## 4. Medical Visit Management Requirements

### FR-M1: Schedule Medical Visit

**Description:** System shall allow scheduling of medical visits for employees.

**Acceptance Criteria:**
- System presents scheduling form
- Required fields: employee, visit type, scheduled date
- System validates date
- System saves visit record
- System sets status to "scheduled"
- System calculates next required visit date

**Visit Types:**
- Initial visit (for new hires)
- Periodic visit (regular checkups)
- Return-to-work visit (after absences)
- Other (custom)

---

### FR-M2: Record Visit Completion

**Description:** System shall allow recording of visit results.

**Acceptance Criteria:**
- System allows marking visit as completed
- System prompts for actual visit date
- System prompts for fitness status
- System allows upload of medical report
- System allows entry of notes/restrictions
- System changes status to "completed"
- System schedules next visit if required

**Fitness Status:**
- Fit (apt)
- Unfit (inapte)
- Partial fit (apt avec restrictions)
- Pending (en attente)

---

### FR-M3: View Upcoming Visits

**Description:** System shall display scheduled and overdue medical visits.

**Acceptance Criteria:**
- System shows visits sorted by date
- System highlights overdue visits
- System shows visit type and employee
- System provides link to employee profile

---

### FR-M4: Return-to-Work Process

**Description:** System shall support return-to-work visit process.

**Acceptance Criteria:**
- System identifies return-to-work requirement
- System allows scheduling of specific return-to-work visit
- System allows recording of fitness assessment
- System allows entry of work restrictions
- System tracks follow-up requirements

---

### FR-M5: Medical Visit Alerts

**Description:** System shall generate alerts for medical visits.

**Alert Types:**
- Upcoming visit reminders (configurable days before)
- Overdue visit alerts (past due date)
- Missing initial visit alerts for new hires

---

## 5. Alerts and Notifications Requirements

### FR-A1: Display Dashboard Alerts

**Description:** System shall show active alerts on main dashboard.

**Alert Categories:**
- CACES expired
- CACES expiring soon
- Medical visits overdue
- Medical visits upcoming
- Document expirations (optional)

**Alert Display:**
- Grouped by category
- Count by category
- Most urgent alerts highlighted
- Click to view details
- Color-coded by severity

### FR-A2: Generate CACES Expiration Alerts

**Description:** System shall automatically generate alerts for expiring CACES.

**Acceptance Criteria:**
- System scans CACES records daily
- System identifies CACES expiring within threshold
- System creates alert for each expiring CACES
- System includes employee name, category, expiration date
- System prioritizes by urgency

**Alert Thresholds (configurable):**
- 90 days before expiration
- 60 days before expiration
- 30 days before expiration
- On expiration day

---

### FR-A3: Generate Medical Visit Alerts

**Description:** System shall automatically generate alerts for medical visits.

**Acceptance Criteria:**
- System identifies scheduled visits within threshold
- System identifies overdue visits
- System creates alert for each visit
- System includes employee name, visit type, date
- System prioritizes overdue over upcoming

---

### FR-A4: Configure Alert Settings

**Description:** System shall allow configuration of alert thresholds.

**Acceptance Criteria:**
- System allows setting CACES warning period
- System allows setting medical visit reminder period
- System allows enabling/disabling alert categories
- System persists settings across sessions
- System applies settings immediately

---

### FR-A5: Alert Acknowledgment

**Description:** System shall allow acknowledgment of alerts.

**Acceptance Criteria:**
- System allows marking alert as acknowledged
- System removes acknowledged from active list
- System stores acknowledgment timestamp
- System allows viewing acknowledged alerts
- System allows unacknowledging if needed

---

## 6. Dashboard Requirements

### FR-H1: Display Key Metrics

**Description:** System shall show workforce metrics on dashboard.

**Metrics:**
- Total active employees
- New hires this month
- Departures this month
- Employees on leave

---

### FR-H2: Display Active Alerts

**Description:** System shall show summary of active alerts.

**Alert Categories:**
- Count by alert type
- Most critical alerts
- Quick access to alert details

---

### FR-H3: Display Upcoming Deadlines

**Description:** System shall show upcoming deadlines.

**Deadlines:**
- Next 7 days (detailed list)
- Next 30 days (summary counts)
- Grouped by type (CACES, visits)

---

## 7. Search and Filtering Requirements

### FR-S1: Quick Employee Search

**Description:** System shall provide quick search by employee name.

**Search Fields:**
- Name (first, last, or both)
- Employee ID (optional)

**Search Behavior:**
- Real-time results as user types
- Fuzzy matching for names
- Highlights matching text

---

### FR-S2: Advanced Filtering

**Description:** System shall allow complex filtering of employee lists.

**Filter Criteria:**
- Department (multi-select)
- Employment status
- Employment type
- Job title
- Start date range
- Custom filters

---

### FR-S3: Document Search

**Description:** System shall allow searching across all documents.

**Search Fields:**
- Document name
- Document type
- Employee name
- Date ranges

---

## 8. Export and Backup Requirements

### FR-X1: Export to Excel

**Description:** System shall allow export of employee data to Excel format.

**Export Options:**
- Export all employees
- Export filtered set
- Include visible columns
- Include history

---

### FR-X2: Data Backup

**Description:** System shall allow creation of complete data backup.

**Backup Content:**
- Database (all employee records)
- Documents (files)
- Settings
- Reference data

---

### FR-X3: Data Restore

**Description:** System shall allow restoration from backup file.

**Restore Features:**
- Select backup file
- Preview backup contents
- Warning before overwriting current data
- Progress indicator
- Verification after restore

---

### FR-X4: Scheduled Backup

**Description:** System shall support automatic scheduled backups.

**Acceptance Criteria:**
- System allows configuring backup schedule
- System allows setting backup time
- System allows setting backup location
- System performs backup automatically
- System logs backup completion
- System alerts on failure

---

## 9. Reference Data Requirements

### FR-R1: Manage Departments

**Description:** System shall allow management of organizational departments.

**Management Actions:**
- Add departments
- Edit department details
- Delete departments (if not in use)
- Mark as inactive

---

### FR-R2: Manage Job Titles

**Description:** System shall allow management of job titles.

**Management Actions:**
- Add job titles
- Edit job title details
- Delete job titles (if not in use)
- Mark as inactive

---

### FR-R3: Manage Reference Lists

**Description:** System shall allow management of various reference lists.

**Reference Lists:**
- Contract types
- Document types
- CACES categories
- Visit types
- Employment statuses

**Management Actions:**
- Add custom items
- Edit items
- Delete items (if in use)
- Reordering

---

## Data Validation Rules

### Employee Data
- Email must match valid email format
- Phone numbers must match valid format
- Salary must be positive number
- Weekly hours must be 1-48
- Birth date must be at least 16 years before hire date
- Start date cannot be more than 30 days in future

### Document Data
- File size cannot exceed configured maximum
- File type must be in supported list
- Expiration date must be after issue date (if both provided)

### CACES Data
- Expiration date must be after date obtained
- Category must be in predefined list

### Medical Visit Data
- Scheduled date must be today or in future
- Actual date must be on or after scheduled date (when completed)

---

## Business Rules Summary

### Employment Status
- New hires default to "active" status
- Terminated employees should be archived after X days
- Employees on leave should appear separately in counts

### Documents
- At least one contract document should exist per employee
- Expired documents should generate alerts
- Documents cannot exceed storage limits

### CACES
- CACES validity period typically 5 years (configurable)
- Renewals should be tracked before expiration
- Expired CACES should prevent certain activities (optional)

### Medical Visits
- Initial visit required within X days of hire
- Periodic visits required every X years (based on job type)
- Return-to-work visit required after absences > X days

---

**Next Steps:** Review [Architecture Requirements](./architecture-requirements.md) for technical specifications.
