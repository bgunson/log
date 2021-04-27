# TODO

### General
- [x] Upon load (no log selected) user see main page with all logs in separate widgets, like firebase console displays your projects. Can select existing log or add new one from main section.
- [ ] When user deletes account, make sure account and credentials are removed from firebase auth and firestore
- [ ] Warning message for user when account is deleted
- [ ] Add proper routing


### Log Creation
- [x] When user selects new from initial dashboard, user is greeted with the create-log component
- [ ] User can add data section (table, todo, scratch) for selected log
- [ ] User can read, write to data selection for given log
- [x] Appropriate error prompt when user tries to create a log that already exists - validator for create-log form

### Log Deletion 
- [ ] When user deletes log, removed from database, sidebar updates upon deletion
- [ ] When user deletes account, all logs are removed from database
- [ ] Warning messages when user deletes logs 

### Log Data
- [ ] Log table component
- [ ] Log card component - edit/delete log from menu button
