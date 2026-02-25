---
name: user-management
description: Guide for user flows, authentication, and access control (authorization) rules. Use this skill when modifying authentication flows, routing logic, middlewares, pricing redirects, or subscription-based page access restrictions.
---

# User Management & Access Control

## Overview

This skill defines the authentication flows and authorization rules for the system. Adhere strictly to these rules to ensure appropriate routing and access control for users based on their authentication status and subscription tier.

## Authentication Flows

### New User
1. Clicks on the **Sign Up** button
2. Signs up using a Google account
3. Is **Redirected** to the `/pricing` page
4. Selects a subscription tier (Free Access / Full Access)
5. Is **Redirected** to the `/dashboard`

### Existing User
1. Clicks on the **Sign In** button
2. Signs in using a Google account
3. Is **Redirected** to the `/dashboard`

## Authorization Rules (User Restrictions)

The following matrix describes what specific user states can and cannot access.

### 1) Free Access Subscriber
**Condition:** Is an existing user & Is signed in & Has Free Access Subscription
- **CAN Access:**
  - Any public pages
  - `/dashboard`
  - `/dashboard/user-profile`
  - `/dashboard/payment`
- **CANNOT Access:**
  - `/dashboard/moon`
  - `/dashboard/mars`

### 2) Full Access Subscriber
**Condition:** Is an existing user & Is signed in & Has Full Access Subscription
- **CAN Access:**
  - Any public pages
  - `/dashboard`
  - `/dashboard/user-profile`
  - `/dashboard/payment`
  - `/dashboard/moon`
  - `/dashboard/mars`

### 3) Unauthenticated User (Logged Out)
**Condition:** Is an existing user & Is not signed in & Has any Subscription
- **CANNOT Access:**
  - `/dashboard`
  - `/dashboard/user-profile`
  - `/dashboard/payment`
  - `/dashboard/moon`
  - `/dashboard/mars`

### 4) Incomplete Subscription User
**Condition:** Is an existing user & Signed in & Has NO Subscription selected
- **CAN Access:**
  - Any public pages
  - `/pricing`
- **CANNOT Access:**
  - `/dashboard`
  - `/dashboard/user-profile`
  - `/dashboard/payment`
  - `/dashboard/moon`
  - `/dashboard/mars`

### 5) Non-Existent User (Not Signed Up)
**Condition:** Is NOT an existing user
- **CANNOT Access:**
  - `/pricing`
  - `/dashboard`
  - `/dashboard/user-profile`
  - `/dashboard/payment`
  - `/dashboard/moon`
  - `/dashboard/mars`
