# Business Requirement Document (BRD)

## SaaS License Optimization Platform for SCBX Group

**Version:** 1.3
**Date:** September 27, 2025
**Author:** Group Technology Office

---

## 1. Introduction

### 1.1. Purpose

This document outlines the business requirements for a new SaaS License Optimization Platform. The platform is designed to address the challenges of fragmented SaaS (Software as a Service) procurement and management across the 10 subsidiaries of SCBX group. It will serve as a centralized hub for discovering, managing, and optimizing the entire SaaS portfolio.

### 1.2. Problem Statement

Currently, each SCBX subsidiary procures and manages its SaaS applications independently. This decentralized approach leads to:

- **Cost Inefficiency:** Missed opportunities for volume discounts and enterprise-level agreements.
- **Redundant Spending:** Multiple subsidiaries purchasing similar or overlapping software.
- **Underutilization:** Lack of visibility into license usage, resulting in payment for unused seats.
- **Operational Overhead:** Inefficient and manual processes for provisioning licenses to new employees and departments.
- **Security & Compliance Risks:** A scattered SaaS landscape makes it difficult to enforce security standards and manage data governance.

### 1.3. Vision

To create a unified platform that provides complete visibility into the group's SaaS ecosystem, leveraging data to drive cost savings, automate procurement and provisioning workflows, and enhance strategic decision-making.

---

## 2. User Personas & Scenarios

### 2.1. Group CTO / Purchasing

- **Goal:** To achieve a holistic view of SaaS spending across all 10 subsidiaries and identify major cost-saving opportunities.
- **Scenario:** The Group CTO logs in to a dashboard showing total SaaS spend, spend per subsidiary, and a prioritized list of consolidation opportunities. They drill down into a recommendation to consolidate three different project management tools into one enterprise agreement, viewing a projected savings of 25% annually.

### 2.2. Subsidiary CTO

- **Goal:** To manage their subsidiary's SaaS budget effectively and ensure that their teams have the tools they need without overspending.
- **Scenario:** A Subsidiary CTO receives an automated quarterly report showing underutilized licenses within their business unit. They see that 15 licenses for a data visualization tool haven't been used in over 90 days. They use the platform to de-provision those licenses, freeing up budget for a new software request.

### 2.3. HR Manager

- **Goal:** To streamline the onboarding process for new hires, ensuring they have the necessary software access from day one.
- **Scenario:** An HR Manager is onboarding a new "Digital Marketing Manager." They upload the job description to the platform, which automatically suggests a standard package of SaaS tools (e.g., HubSpot, Google Analytics, SEMrush). With one click, the system sends provisioning requests to the respective license owners.

### 2.4. New Department Manager

- **Goal:** To quickly equip a new team or function with the right set of tools without navigating complex procurement processes.
- **Scenario:** A manager is setting up a new "Customer Success" department. They use a wizard in the platform, selecting "Customer Success" as the business function. The system recommends a baseline of apps like Salesforce, Zendesk, and Slack. It also shows that another subsidiary already has an enterprise plan for Zendesk with spare seats, presenting an immediate consolidation opportunity.

## 3. Functional Requirements & Features

### FR-1: Group-Wide SaaS Portfolio Mapping

#### Feature 1.1: Centralized SaaS Inventory Dashboard
- A comprehensive dashboard displaying all SaaS applications used across the group.
- Filters by subsidiary, business function (e.g., Marketing, Engineering), cost, and contract renewal date.
- Visualizations of total group spend, spend per subsidiary, and spend by category.

#### Feature 1.2: Consolidation Opportunity Engine
- The system will map all applications to a standardized business function map.
- It will utilize an LLM to analyze the feature descriptions of different SaaS products to identify functional overlaps (e.g., recognizing that Asana, Jira, and Trello all serve the "Project Management" function).
- The engine will generate and rank consolidation opportunities based on potential cost savings and user overlap.

### FR-2: License Utilization & Optimization

#### Feature 2.1: AD SSO Integration
- The platform will integrate with the group's Active Directory (AD) via Single Sign-On (SSO) to track user login activity for connected SaaS applications.

#### Feature 2.2: Underutilization Identifier
- A dashboard to view license utilization for each SaaS product.
- It will flag users or entire licenses that show no login activity within a configurable period (e.g., 30, 60, 90 days).

#### Feature 2.3: Automated De-provisioning Workflow
- Ability for admins (Group or Subsidiary CTO) to select underutilized licenses and trigger a de-provisioning workflow, notifying the user and freeing up the seat.

### FR-3: Automated New Joiner Provisioning

