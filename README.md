# Basic template for a running results app
Frontend programmed using react framework. Src folder contains javascript files for frontend pages.
IndividualResults.py contains python that is deployed using AWS lambda to connect aws api to sql server hosted using aws rds. 
## Frontend Site functionality
User can view recent events that are sorted by their associated date.
Users can search for results by a combination of their first and last name which will return the event they raced and their associated time and pace.
## Backend functionality
Can add new runners to existing events by using event id and assigning each runner a runner id and uploading their time and other runner info. Can add new events that can then have runners added to them. Runner and race data is then displayed by merging on eventid that is associated with their event and that runner.

