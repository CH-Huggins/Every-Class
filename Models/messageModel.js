"use strict";

const db = require("./db");
const crypto = require("crypto");
const userModel = require("../Models/userModel");

/**
 * @brief       Gets all of a user's conversations
 *
 * @detailed    This finds all conversations associated with the user
 *              and returns an array sorted by how recent they were stored
 *              
 * @param       userID      the operating user's id
 * 
 * @return      returns an array of conversations that list the conversation ids,
 *              other user's name and id, and the date
**/

function getUsersConversations(userID){
    const sql = 'SELECT * FROM conversation WHERE first_userID = @userID OR second_userID = @userID';
    const stmt = db.prepare(sql);
    const convoArray = stmt.all({userID});
    const conversations = [];
    for (let i = 0; i < convoArray.length; i++){
        if (convoArray[i].first_userID == userID){
            const user = userModel.getUserByUserID(convoArray[i].second_userID);
            // Change Jimmy Joe to user first name and second name
            const conversation = {"conversationID": convoArray[i].conversationID,
                                "otherUser": convoArray[i].second_userID,
                                "firstName": user[0].firstName,
                                "lastName": user[0].lastName,
                                "date": convoArray[i].time};
    
            conversations.push(conversation);
        } else {
            const user = userModel.getUserByUserID(convoArray[i].first_userID);
            const conversation = {"conversationID": convoArray[i].conversationID,
                                "otherUser": convoArray[i].first_userID,
                                "firstName": user[0].firstName,
                                "lastName": user[0].lastName,
                                "date": convoArray[i].time};
    
            conversations.push(conversation);
        }
    }

    return conversations;
}

/**
 * @brief       Creates a new conversation for a user
 *
 * @detailed    This takes the two user's id's and forms a conversation table
 *              insertion
 *              
 * @param       userID1         the first user's id
 * 
 * @param       userID2         the second user's id
**/

function newConversation(userID1, userID2){
    const sql = 'INSERT INTO conversation VALUES (@conversationID, @first_userID, @second_userID, @date)';
    const stmt = db.prepare(sql);
    const id = getConversationID();
    const info = Date().split(' ');
    const date = info[4];

    stmt.run({"conversationID": id,
                "first_userID": userID1,
                "second_userID": userID2,
                "date": date});
}

/**
 * @brief       Sends a message to another user
 *
 * @detailed    This takes the message and who sent it into the database with
 *              the given post ID
 *              
 * @param       content         the message the user sent
 * 
 * @param       userID          the user sending the message
 * 
 * @param       conversationID  the id associated with the conversation
**/

function sendMessage(content, userID, conversationID) {
    const sql = 'INSERT INTO conversationReplies VALUES (@conversationReplies, @conversationID, @content, @time, @userID)';
    const stmt = db.prepare(sql);
    const info = Date().split(' ');
    const time = info[4];
    const array = getMessages(conversationID);
    const size = array.length + 1;


    stmt.run({"conversationReplies": size,
                "conversationID": conversationID,
                "content": content,
                "time": time,
                "userID": userID});
}

/**
 * @brief       Gets a unique conversation ID
 *
 * @detailed    Searches the conversation database and returns
 *              a conversation id that was not in the database
 *              
 * @return      Returns a unique conversation ID
**/

function getConversationID() {
    const sql = 'SELECT conversationID FROM conversation';
    const stmt = db.prepare(sql);
    const ids = stmt.all();

    // Get a new id as long as it exists in the database
    do{
        var id = crypto.randomUUID();
    } while (ids.includes(id));

    return id;
}

/**
 * @brief       Gets user IDs
 *
 * @detailed    This takes a conversation ID and returns the two users involved
 *              in the conversations
 *              
 * @param       conversationID  The id of the conversation ongoing between
 *                              two students
 * 
 * @return      Returns two user IDs
**/

function getUsersFromConversationID(conversationID) {
    const sql = 'SELECT first_userID, second_userID FROM conversation WHERE conversationID=@conversationID';
    const stmt = db.prepare(sql);
    return stmt.get({conversationID});
}

/**
 * @brief       Gets messages
 *
 * @detailed    This takes a conversation ID and returns the messages between
 *              two users
 *              
 * @param       conversationID  The id of the conversation ongoing between
 *                              two students
 * 
 * @return      Returns an array of json bodies containing messages and the
 *              user that sent them
**/

function getMessages(conversationID) {
    const sql = 'SELECT * FROM conversationReplies WHERE conversationID = @conversationID';
    const stmt = db.prepare(sql);
    return stmt.all({conversationID});
}

module.exports = {
    getUsersConversations,
    getMessages,
    sendMessage,
    newConversation,
    getUsersFromConversationID
}