#### Feature 3.1: Job Description Analyzer
- An interface for HR managers to paste or upload a new job description.
- The system uses an LLM to parse the text and recommend a pre-defined "SaaS Role Package" based on keywords (e.g., "Python developer" suggests licenses for GitHub, VS Code, and Jira).

#### Feature 3.2: Automated Provisioning Requests
- Once a package is confirmed, the system automatically sends an email or notification to the designated owner/admin of each SaaS license to set up the new user account.
- Tracks the status of each request (Pending, Approved, Provisioned).

### FR-4: New Department & Function Setup Wizard

#### Feature 4.1: Function-Based SaaS Recommendation
- A guided wizard for managers to define a new department's primary function.
- Based on the selected function, the system recommends a standard set of essential SaaS applications.

#### Feature 4.2: Cross-Subsidiary Contract Discovery
- When recommending an application, the system will check if any other subsidiary already has an active contract.
- It will highlight opportunities to add the new department to an existing group or enterprise plan to leverage volume pricing.

---

## 4. UX/UI Screen Mockups (Conceptual)

### Screen 1: Group CTO - Main Dashboard

- **Layout:** A modern, widget-based dashboard.
- **Key Widgets:**
  - "Total Group SaaS Spend (Annualized)" - Large KPI.
  - "Top 5 Consolidation Opportunities" - A list with projected annual savings for each.
  - "Spend by Subsidiary" - A bar chart.
  - "Spend by Business Function" - A donut chart.
  - "Upcoming Renewals (Next 90 Days)" - A timeline/list view.

### Screen 2: HR - New Hire Onboarding

- **Layout:** A simple, clean single-page interface.
- **Components:**
  - A large text box labeled "Paste Job Description Here."
  - A button "Analyze & Suggest Software."
  - Below, a section appears titled "Recommended SaaS Package for [Job Title]" with a checklist of software logos, names, and plan types.
  - A "Submit Provisioning Request" button at the bottom.
  - On click of "Submit Provisioning Request": A modal window appears titled "Confirm Request Recipients". This modal lists the system administrators for the required applications (e.g., Admin 1, Admin 2, Admin 3, Admin 4). Each name is accompanied by a checkbox (toggled on by default) to include them in the email notification.
  - A final "Send Requests" button inside the modal to dispatch the emails to the selected administrators.

### Screen 3: Subsidiary CTO - License Utilization View

- **Layout:** A table-driven view.
- **Controls:** A dropdown to select a specific SaaS Application (e.g., "Salesforce").
- **Table Columns:** "User Name," "User Email," "Department," "Last Login Date (from SSO)," "Status (Active/Inactive)."
- **Functionality:** Checkboxes next to each "Inactive" user to select them for a bulk "De-provision" action.

### Screen 4: Manager - New Department Setup Wizard

- **Layout:** A multi-step modal window.
- **Step 1:** "What is your new department's primary function?" (Dropdown: Marketing, Sales, Engineering, etc.).
- **Step 2:** "Upload JD of team members" - An interface to upload job description files for key roles in the new department. This will refine the software recommendations based on specific skills mentioned.
- **Step 3:** "Recommended Software" - Displays a card for each suggested app (e.g., Slack), now tailored by function and JD analysis. The card contains a "Consolidation Alert: SCB TechX already has an enterprise plan with 25 available seats. Add your team to this plan to save 100% on licensing costs."
- **Step 4:** A summary page to confirm the requests.

### Screen 5: Group CTO - Group Tool Rationalization

- **Layout:** A full-screen, tabbed interface for deep analysis.
- **Tab:** "Group Tool Rationalization" is selected.
- **Controls:** A set of toggle buttons at the top: [Cost Per User] | [Cost Per Active User] | [User Satisfaction].
- **Visualization:** A matrix of horizontal bar charts.
  - **Columns:** The top-level columns represent the SCBX subsidiaries: Bank, DataX, TechX, InnovestX, CardX.
  - **Rows:** Hierarchical rows for application categories and sub-categories. For each sub-category, a horizontal bar chart shows which tools are used by each subsidiary and the corresponding metric value from the toggle.
  - **Example Data Display (when "Cost Per User" is toggled):**
    - **1. Project Management**
      - **1.1 Software task management:**
        - Bank: A bar representing Jira (e.g., $15/user/mo).
        - DataX: A bar representing Monday (e.g., $20/user/mo).
        - TechX: A bar representing Jira (e.g., $12/user/mo - volume discount).
        - InnovestX: A bar representing Jira (e.g., $15/user/mo).
        - CardX: (Empty if no tool is used).
      - **1.2 Timeline management:**
        - Bank: A bar for Microsoft Project.
        - DataX: A bar for Monday.
        - TechX: A bar for Jira.
