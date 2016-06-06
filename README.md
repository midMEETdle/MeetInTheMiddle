# MeetInTheMiddle
Find the midway point between friends and find the best places to go!

Existing Features:
Front-End:

Map: map with zoom and move capabilities using Leaflet js and the leaflet-react module. Plots markers on map based off data received from this.props.data.
- Three different 'pages': Login page, addresses pages, and results page.
- These pages are rendered based on the 'currentPage' property in state.
Login Page:
- Create-user form: Gathers new user information and sends it to the server via a POST request.
Addresses Page:
- Address form: On initial render 2 address forms are loaded. You can add additional forms by the 'add addresses' button. The inputs of these forms are sent to the server via a POST request.
- Activity choices: Four activities have been hard coded. Code currently grabs checked activities from the form but does NOT send it to the server.
Results Page:
- Result list items: A results list is generated from the yelp object returned by the server.
Styling:
- Using CSS Skeleton for basic styling.
​
Back-End:

Server:
- Node express server
- Middleware compartmentalized into data parsing functions and functions working with APIs
- Works with google geocoding API and yelp API
- Uses addresses to extract coordinate locations and goes back to google to get city data
- Obtains auth signature from yelp for each API call and builds query string based upon user inputs
- Builds and returns JSON object to frontend with central coordinates for the display map and ten top matched yelp restaurants
Database:
- Heroku hosted postgreSQL database.  
- Uses sequelize as the ORM.  
- Currently there are 2 database tables, one for users and one for addresses.  
- When a user signs up via our landing page their information is saved in the database and the password is encrypted using bcrypt.  

Suggested TODOs:

Front-End:
- Currently the logic for determining which page to render is in the app.jsx render function. It was suggested to determine which page should be rendered outside of this function and then pass the correct page in.
- Implement a drop down for choosing friends instead of manually typing in addresses each time.
- Sprucing up the list results page to be easier to read.
- Creating a login page (vs just a create user page that is there now).
Map: Add/remove markers as needed with buttons.

Back-End:

Server:
- Server is set up to handle an indefinite amount of user inputs (street/city/state), except the first call to the google geocoding API needs to implement a for all promise for an unlimited number of calls to the api (suggestion: use bluebird). It is currently hard coded to 2 inputs
- Improve algorithm as creatively as possible. Currently, the middleware averages the input coordinates and uses that to query yelp. A more sophisticated method would be impressive
- Make input to yelp more accurate. There are some issues with what yelp returns, and it could be improved by putting more specific inputs in to reduce erroneous API returns
- Work on routes to pass database information to frontend for UI use
- Cleanup google code using querystring module
- Error handling needs to be implemented to make sure API calls are valid
- Test each module with dummy data to make sure they aren't breaking
Database:
- Build out the ability to verify a user when they return to the page, aka add a login screen to the front-end and use the database/bcrpyt to check for the username and confirm the password (bcrypt.compareSync).  
- Add the ability to save addresses.  
- You could ask for the user's home/work address during on-boarding and also save their friend's addresses when you enter into the 'Meet' screen.  You would likely need to connect the addresses to the user via the userID field.  

Special Notes:
Front-End:
- Certain classes have been specifically worded to work with CSS Skeleton classes for styling. CSS Skeleton does a good job of getting basic styling in (and is responsive) but can be tough to customize. http://getskeleton.com/
- The index.jsx file is only being referenced by the gulpfile for compiling. The main entry file is actually app.jsx.

Map:
- leaflet js has great tutorials on how to get a map up and running.
- Leaflet-react on github helps incorporate leaflet js in react because leaflet js affects the DOM directly.
- leaflet js: http://leafletjs.com/examples/quick-start.html
- leaflet-react: https://github.com/PaulLeCam/react-leaflet

Back-End:

Server:
- Obtain keys for google and yelp. The hard part of interacting with yelp has been set up. Getting the initial keys is instantaneous
- Refer to yelp developer guide for extensive list of query options (https://www.yelp.com/developers/documentation/v2/search_api)
- Refer to google geocoding API for help with obtaining locational data (https://developers.google.com/maps/documentation/geocoding/start#sample-request)
Database:
- You will need to create your own Heroku database/set up local postgreSQL database.  
- I believe that the user create code drops all previous records each time it runs, so that needs to be corrected in order to build a userbase in the db.  
