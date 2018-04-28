# One Time Secret

[![CircleCI](https://circleci.com/gh/Incognito/one-time-secret/tree/master.svg?style=svg&circle-token=075ef0fe33b49a42abf7593cc8c9e2cf7329d6c1)](https://circleci.com/gh/Incognito/one-time-secret/tree/master)

Share secrets with one-time-access.

Intended for situations when you need to send someone
important information such as a password.

My hope is this will reduce the number of developers
sending credentials around in Emails and Slack.

This message will self-destruct.

### Design intentions
1. Permit self-hosting of secrets (many hosted services exist)
1. Grokable code (others should be able to understand the code)
1. Limited dependencies and easy installation (other open-source libraries require a lot of setup)

### Intentional Failure modes
- Webserver restarted: total secret data loss, we only store secrets in-process-memory
- Secret Data is removed: Overwrite string with a random string of equal length, and then delete string from memory.
- Secret Data reaches Time-To-Live age: Removed by check every 30 seconds

### Feature roadmap
Check the GitHub project board.

### Setup Tutorials
Check the GitHub Wiki

## Other things that will move into the wiki...

### Syslog configuration
The application uses use winston-syslog for logging.

You probably don't need to configure anything here.

If you have a non-local syslog server check out:
https://github.com/winstonjs/winston-syslog#syslog-configuration

### Attacks
Some precautions have been taken to prevent taking secrets from
in-process memory or crash files. If you have a viable option that
doesn't require encrytion keys let me know.

If you know of other attacks add an issue or PR so I can document it here.
