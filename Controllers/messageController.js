"use strict";

const messageModel = require("../Models/messageModel");
const userModel = require("../Models/userModel");

/**
 * @brief       Renders all conversations
 *
 * @detailed    This renders a page that displays every conversation that a
 *              student has had with another student. Each can be clicked to
 *              direct the student to the messages they have with the student
 *              listed on the conversation
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function renderMessages(req, res) {
        // If logged in, operate
        if (req.session.isLoggedIn){
            // Initializes an array courses of all courses a user is taken given
            // their email
            let messages = messageModel.getUsersConversations(req.session.user.userID);

            messages = messages.sort((a, b) => {
                if (a.date > b.date){
                    return -1
                }
            });
            // Returns true for added as false is only delivered when max hours
            // are being taken
            res.render("messages", {"messages": messages});
        } else {
            // If not, redirect to login page
            res.render("log_in");
        }
}

/**
 * @brief       Renders all messages
 *
 * @detailed    This renders a page that displays every message that the user
 *              has with the listed student. They can also send a message here.
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function renderConversation(req, res) {
    // If logged in, operate
    if (req.session.isLoggedIn){
        // Initializes course to the name that was clicked on the courses page
        const id = req.params.conversationID;
        // Initializes courseRating which gets a json body of the ratings
        // of a given course
        let conversation = messageModel.getMessages(id);

        // Get the users in the messages
        const users = messageModel.getUsersFromConversationID(id);

        let sender;
        let receiver;
        
        // Decide who is the sender and who is the receiver
        if (users.first_userID == req.session.user.userID) {
            sender = userModel.getUserByUserID(req.session.user.userID);
            receiver = userModel.getUserByUserID(users.second_userID);
        } else {
            sender = userModel.getUserByUserID(users.second_userID);
            receiver = userModel.getUserByUserID(users.first_userID);
        }

        // Sort by time
        conversation = conversation.sort((a, b) => {
            if (a.conversationReplies > b.conversationReplies){
                return -1
            }
        });

        // Gives course and the rating of that course
        res.render("conversation", {"conversation": conversation,
                                        "conversationID": id,
                                        "userID": req.session.user.userID,
                                        "sender": sender,
                                        "receiver": receiver});
    } else {
        // If not, redirect to login page
        res.render("log_in");
    }
}

/**
 * @brief       Renders all messages with the new message that the user sent.
 *
 * @detailed    This renders a page that displays every message that the user
 *              has with the listed student. The message that was sent is added
 *              to the database.
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function renderSentMessage(req, res) {
    // If logged in, operate
    if (req.session.isLoggedIn){
        // Initializes course to the name that was clicked on the courses page
        const id = req.body.conversationID;
        const content = req.body.content;

        // Add the message to the database
        messageModel.sendMessage(content, req.session.user.userID, id);

       // Get the users in the messages
        const users = messageModel.getUsersFromConversationID(id);

        let sender;
        let receiver;
        
        // Decide who is the sender and who is the receiver
        if (users.first_userID == req.session.user.userID) {
            sender = userModel.getUserByUserID(req.session.user.userID);
            receiver = userModel.getUserByUserID(users.second_userID);
        } else {
            sender = userModel.getUserByUserID(users.second_userID);
            receiver = userModel.getUserByUserID(users.first_userID);
        }

        // Initializes courseRating which gets a json body of the ratings
        // of a given course
        let conversation = messageModel.getMessages(id);

        // Sort by time
        conversation = conversation.sort((a, b) => {
            if (a.time > b.time){
                return -1
            }
        });

        // Gives course and the rating of that course
        res.render("conversation", {"conversation": conversation,
                                        "conversationID": id,
                                        "userID": req.session.user.userID,
                                        "sender": sender,
                                        "receiver": receiver});
    } else {
        // If not, redirect to login page
        res.render("log_in");
    }
}

/**
 * @brief       Renders a list of students that a user can create a conversation 
 *              with
 *
 * @detailed    Given a list of students, a user can search and select one and
 *              add them to the conversation database to start a new 
 *              conversation.
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function renderNewConversation(req, res) {
    if (req.session.isLoggedIn){
        const users = userModel.getAllUsers();

        res.render("newConversation", {"users": users});
    } else {
        // If not, redirect to login page
        res.render("log_in");
    }
}

/**
 * @brief       Renders all conversations
 *
 * @detailed    This renders a page that displays every conversation that a
 *              student has had with another student. Each can be clicked to
 *              direct the student to the messages they have with the student
 *              listed on the conversation. This is done after the new
 *              conversation is added to the database.
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function renderConversationAdded(req, res) {
    if (req.session.isLoggedIn){
        const id = req.body.userID;
        const user = req.session.user.userID

        // Add the new conversation
        messageModel.newConversation(user, id);

        // Initializes an array courses of all courses a user is taken given
        // their email
        let messages = messageModel.getUsersConversations(req.session.user.userID);

        messages = messages.sort((a, b) => {
            if (a.conversationReplies > b.conversationReplies){
                return -1
            }
        });

        // Returns true for added as false is only delivered when max hours
        // are being taken
        res.render("messages", {"messages": messages});
    } else {
        res.render("log_in");
    }
}

module.exports = {
    renderMessages,
    renderConversation,
    renderSentMessage,
    renderNewConversation,
    renderConversationAdded
}
