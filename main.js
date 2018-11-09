/*eslint-env node, es6*/

/* Module Description */

/* Put dependencies here */
const canvas = require('canvas-wrapper');
const asyncLib = require('async');


module.exports = (course, stepCallback) => {

    course.log('Table description', { column: 'value' });
    var canvasId = course.info.canvasOU;


    /* You should never call the stepCallback with an error. We want the
    whole program to run when testing so we can catch all existing errors */

    // Add "W05 Student Feedback to Instructor" to Week 05 (LTI assignment)

    // Add "W12 Student Evaluation of Instructor" to Week 12 (LTI assignment)

    // Add "W13 End-of-Course Evaluation" to Week 13 (link)


    // Get modules
    function getModules() {
        canvas.getModules(canvasId, (error, modules) => {
            if (error) {
                course.error(error);
                stepCallback(null, course);
                return;
            }

            course.message(`Successfully retrieved ${modules.length} modules.`);

            filteredModules = modules.filter(m => {
                // Filters for week 05, 12, and 13
                return /(Week|Lesson):?\s*(05|12|13(\D|$))/gi.test(m.name);
            });

            // console.log(filteredModules);            

            // Runs asyncWaterfall for each module
            asyncLib.eachSeries(filteredModules, asyncWaterfall, error => {
                if (error) {
                    course.error(error);
                } else {
                    course.message("Successfully created feedback module items.");
                }

                stepCallback(null, course);
            });
        });
    }

    function create_W05_feedback(callback) {
        var doesExist = false;

        canvas.getAssignments(canvasId, (error, assignments) => {
            if (error) {
                callback(error);
                return;
            }
            // See if any of the assignment names include "W05 Student Feedback to Instructor"
            var existingFeedbackAssignment = assignments.filter(assignment => assignment.name.includes("W05 Student Feedback to Instructor"));

            // If so... do not create another one.
            if (existingFeedbackAssignment.length > 0) {
                // callback(null, null);
                doesExist = true;
                return;
            }

        });
        // This if statement runs before the "getAssignments" above ----------------------------------------------------------------------------------------------------
        if (doesExist) {
            course.message("Assignment already exists.");
            callback(null, null);
            return;
        } else {
            canvas.post(`/api/v1/courses/${canvasId}/assignments`, {
                assignment: {
                    'name': `W05 Student Feedback to Instructor`,
                    // "description": `The name of the module that this will go in is, ${individualModule.name}`,
                    'external_tool_tag_attributes': {
                        'url': "https://byui-lti-to-url.azurewebsites.net:443/Home/UrlRoute/ZHVybD1odHRwcyUzQSUyRiUyRmJ5dWkuYXoxLnF1YWx0cmljcy5jb20lMkZqZmUlMkZmb3JtJTJGU1ZfM09oT3dPZE9XU2owSzhkJmNoZWNrZW09b24maW51bT1vbiZmbG5hbWU9b24mZW1haWw9b24mdXNlcm49b24mY291cnNlbmFtZT1vbiZzaXNjSUQ9b24mY291cnNlbnVtPW9uJnNlY251bT1vbiZzaXN0SUQ9/b24maWVtYWlsPW9uJmlmbmFtZT1vbiZpbG5hbWU9b24mbW9kdWxlPW9uJmxuYW1lPW9uJmxpZD1vbiZncmFkZT1vbiZwb2ludHM9MSZoYWJpdHVkZV9MTVM9Q2FudmFzJmhhYml0dWRlX1dlZWtObz01JmxvYz1uZXc1",
                        'new_tab': false
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
    };

    function create_W12_feedback(callback) {
        var doesExist = false;
        canvas.getAssignments(canvasId, (error, assignments) => {
            if (error) {
                callback(error);
                return;
            }
            // See if any of the assignment names include "W05 Student Feedback to Instructor"
            // Change this to "W12 Student Feedback to Instructor" when you're done testing -------------------------------------------------------------------------------------------
            var existingFeedbackAssignment = assignments.filter(assignment => assignment.name.includes("W05 Student Feedback to Instructor"));

            // If so... do not create another one.
            if (existingFeedbackAssignment.length > 0) {
                // callback(null, null);
                doesExist = true;
                return;
            }

        });
        if (doesExist) {
            course.message("Assignment already exists.");
            callback(null, null);
            return;
        } else {
            canvas.post(`/api/v1/courses/${canvasId}/assignments`, {
                assignment: {
                    'name': `W12 Student Feedback to Instructor`,
                    // "description": `The name of the module that this will go in is, ${individualModule.name}`,
                    'external_tool_tag_attributes': {
                        'url': "https://byui-lti-to-url.azurewebsites.net:443/Home/UrlRoute/ZHVybD1odHRwcyUzQSUyRiUyRmJ5dWkuYXoxLnF1YWx0cmljcy5jb20lMkZqZmUlMkZmb3JtJTJGU1ZfODZNZThkUGt4WmxVMEhiJmNoZWNrZW09b24maW51bT1vbiZmbG5hbWU9b24mZW1haWw9b24mdXNlcm49b24mY291cnNlbmFtZT1vbiZzaXNjSUQ9b24mY291cnNlbnVtPW9uJnNlY251bT1vbiZzaXN0SUQ9/b24maWVtYWlsPW9uJmlmbmFtZT1vbiZpbG5hbWU9b24mbW9kdWxlPW9uJmxuYW1lPW9uJmxpZD1vbiZncmFkZT1vbiZwb2ludHM9MSZoYWJpdHVkZV9MTVM9Q2FudmFzJmhhYml0dWRlX1dlZWtObz0xMiZsb2M9bmV30",
                        'new_tab': false
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
    };

    function createAssignments(individualModule, callback) {
        if (!individualModule) {
            callback(null, null);
        }
        

        // Grabs name of the module so that we can extract the week number for later use
        var moduleTitle = individualModule.name;
        var titleArray = moduleTitle.split(' ');

        /* Get the week number */
        /* Add 0 to week number if not present */
        titleArray.forEach((item, index) => {
            if (item == 'Week' || item == 'Lesson') {
                /* Replace each non-digit with nothing */
                weekNum = titleArray[index + 1].replace(/\D+/g, '');

                if (weekNum.length == 1) {
                    /* Add 0 to the beginning of the number if single digit */
                    weekNum = weekNum.replace(/^/, '0');
                }
            }
        });

        // Depending the on week, do different tasks (e.g. create W12 feedback or W13 external url feedback)
        switch (weekNum) {
            case '05':
                create_W05_feedback((error, assignment) => {
                    if (error) {
                        callback(null, individualModule);
                    }
                    callback(null, individualModule, assignment);
                });
                break;
            case '12':
                create_W12_feedback((error, assignment) => {
                    if (error) {
                        callback(null, individualModule);
                    }
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
        if (!individualModule) {
            callback(null, null);
        }

        // course.message("Inserting into modules");

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
                }

                course.log('Created module item', {
                    'Module Name': individualModule.name,
                    'Module Item Inserted': newModuleItem.title
                });
            });
        } else if (newAssignment != null) {
            canvas.post(`/api/v1/courses/${canvasId}/modules/${individualModule.id}/items`, {
                module_item: {
                    'type': 'Assignment',
                    'content_id': newAssignment.id,
                    'published': true
                }
            }, (postError) => {
                if (postError) {
                    callback(postError);
                }
                course.log('Created module item', {
                    'Module Name': individualModule.name,
                    'Module Item Inserted': newAssignment.name
                });
            });
        } else {
            callback(null, null);
        }
        callback(null, individualModule);
    }

    function asyncWaterfall(individualModule, callback) {
        // Array of functions to be run in the async waterfall below
        functions = [
            /* This allows you to pass 'module' to the first function in waterfall */
            asyncLib.constant(individualModule),
            createAssignments,
            insertModuleItems
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
    if (course.settings.online === false) {
        course.warning('Not an online course, this child module should not run.');
        stepCallback(null, course);
        return;
    } else {
        getModules();
    }
};