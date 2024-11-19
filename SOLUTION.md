# Solution Docs

<!-- You can include documentation, additional setup instructions, notes etc. here -->

Autocomplete functional component

Props: 
- httpReq (boolean):  If "httpReq" is set to "true", the component will accept a HTTP endpoint as data source. 
- id (string): this should be a unique identifier for every instance of this component. With this ID every component could save his last ten searches in the local storage.

notes:
states.json is fetched into the Autocomplete component itself. This action probably should happen on a higher level, into the parent (in our case this is the App component), but i`ve made it this way just to simulate a real API call with promises into the component.

choseUser and choseState functions are very similar and they could be merged in one function with a few conditions inside.

tabIndex are added to all <li> elements, because we need this elements to be focusable.





