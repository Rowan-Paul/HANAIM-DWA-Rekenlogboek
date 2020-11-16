# Software guidebook

## Table of content

---

- [Context](#)
- [Functional Overview](#)
- [Quality Attributes](#)
- [Constraints](#)
- [Principles](#)
- [Software Architecture](#)
- [External interfaces](#)
- [Code](#)
- [Data](#)
- [Infrastructure Architecture](#)
- [Deployment](#)
- [Operation and Support](#)
- [Decision Log](#)

## 1. Context

In this chapter you'll find the scene of this project. Here we start with explaining what the software is all about, and what it is we are building.

Thereafter we explain how this project will fit in the existing environment. And last but not least we describe who are using this software.

### What this project is about

In this project an assignment is being realized for the course DWA (development web applications).

The project team consists of five students. Who work together on a software tool.

### What it is that's being built

In this project we develop a software tool that supports teachers by tracking the progress of their pupils.

The intention is that pupils keep a digital log, in this log they indicate for each learning goal whether this is clear or not.

Based on the logs of pupils, teachers can provide support.
Log

### How this software fits into its current environment

In the current environment they already make use of logs. Only at the moment these are paper logs.

The principle remains the same. only the environment undergoes a digital transformation.

### Different roles

In the software we work with three different roles. In the list below we describe the roles and their use within the software.
| # | Role | Task |
|----|-------------|------------------------------------------|
| 1. | Log creator | Creates logs for different school years. |
| 2. | Log creator | Adds learning goals to logs. |
| 3. | Log creator | Prepares logs for teachers. |
| 4. | Teachers | Evaluate logs of pupils. |
| 5. | Pupils | Fills in logs for current learning goal. |

### Context diagram

In the context diagram below the coherence between the different roles is shown.

![Context diagram](./assets/context-diagram.svg)

---

## 2. Functional overview
