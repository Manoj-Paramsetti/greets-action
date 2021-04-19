# Greets Action

<img src="https://imgur.com/nvfgPgZ.jpg" width="100%" />

### What is Greets Action?
Greets Action is an automated action to send messages and add labels to events

### How it works?
The Greets Action can greet when someone opens or closed an issue or pull request.
<br>you can also manage any events using `on:`

### How to use?
Create an action file in `.github/workflows/name.yml`. Here the word `name` can be anything.

```YAML
name: Greets Action

on:
  issues:
    types: [closed]
  pull_request:
    types: [closed]

jobs:
  greeting:
    runs-on: ubuntu-latest
    steps:
      - uses: Manoj-Paramsetti/greets-action@main
        if: ${{ github.event.pull_request.merged == true }}
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          # here issue_message is not given since the condition checks for the merge is true. it will
          # does not pass the checks in issue
          PR_message: 'add a message over here for the pull request'
           
      - uses: Manoj-Paramsetti/greets-action@main
        if: ${{ github.event.pull_request.merged == false}}
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          issue_message: 'add message over here for issue'
          pr_message: 'add message over here for pull request'
          # labels is not a required key. you can use it when you want to add labels. it supports
          # upto 4 labels
          label_1: 'label 1'
          label_2: 'label 2'
          label_3: 'label 3'
          label_4: 'label 4' 
          
```

You can also pass labels in list type but you can't send list type directly. Use the list concept surrounded with quotes and inside that list should be passed. You can also add labels more than 4

```YAML
name: Greets Action

on:
  issues:
    types: [closed]
  pull_request:
    types: [closed]

jobs:
  greeting:
    runs-on: ubuntu-latest
    steps:
      - uses: Manoj-Paramsetti/greets-action@main
        if: ${{ github.event.pull_request.merged == true }}
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          # here issue_message is not given since the condition checks for the merge is true. it will
          # does not pass the checks in issue
          PR_message: 'add a message over here for the pull request'
           
      - uses: Manoj-Paramsetti/greets-action@main
        if: ${{ github.event.pull_request.merged == false}}
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          issue_message: 'add message over here for issue'
          pr_message: 'add message over here for pull request'
          # labels is not a required key. you can use it when you want to add labels. it supports
          # more than 4 labels
          labels: '["label_1", "label_2", "label_3"]' 
          
```
