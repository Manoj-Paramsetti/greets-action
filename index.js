const core = require('@actions/core');
const github = require('@actions/github');

const run = async () => {
    try {
        const github_token = core.getInput('GITHUB_TOKEN');
        const issue_message = core.getInput('issue_message');
        const pr_message = core.getInput('pr_message');
        const context = github.context;
        const label_1 = core.getInput('label_1');
        const label_2 = core.getInput('label_2');
        const label_3 = core.getInput('label_3');
        const label_4 = core.getInput('label_4');
        const event = github.context.eventName;
        let message;

        const octoKit = new github.getOctokit(github_token);

        if (!issue_message || !pr_message) {
            core.warning('message is not given');
            return;
        }

        if (event === 'pull_request') {
            message = pr_message;
            
        } else if (event === 'issues') {
            message = issue_message;

            const labels = [];
            if(label_1 != 'value_is_not_given_action'){
            labels.push(label_1)}
            if(label_2 != 'value_is_not_given_action'){
            labels.push(label_2)}
            if(label_3 != 'value_is_not_given_action'){
            labels.push(label_3)}
            if(label_4 != 'value_is_not_given_action'){
            labels.push(label_4)}

            // Adding the labels present in the array.
        octoKit.issues.addLabels({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            labels: labels,
            });
       }

        octoKit.issues.createComment({
         issue_number: context.issue.number,
         owner: context.repo.owner,
         repo: context.repo.repo,
         body: message,
       });

    }catch(error){
       core.setFailed(error.message);
    }
}

run();