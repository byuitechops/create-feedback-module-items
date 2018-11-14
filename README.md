# Child Module Title
### *Package Name*: create-feedback-module-item
### *Child Type*: post import
### *Platform*: online
### *Required*: required

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [Here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose

The purpose of this child module is to create and insert the feedback module items. Namely W05 Student Feedback to Instructor, W12 Student Feedback to Instructor, and  W13 End-of-Course Evaluation.

## How to Install

```
npm install github:byuitechops/create-feedback-module-item
```

## Process

Describe in steps how the module accomplishes its goals.

1. Acquires all the modules
2. Filters through for the modules we want (Week 05, 12, 13)
3. Creates feedback items for each week
4. Inserts them into their respective modules

## Log Categories

List the categories used in logging data in your module.

- Created assignment
- Created module item

## Requirements

This child module is supposed to create and insert the feedback module items. Namely W05 Student Feedback to Instructor, W12 Student Feedback to Instructor, and  W13 End-of-Course Evaluation. W05 and W12 will be external tools stored in assignments and W13 is simply an external URL.