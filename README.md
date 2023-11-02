
# Wonder KTV


## Overview

Want to sing songs with friends at home?
Have an audio, a mixer, and mikes, but find it complicated to log songs?
Wonder KTV is here to help!

Wonder KTV is a web app that allow users to search and play song videos.
One can enter as a guest to get into the guest room, or register and log in as a registered user.
Registered users can create their own rooms or enter other rooms.
Inside the room, users can add songs, change the board and see others in the room.
Registered users can also access their history of songs they had added.
(Currently, the song videos are loaded from Youtube)


## Data Model

The application will store TheHall, Rooms, Users, Playlists, Songs, Histories, and Records.

* The hall has multiple rooms
* Each room has a playlist, a board, and multiple users
* Each playlist can have multiple songs
* Each user has a history
* Each history can have multiple records

Sample Documents:

An Example Hall with Embedded Rooms:

```javascript
[
  {
    name: "Guest Room",
    playlist: [songId1, songId2, ...],
    members: [guestId1, ...],
    board: "Happy Birthday To HappyDog!"
  },
  {
    name: "happyDog's room",
    playlist: [songId1, songId2, ...],
    members: [memberId1, ...],
    board: "Happy Birthday!"
  },
  // ...other rooms
]
```

An Example Song:

```javascript
{
  id: //...generated by db,
  name: "Two Tiger (original)",
  path: // youtubeVideoId,
  accompanient: true,  // original or with accompaniment
  duration: "3min12s",
  description: // youtube video name: youtube video description
}
```


An Example User:

```javascript
{
  registered: true,   // if false, then identified as a guest
  username: "happyDog",
  password: // a hashed password,
  history: // id to the history document in histories collection
  room: //room id the user is currently in, null if not in any room
}
```

An Example History with Embedded Record:

```javascript
{
  id: //...generated by db,
  user: //...userId,
  records: [
    {
      timeAdded: //...time,
      song: //...songId
    }
  ]
}
```


## [Link to Commented First Draft Schema](db.mjs) 


## Wireframes

/ - page for first visit
![/](documentation/localhost.jpg)

/home - page after entered, also user's homepage
![/home](documentation/home.jpg)

/login - page for log in 
![/login](documentation/login.jpg)

/register - page for register
![/register](documentation/register.jpg)

/room - page as the hall to display all available rooms
![/room](documentation/room.jpg)

/room/create - page for create a room
![/room/create](documentation/room_create.jpg)

/room/:id - page for the specific room entered
![/room/:id](documentation/room_id.jpg)

/room/:id/add - page for add song to playlist of the specific room
![/room/:id/add](documentation/room_id_add.jpg)

/room/:id/play - page that playing the current song for the specific room
![/room/:id/play](documentation/room_id_play.jpg)

/search - page for users to search the video they want before they add to the room playlist
![/search](documentation/search.jpg)

/search/result - page displaying the results of the search
![/search/result](documentation/search_result.jpg)

/user/history - page displaying the records of user history
![/:user/history](documentation/user_history.jpg)


## Site map
![site map](documentation/sitemap.jpg)


## User Stories or Use Cases
1. Users can choose to enter as a guest, or register and login.
2. Guest users will enter the same guest room.
3. Registered users can create their own rooms or enter other rooms from the hall.
4. Inside a room, user can search and add songs to the playlist of the room.
5. Inside a room, user can view other members in that room.
6. Inside a room, user can see the playlist and control the order of the playlist.
7. Inside a room, user can send messages to the chatbox of the room.
8. Registered users can view the history records of the songs they have added and delete some records.
9. Registered users can search song videos outside rooms


## Research Topics

* (2 points) Integrate YoutubeAPI
    * I'm going to be using YoutubeApi for video search and video playing
* (6 points) Explore React.js
    * explore react.js functionalities
    * integrate some of the functions into my app to make it more interactive
* (4 points) Explore some client-side Javascript libraries
    * entend my views and enlarge my tool set
    * integrate some of them into my web app
* (2 points) Perform client-side form validation
    * this is repeated as the example, but i want to try it
    * points will be adjusted based on my work on it


## [Link to Initial Main Project File](app.mjs) 


## Annotations / References Used

1. [tutorial on React.js](https://react.dev/learn)
