# One Time Secret

[![CircleCI](https://circleci.com/gh/Incognito/one-time-secret/tree/master.svg?style=svg&circle-token=075ef0fe33b49a42abf7593cc8c9e2cf7329d6c1)](https://circleci.com/gh/Incognito/one-time-secret/tree/master)

Share secrets with one-time-access.

My hope is this will reduce the number of developers
sending credentials around in Emails and Slack by
making it really easy to set up.

![Demo of app working](https://raw.githubusercontent.com/Incognito/one-time-secret/github-image-assets/one-time-demo.gif?token=AAXJuuLEN6E5tgxXi6IpPFGD-NZl1Jf3ks5a7zv-wA%3D%3D)

### Setup Tutorials
 - [AWS](https://github.com/Incognito/one-time-secret/wiki/Setup:-AWS)
 - [GCloud](https://github.com/Incognito/one-time-secret/wiki/Setup:-GCloud)
 - [Heroku](https://github.com/Incognito/one-time-secret/wiki/Setup:-Heroku)
 - [Self-hosted](https://github.com/Incognito/one-time-secret/wiki/Setup:-Self-hosted)
 
### Stuck on something?
Look in the Wiki, everything from cusomizing, logging, and hosting is in there.

### Design Intentions
1. Permit self-hosting of secrets (many hosted services exist)
1. Grokable code (others should be able to understand the code)
1. Limited dependencies and easy installation (other open-source libraries require a lot of setup)
1. Easily modified when needed

### Intentional Failure modes
- Webserver restarted: total data loss, it will only store secrets in-process-memory.
- Secret Data is removed: Overwrite string with a random string of equal length, and then delete string from map.
- Secret Data reaches Time-To-Live age: Removed by check every 30 seconds

### Feature roadmap
[Project Board](https://github.com/Incognito/one-time-secret/projects/1)
