# SIEM Senior Project
This is a senior project made by Julian Arregoces. The project simulates some of the key functionalities of a Security Information and Event Manager (SIEM). The SIEM runs as a Chrome extension so it you must have chrome browser in order to use this application.

## Setup Instructions
1. Open console and navigate to desired folder
2. Clone this repo in the desired folder
3. Open a new chrome tab
4. Click on the puzzle piece in the top right corner of your chrome window: ![image](https://user-images.githubusercontent.com/54562440/165416874-7f0eb7b3-1056-4fb4-8425-238da916b286.png)
5. Then click on the Managage extensions button at the bottom of the popup: ![image](https://user-images.githubusercontent.com/54562440/165417114-bc4c62ad-0a9c-4219-9501-991fe17fc5ac.png)
6. Toggle the developer mode on in the top right corner of the window (Gray is off, Blue is on): ![image](https://user-images.githubusercontent.com/54562440/165417250-bfef9f36-1ed6-4011-ae18-fcc00cfe2c59.png)
7. Once Developer mode is toggled on click on the Load unpacked button in the top left corner of the window: ![image](https://user-images.githubusercontent.com/54562440/165417412-a9bbe07d-1b19-4d68-b630-2ba5b04e0688.png)
8. Navigate to the folder where you cloned the repo and select the folder called SIEM
9. Once you have selected the folder the SIEMy Extension with an Among Us astronaut should show up in your extensions page: ![image](https://user-images.githubusercontent.com/54562440/165417722-c67cc52e-3fc5-4732-8704-3a3da96b1d86.png)

10. Make a new chrome tab and pin the SIEMy extension:  ![image](https://user-images.githubusercontent.com/54562440/165417958-46aa7265-a7b4-45ca-985c-bd98568d7972.png)
11. The extension is now working :)

## How to use
In order to use the extension properly it must be pinned. Once pinned you can click on the pinned extension icon in order to open the front end interaction with the database of threats. 

![image](https://user-images.githubusercontent.com/54562440/165418220-7c8ca6ad-a86f-433f-ac1d-62fcff03abe6.png)
### Adding Threats
You can add threats to the database by entering in a date and url and then clicking the add button. Note you cannot add a threat to the database if the url is already in the database.

### Searching for Threats in Database
You can search for threats in the database by entering a url in the text box next to the Search button and then clicking the Search Button. If no data shows up this threat is not in the data base. If the threat is in the database the date the threat was entered and the threat url shows up under the text box:
![image](https://user-images.githubusercontent.com/54562440/165419077-83d221e2-2394-4916-b54d-c60d7831cd4b.png)

### Editing an Existing Threat
Once you have searched for a threat in the database you can edit the threat. Click the edit record button and edit the Date Entered and url fields. Then click the Save Changes button.

### Deleting a Threat
To delete a threat from the database search for threat first. If found you can then press the Delete Record button and the threat will be deleted from the database


