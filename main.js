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


    // get modules
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

    function checkForExistingAssignments(individualModule, callback) {
        course.message("Checking for existing LTI assignments");
        // check if assignments exist
        canvas.getAssignments(canvasId, (error, assignments) => {
            if (error) {
                callback(error);
                return;
            }
            // Filter for existing LTI assignments
            // assignments.map(assignment => console.log(assignment));
            callback(null, individualModule);
        });
    }

    function createAssignments(individualModule, callback) {
        course.message("Creating assignments now");

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

        // create LTI assignments
        canvas.post(`/api/v1/courses/${canvasId}/assignments`, {
            assignment: {
                "name": `${weekNum} Student Feedback`,
                "description": `The name of the module that this will go in is, ${individualModule.name}`,
                "external_tool_tag_attributes": {
                    'url': "www.google.com",
                    'new_tab': false
                }//,
                // Submission_types doesn't work
                // "submission_types": ['online_text_entry']
            }
        }, (postError, newAssignment) => {
            if (postError) {
                callback(postError);
            }

            course.log('Created assignments', {
                'Assignment Name': newAssignment.name
                // 'Assignment Type': newAssignment.submission-types
            });

            callback(null, individualModule, newAssignment);
        });
    }

    function insertModuleItems(individualModule, newAssignment, callback) {
        course.message("Inserting into modules");
        // insert LTI assignments
        // Potentially publish LTI assignments
        // insert link
        callback(null, individualModule);
    }

    function asyncWaterfall(individualModule, callback) {
        // Array of functions to be run in the async waterfall below
        functions = [
            /* This allows you to pass 'module' to the first function in waterfall */
            asyncLib.constant(individualModule),
            checkForExistingAssignments,
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

