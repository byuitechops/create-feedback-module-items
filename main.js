/*eslint-env node, es6*/

/* Create Feedback Module Items */

/***********************************************************************
 * Creates the W05, W12 ,and W13 feedback module items.
 * Specifically W05 Student Feedback to Instructor, 
 * W12 Student Feedback to Instructor, and  W13 End-of-Course Evaluation
************************************************************************/

const canvas = require('canvas-wrapper');
const asyncLib = require('async');


module.exports = (course, stepCallback) => {

    // Get the courses unique ID
    const canvasId = course.info.canvasOU;
    const validNames = ["Lesson", "Week", "Unit", "Module"];

    // Get all the modules from the course
    function getModules() {
        canvas.getModules(canvasId, (error, modules) => {
            if (error) {
                course.error(error);
                stepCallback(null, course);
                return;
            }

            // Creates a filtered list of the weeks we are working with
            filteredModules = modules.filter(m => {
                // Filters for week 05, 12, and 13
                return /(?:Week|Lesson|Unit|Module):?\s*(0?5|12|13)/gi.test(m.name);
            });

            // Runs asyncWaterfall for each module
            asyncLib.eachSeries(filteredModules, asyncWaterfall, error => {
                if (error) {
                    course.error(error);
                } else {
                    course.message("Successfully created feedback module items!");
                }

                stepCallback(null, course);
            });
        });
    }

    function create_W05_feedback(callback) {
        canvas.getAssignments(canvasId, (error, assignments) => {
            if (error) {
                callback(error);
                return;
            }
            // See if any of the assignment names include "W05 Student Feedback to Instructor"
            var existingFeedbackAssignment = assignments.filter(assignment => assignment.name.includes("W05 Student Feedback to Instructor"));

            // If so... do not create another one.
            if (existingFeedbackAssignment.length > 0) {
                course.warning("'W05 Student Feedback to Instructor' already exists");
                callback(null, null);
            } else {
                canvas.post(`/api/v1/courses/${canvasId}/assignments`, {
                    assignment: {
                        'name': `W05 Student Feedback to Instructor`,
                        // "description": `The name of the module that this will go in is, ${individualModule.name}`,
                        'external_tool_tag_attributes': {
                            'url': "https://byui-lti-to-url.azurewebsites.net/Home/UrlRoute/ZHVybD1odHRwcyUzQSUyRiUyRmJ5dWkuYXoxLnF1YWx0cmljcy5jb20lMkZqZmUlMkZmb3JtJTJGU1ZfM09oT3dPZE9XU2owSzhkJmNoZWNrZW09b24maW51bT1vbiZmbG5hbWU9b24mZW1haWw9b24mdXNlcm49b24mY291cnNlbmFtZT1vbiZzaXNjSUQ9b24mY291cnNlbnVtPW9uJnNlY251bT1vbiZzaXN0SUQ9/b24maWVtYWlsPW9uJmlmbmFtZT1vbiZpbG5hbWU9b24mbW9kdWxlPW9uJmxuYW1lPW9uJmxpZD1vbiZncmFkZT1vbiZwb2ludHM9MSZoYWJpdHVkZV9MTVM9Q2FudmFzJmhhYml0dWRlX1dlZWtObz01JmxvYz1uZXc1",
                            'content_type': "context_external_tool",
                            "content_id": "167",
                            'new_tab': 0
                        },
                        'submission_types': 'external_tool',
                        'omit_from_final_grade': true,
                        'published': true
                    }
                }, (postError, newAssignment) => {
                    if (postError) {
                        callback(postError);
                    }

                    course.log('Created assignment', {
                        'Assignment Name': newAssignment.name
                    });

                    callback(null, newAssignment);
                });
            }

        });
    };

    function create_W12_feedback(callback) {
        canvas.getAssignments(canvasId, (error, assignments) => {
            if (error) {
                callback(error);
                return;
            }
            // See if any of the assignment names include "W05 Student Feedback to Instructor"
            // Change this to "W12 Student Feedback to Instructor" when you're done testing -------------------------------------------------------------------------------------------
            var existingFeedbackAssignment = assignments.filter(assignment => assignment.name.includes("W12 Student Feedback to Instructor"));

            // If so... do not create another one.
            if (existingFeedbackAssignment.length > 0) {
                course.warning("'W12 Student Feedback to Instructor' already exists");
                callback(null, null);
                return;
            } else {
                canvas.post(`/api/v1/courses/${canvasId}/assignments`, {
                    assignment: {
                        'name': `W12 Student Feedback to Instructor`,
                        // "description": `The name of the module that this will go in is, ${individualModule.name}`,
                        'external_tool_tag_attributes': {
                            'url': "https://byui-lti-to-url.azurewebsites.net/Home/UrlRoute/ZHVybD1odHRwcyUzQSUyRiUyRmJ5dWkuYXoxLnF1YWx0cmljcy5jb20lMkZqZmUlMkZmb3JtJTJGU1ZfODZNZThkUGt4WmxVMEhiJmNoZWNrZW09b24maW51bT1vbiZmbG5hbWU9b24mZW1haWw9b24mdXNlcm49b24mY291cnNlbmFtZT1vbiZzaXNjSUQ9b24mY291cnNlbnVtPW9uJnNlY251bT1vbiZzaXN0SUQ9/b24maWVtYWlsPW9uJmlmbmFtZT1vbiZpbG5hbWU9b24mbW9kdWxlPW9uJmxuYW1lPW9uJmxpZD1vbiZncmFkZT1vbiZwb2ludHM9MSZoYWJpdHVkZV9MTVM9Q2FudmFzJmhhYml0dWRlX1dlZWtObz0xMiZsb2M9bmV30",
                            'content_type': "context_external_tool",
                            "content_id": "167",
                            'new_tab': 0
                        },
                        'submission_types': 'external_tool',
                        'omit_from_final_grade': true,
                        'published': true
                    }
                }, (postError, newAssignment) => {
                    if (postError) {
                        callback(postError);
                    }

                    course.log('Created assignment', {
                        'Assignment Name': newAssignment.name
                    });

                    callback(null, newAssignment);
                });
            }
        });
    };

    function createAssignments(individualModule, callback) {
        if (!individualModule) {
            callback(new Error("Module is undefined"));
            return;
        }

        // Grabs name of the module so that we can extract the week number for later use
        var moduleTitle = individualModule.name;

        /* Get the week number */
        var weekNum = moduleTitle.match(/(?:Week|Lesson|Unit|Module):?\s*(0?5|12|13)/gi)[0].split(' ')[1];

        /* If week number is only one digit, add a leading 0 */
        if (weekNum.length === 1) {
            weekNum = `0${weekNum}`;
        }

        // Depending the on week, do different tasks (e.g. create W12 feedback or W13 external url feedback)
        switch (weekNum) {
            case '05':
                create_W05_feedback((error, assignment) => {
                    if (error) {
                        callback(error, individualModule);
                    }
                    // If assignment already exists, (null, individualModule, null) gets passed to the next function
                    callback(null, individualModule, assignment);
                });
                break;
            case '12':
                create_W12_feedback((error, assignment) => {
                    if (error) {
                        callback(error, individualModule);
                    }
                    // If assignment already exists, (null, individualModule, null) gets passed to the next function
                    callback(null, individualModule, assignment);
                });
                break;
            case '13':
                callback(null, individualModule, "ExternalURL");
                break;
            default:
                // Module doesn't match these three cases.
                callback(null, null, null);
                break;
        };
    }

    function insertModuleItems(individualModule, newAssignment, callback) {
        if (individualModule === null || newAssignment === null) {
            callback(null, null, null);
            return;
        }

        // Checks if the "new Assignment" is the external URL
        if (newAssignment === "ExternalURL") {
            canvas.post(`/api/v1/courses/${canvasId}/modules/${individualModule.id}/items`, {
                module_item: {
                    'title': "W13 End-of-Course Evaluation",
                    'type': 'external_url',
                    'external_url': "https://content.byui.edu/integ/gen/8872d2b2-91d5-4953-a357-3097ef2aa5d0/0/?.vi=file&attachment.uuid=969ae80b-c9ec-4e8d-95f3-73a3cfbf5a76",
                    'published': true,
                    'new_tab': true
                }
            }, (postError, newModuleItem) => {
                if (postError) {
                    callback(postError);
                    return;
                }

                course.log('Created module item', {
                    'Module Name': individualModule.name,
                    'Module Item Inserted': newModuleItem.title
                });
                callback(null, newModuleItem, individualModule);
            });
        } else {
            canvas.post(`/api/v1/courses/${canvasId}/modules/${individualModule.id}/items`, {
                module_item: {
                    'type': 'Assignment',
                    'content_id': newAssignment.id,
                    'published': true
                }
            }, (postError) => {
                if (postError) {
                    callback(postError);
                    return;
                }
                course.log('Created module item', {
                    'Module Name': individualModule.name,
                    'Module Item Inserted': newAssignment.name
                });
                callback(null, null, individualModule);
            });
        }


    }

    function publishItems(moduleItem, individualModule, callback) {
        if (individualModule === null || moduleItem === null) {
            callback(null, null);
            return;
        }

        canvas.put(`/api/v1/courses/${canvasId}/modules/${individualModule.id}/items/${moduleItem.id}`, {
            module_item: {
                'published': true
            }
        }, (updateError) => {
            if (updateError) {
                callback(updateError);
                return;
            }

            callback(null, individualModule);
        });
    }

    function asyncWaterfall(individualModule, callback) {
        // Array of functions to be run in the async waterfall below
        functions = [
            /* This allows you to pass 'module' to the first function in waterfall */
            asyncLib.constant(individualModule),
            createAssignments,
            insertModuleItems,
            publishItems
        ];

        asyncLib.waterfall(functions, error => {
            if (error) {
                course.error(error);
            }

            callback(null);
        })
    }

    /* * * * * * * *
    * *
    * * * START HERE
    * *
    * * * * * * * */
    getModules();
};