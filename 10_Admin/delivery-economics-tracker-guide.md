---
title: Delivery Economics Tracker - Guide
status: approved
owner: Jason Hill
last-reviewed: 2026-09-09
review-cycle: update whenever the tracker's columns change
---

# Delivery Economics Tracker - Guide

Companion to `10_Admin/delivery-economics-tracker.csv`. A plain spreadsheet, not software, per `00-business/pharos-current-strategy.md`'s instruction not to build a CRM or tracking application. Open the CSV in Excel, Numbers, or Google Sheets.

## Why this exists

The whole point is to make underpriced custom work visible early, not discovered a year in. Fill in one row per paid engagement, starting with the very first one, even the pilot-priced ones.

## How to use it

1. **Add a row when you send the proposal.** Fill in `engagement_id`, `client_name_or_code` (use a code, not the real name, if this file is ever shared or backed up somewhere less controlled), `service`, `tier_pilot_or_standard`, `date_proposed`, and `quoted_price_nzd`, `estimated_hours`.
2. **Track actual hours as you go**, broken down by phase (`scoping_hours`, `discovery_hours`, `analysis_report_hours`, `walkthrough_hours`, `rework_hours`, `follow_up_hours`). Rework and follow-up are easy to undercount; be honest here specifically, since this is where quotes usually go wrong.
3. **On delivery**, fill in `date_delivered`, sum `actual_hours`, and calculate:
   - `effective_hourly_rate_nzd` = `quoted_price_nzd` ÷ `actual_hours`
   - `gross_margin_nzd` = `quoted_price_nzd` − `software_direct_costs_nzd`
   - `gross_margin_pct` = `gross_margin_nzd` ÷ `quoted_price_nzd`
4. **Add `client_feedback_summary`, `testimonial_or_case_study_permission`, and `lessons_for_next_quote`** while it's fresh, not months later.

## What to watch for

- **`effective_hourly_rate_nzd` below $180/hour on a standard-tier (non-pilot) engagement** is a signal to revisit either the quote or the scope, per the economic target in `00-business/pharos-current-strategy.md`. Pilot-tier engagements are allowed to sit below this deliberately; standard-tier ones shouldn't, more than once.
- **`actual_hours` consistently exceeding `estimated_hours`** across 2 to 3 engagements for the same service is a signal the service file's own effort estimate (in `03_Services/`) is wrong, not that this particular client was unusually demanding.
- **Do not average this away silently.** A single outlier is a client-specific note; a pattern across 3+ engagements is a pricing or scoping decision to make deliberately, with the data in front of you.

## Review cadence

Review after every engagement while there are fewer than 5; review monthly once there's a steady flow. Revisit the pricing hypothesis in `02_Business_Strategy/pricing-strategy.md` and `00-business/pharos-current-strategy.md` at the 90-day checkpoint regardless (see `09-project-management/validation-checkpoints.md`), using whatever real data exists by then.
