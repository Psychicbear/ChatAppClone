# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Design Documentation

## Introduction

### Background

In order to work on my skills in react, and develop an understanding of how various web technologies work, I want to begin creating more projects which help me hone my skills and learn more web technologies. I also recognise that there may be some holes in my foundational knowledge which I want to fill in to ensure that I am learning web dev in the right way. This project is an introduction to my personal learning journey and will attempt to recreate a chat app which mirrors something like Discord or Facebook messenger. The idea is to allow a user experience in which users can quickly and easily sign up and join communities, groups or simply communicate through direct messaging immediately.

### Scope

The project aims to fulfill all parts of a functional app which enables social features between active users in the app. As such, there will be a front end component which uses react to present the user interface and enable interactions between the user and the app, and there will be a back end component which enables communication between the user interface and the user information and chats.

The front end will use react with the react router to enable a server side rendering style of functionality, in which users will log in through the log in page, and the router will send the user to the dashboard which allows them interaction with all functionality of the web app. The GUI will be designed with Tailwind CSS to make CSS design easier and more "on the fly" to customise. The user will be able to add friends, communicate with those friends directly, and then they will be able to create servers with channels to allow interactions within a community without the need to add friends. It will allow users to meet other users in a natural way by joining servers which pertain to a shared interest. This is the idea behind the app as a whole, though my intention in creating it is to learn different ways to achieve this goal.

The back end will be a hosted server, much like a proxy, which the front end will ping for information. The back end server will have various endpoints which serve information to the front end based on the authorisation of the client making the request. I intend to use MongoDB to manage user information and chat logs, though if I were to use the app in production, it would be helpful to review more options which serve a larger set of users. The server itself will try to use Mongoose to integrate an ORM structure into data management. To serve messages to users, socket.IO will be used to create the channel structure. In doing so, it will enable notification services and allow active updates to connected users

## Requirements

### User Requirements

* User authentication (Login, logout, remain logged in across sessions)
* Adding and removing friends (send and receive friend requests, accept or reject friend requests)

* Sending and receiving messages between friends
* Viewing chat logs of a chat

* Viewing chat logs in different formats (Direct message, Group, Server Channel)
* CRUD for own user account (read settings, update settings, remove account)

Potentially client side features such as themes, different page layouts etc

### Front End Requirements

* Login page which sends a login request to backend, on success it will redirect user to dashboard, on failure return an error message
* Dashboard which simply shows servers that user is in, perhaps shows activity of servers, inbox from servers and messages, shows activity of friends
* Server list component, shows list of server badges which user can click on to navigate to respective server route
* Server component which shows the list of channels within a server, shows default channel and its contents, contained within server route
* Channel component which shows the contents of a current text channel, shows sidebar of all participants
* Chat component which simply lays out chat messages from each user of the page, updates based off backend socket.io updates
* Message collection component, which displays a collection of messages in which the chain of messages are unbroken within 10 mins (messages within 10 mins of each other stay clumped together, not having to redisplay the user name and profile pic of user)
* Message component, displays a message and displays timestamp on hover if it is not first message of collection
* Participant list component, displays list of participants, and varies based on whether or not it is viewed in a channel, group or direct message.
* Participant component, displays one participant in list, shows their name, profile picture and whether or not they are online/active

### Back End Requirements


# Rough Feature Ideas

## Notifications

A notification service should be integrated and used by each user in most if not every dynamic interaction with the server. Whenever updates occur, a notification will be sent to the user in the database, with information about the nature of the update (message, friend request etc). In all interactions where a notification can exist (channel, direct message, friend request list etc), loading this information will also clear the relevant notifications. Eg, Whenever a direct message is recieved, save an object in the user database which follows a structure such as:

```json
{
	"type": "dm",
	"end-user": "23345", //User ID of user receiving message
	"channel": "2334554332" //Channel ID for DM, constructed of the two participant User IDs concatenated
	"preview": "Hi, how are you going today?" //Preview message for if such a preview is implemented
}
```

All the notifications can be loaded once from the user data upon logging in, and notification updates will be sent to the server and to the affected clients. Once the notifications are dismissed through viewing them, it will remove them from the user data within the database.

## Chat pagination (?)

I struggled initially with the idea of how to properly load and present messages so that the latest messages were at the bottom of the view container, and users can scroll up to load new messages. I made the realistation however there it may be possible to use a pagination feature of the database or perhaps ORM, and base the chat loading off of scroll position. That is to say, loading the chat will load the first ~20 messages and then put the view container's scroll to the bottom of the view container. Then when the scroll reaches the top of the chat, the next "page" or rather the next ~20 messages will be loaded, resetting the scroll position to wherever it would need to be to view the newly loaded messages. There may be a variable or switch which determines whether or not all messages have been loaded, so that it does not make another request to the server to load nothing, and this can be determined by whether or not the ORM has reached the end of the pagination.
