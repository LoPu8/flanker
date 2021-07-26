Qualtrics.SurveyEngine.addOnload(function () {

    /*Place your JavaScript here to run when the page loads*/

    /* Change 1: Hiding the Next button */
    // Retrieve Qualtrics object and save in qthis
    var qthis = this;

    // Hide buttons
    qthis.hideNextButton();

    repo_site = "https://expfactory-experiments.github.io/flanker/"

    // requiredResources must include all the JS files that demo-simple-rt-task-transformed.html uses.
    var requiredResources = [
        repo_site +"js/jquery.min.js",
        repo_site +"js/math.min.js",
        repo_site +"js/jspsych/jspsych.js",
        repo_site +"js/jspsych/plugins/jspsych-text.js",
        repo_site +"js/jspsych/poldrack_plugins/jspsych-poldrack-text.js",
        repo_site +"js/jspsych/poldrack_plugins/jspsych-poldrack-categorize.js",
        repo_site +"js/jspsych/poldrack_plugins/jspsych-poldrack-instructions.js",
        repo_site +"js/jspsych/plugins/jspsych-call-function.js",
        repo_site +"js/jspsych/poldrack_plugins/jspsych-attention-check.js",
        repo_site +"js/jspsych/poldrack_plugins/jspsych-poldrack-single-stim.js",
        repo_site +"js/jspsych/plugins/jspsych-survey-text.js",
        repo_site +"js/jspsych/poldrack_plugins/jspsych-single-stim-button.js",
        repo_site +"js/jspsych/poldrack_plugins/poldrack_utils.js",
        repo_site +"experiment.js"
    ];
	


    function loadScript(idx) {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if ((idx + 1) < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                initExp();
            }
        });
    }
    
    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }

    /* Change 3: Appending the display_stage Div using jQuery */
    // jQuery is loaded in Qualtrics by default
    jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
    jQuery("<div id = 'display_stage'></div>").appendTo('body');


    /* Change 4: Wrapping jsPsych.init() in a function */
    function initExp() {

        jsPsych.init({
            timeline: flanker_experiment,
            display_element: "getDisplayElement",
            fullscreen: true,
            on_trial_finish: function(data){
              addID('flanker')
            },

            on_finish: function(data){


                /* Change 5: Summarizing and save the results to Qualtrics */
                // summarize the results


                // save to qualtrics embedded data
                Qualtrics.SurveyEngine.setEmbeddedData("text", text);
                Qualtrics.SurveyEngine.setEmbeddedData("rt", rt);
                Qualtrics.SurveyEngine.setEmbeddedData("key_press", key_press);
                Qualtrics.SurveyEngine.setEmbeddedData("block_duration", block_duration);
                Qualtrics.SurveyEngine.setEmbeddedData("timing_post_trial", timing_post_trial);
                Qualtrics.SurveyEngine.setEmbeddedData("trial_id", trial_id);
                Qualtrics.SurveyEngine.setEmbeddedData("trial_type", trial_type);
                Qualtrics.SurveyEngine.setEmbeddedData("trial_index", trial_index);
                Qualtrics.SurveyEngine.setEmbeddedData("time_elapsed", time_elapsed);
                Qualtrics.SurveyEngine.setEmbeddedData("internal_node_id", internal_node_id);
                Qualtrics.SurveyEngine.setEmbeddedData("exp_id", exp_id);
                Qualtrics.SurveyEngine.setEmbeddedData("full_screen", full_screen);
                Qualtrics.SurveyEngine.setEmbeddedData("focus_shifts", focus_shifts);
                Qualtrics.SurveyEngine.setEmbeddedData("view_history", view_history);
                Qualtrics.SurveyEngine.setEmbeddedData("stimulus", stimulus);
                Qualtrics.SurveyEngine.setEmbeddedData("possible_responses", possible_responses);
                Qualtrics.SurveyEngine.setEmbeddedData("stim_duration", stim_duration);
                Qualtrics.SurveyEngine.setEmbeddedData("correct", correct);
                Qualtrics.SurveyEngine.setEmbeddedData("correct_response", correct_response);
                Qualtrics.SurveyEngine.setEmbeddedData("feedback_duration", feedback_duration);
                Qualtrics.SurveyEngine.setEmbeddedData("condition", condition);
                Qualtrics.SurveyEngine.setEmbeddedData("exp_stage", exp_stage);
                Qualtrics.SurveyEngine.setEmbeddedData("responses", responses);


                /* Change 6: Adding the clean up and continue functions.*/
                // clear the stage
                jQuery('#display_stage').remove();
                jQuery('#display_stage_background').remove();

                // simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
                qthis.clickNextButton();
            }
        });
    }
});




Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

});