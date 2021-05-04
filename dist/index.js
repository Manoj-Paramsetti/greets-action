const core = require('@actions/core');
const github = require('@actions/github');
 
const runner = async () => {
    try {
        // github token required for Octokit
        const github_token = core.getInput('GITHUB_TOKEN');
        
        // message to be added
        const pr_message = core.getInput('pr_message');
        const issue_message = core.getInput('issue_message');
        
        // github payload
        const context = github.context;
        
        // labels to inserted
        const label_1 = core.getInput('label_1');
        const label_2 = core.getInput('label_2');
        const label_3 = core.getInput('label_3');
        const label_4 = core.getInput('label_4');
        
        // list of labels
        const labelsInput = core.getInput('labels');
        
        // creating object
        const octoKit = new github.getOctokit(github_token);

        // checking whether atleast one message is included
        if (issue_message == 'empty' && pr_message == 'empty') {
            core.warning('No message is given either in issue_message or pr_message. If you gave message as "empty" then change it to something');
            return;
        }
        
        const labels = [];
        // Checks label_1 is provided
        if(label_1 != 'value_is_not_given_action')
        {
            labels.push(label_1)
        }
        
        // Checks label_2 is provided
        if(label_2 != 'value_is_not_given_action')
        {
            labels.push(label_2)
        }
        
        // Checks label_3 is provided
        if(label_3 != 'value_is_not_given_action')
        {
            labels.push(label_3)
        }
        
        // Checks label_4 is provided
        if(label_4 != 'value_is_not_given_action')
        {
            labels.push(label_4)
        }
        
        // Checks labels
        if(labels != 'value_is_not_given_action')
        {
            try{
                const labelsInputList = JSON.parse(labelsInput);
                console.log(labelsInputList);
                for(var i = 0; i<labelsInputList.length; i++){
                    labels.push(labelsInputList[i]);
                }
            }
            catch(err) {
                console.log(err.message);
            }
        }
        
        
        // checks which event to pass the message and label
        if (github.context.eventName === 'pull_request') {
            // Adds comment in PR
            octoKit.issues.createComment({
                issue_number: context.pull_request.number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                body: pr_message,
            });
        } 
        
        else if (github.context.eventName === 'issues') {
            // Adds comment in issue
            octoKit.issues.createComment({
                issue_number: context.issue.number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                body: issue_message,
            });
        }
        
        // adds label if labels list contains something
        if(labels.length != 0){
            // Adds Label to an issue or pull request
            octoKit.issues.addLabels({
                issue_number: context.issue.number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                labels: labels,
            });       
        }
    }catch(error){
        core.setFailed(error.message);
    }
}

runner();
