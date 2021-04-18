# Greets Action

<img src="https://imgur.com/nvfgPgZ.jpg" width="100%" />

### What is Greets Action?
Greets Action is a automated action to send messages and add labels on events

### How it works?
The Greets Action can greet when someone opens or closed an issue or pull request.
<br>you can also manage any events using `on:`

### How to use?
Create an action file in `.github/workflows/name.yml`. Here the word `name` can be anything.

```yaml
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
          # here issue_message is not given since the condition checks for merge is true. it will
          # not pass the check in issue
          PR_message: 'add message over here for pull request'
           
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
