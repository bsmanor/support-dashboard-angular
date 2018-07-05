import axios from 'axios';
import * as admin from "firebase-admin";
import * as functions from 'firebase-functions';
import * as moment from "moment";
import { Callback } from './../../src/app/models/callback';
import { CallbackTicket, NotificationMessage } from './models';
const cors = require('cors')({origin: true});
// The Firebase Admin SDK to access the Firebase Realtime Database.
admin.initializeApp();

const db = admin.firestore();

// DB Collections:
const livechatRef = db.collection('webhooks').doc('livechat');
const zendeskRef = db.collection('webhooks').doc('zendesk');
const callbacksRef = db.collection('callbacks');


const LiveChatApi = require('livechatapi').LiveChatApi;
const liveChatApi = new LiveChatApi('manor@tune.com', '4a96a80f4cb036ec84c4585ab7a5139d');


// Zendesk API initialization
const Zendesk = require('zendesk-node-api');
const zendesk = new Zendesk({
  url: 'https://tune.zendesk.com', 
  token: 'bWFub3JAdHVuZS5jb206RnJhbmtlbCo1MA==',
  oauth: true
});



const yyyymmdd = (date) => {
  const yyyy = moment(date).format('YYYY');
  const mm = moment(date).format('MM');
  const dd = moment(date).format('DD');
  return `${yyyy}-${mm}-${dd}`;
}

// Cloud messaging initialization

// Add user's token to a messaging group
export const subscribeToTopic = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const token = req.query.token;
    const topic = req.query.topic;
    admin.messaging().subscribeToTopic(token, topic);
  });
})


// Sending push notifications
// 1. Initialize the messages listener
exports.fcmSend = functions.firestore.document(`messages/global`).onWrite(event => {
  const message: NotificationMessage = event.after.data().message;
  console.log(message);
  const payload = {
    notification: {
      title: message.title,
      body: message.body,
      icon: message.icon
    }
  };
  // 2. Check if a message is address for a group (by topic) or to a specific agent
  if (message.topic) {
    admin.messaging().sendToTopic(message.topic, payload)
    .then(res => {
      console.log("Sent Successfully", res);
    })
    .catch(err => {
      console.log(err);
    });
  } else if (message.agent) {
    admin.messaging().sendToDevice(message.agent, payload)
    .then(res => {
      console.log("Sent Successfully", res);
    })
    .catch(err => {
      console.log(err);
    });
  }
});

// -------  Live Chat REST API ------------

export const liveChatQueuedVisitorsReport = functions.https.onRequest((req, res) => { // Queued Report
  cors(req, res, () => {
    liveChatApi.reports.getQueuedVisitorsReport({date_from: yyyymmdd(new Date())}, (data) => {
      res.status(200).json({response: data})
    })
  })
})

export const liveChatTodayTotalChats = functions.https.onRequest((req, res) => { // Chat Totals Report
  cors(req, res, () => {
    liveChatApi.reports.getChatsReport({date_from: yyyymmdd(new Date()), group_by: 'day'}, (data) => {
      res.status(200).json({response: data})
    })
  })
})

export const liveChatTodayRatings = functions.https.onRequest((req, res) => { // Chat Ratings Report
  cors(req, res, () => {
    liveChatApi.reports.getRatingsReport({date_from: yyyymmdd(new Date()), group_by: 'day'}, (data) => {
      res.status(200).json({response: data})
    })
  })
})

export const liveChatChattingVisitors = functions.https.onRequest((req, res) => { // All Currently Chating Visitors
  cors(req, res, () => {
    liveChatApi.visitors.list({state: 'chatting', group: [2,12]}, (data) => {
      res.status(200).json({response: data})
    })
  })
})

export const liveChatQueuedVisitors = functions.https.onRequest((req, res) => { // Queued Visitors
  cors(req, res, () => {
    liveChatApi.visitors.list({state: 'queued'}, (data) => {
      res.status(200).json({response: data})
    })
  })
})

export const liveChatAgentsStatus = functions.https.onRequest((req, res) => { // All Agents Status
  cors(req, res, () => {
    liveChatApi.agents.list({}, (data) => {
      console.log(data)
      res.status(200).json({response: data})
    })
  })
})

export const liveChatAgentStatus = functions.https.onRequest((req, res) => { // Specific Agent's Status
  const login = req.query.login;
  cors(req, res, () => {
    liveChatApi.agents.get(login, (data) => {
      console.log(data)
      res.status(200).json({response: data})
    })
  })
})

export const liveChatChatStartedWebhook = functions.https.onRequest((req, res) => {  // Chat-Started webhook
  cors(req, res, () => {
    livechatRef.update({event: 1})
    .then(response => {
      res.status(200).json({response: 'Livechat: New chat started'})
    })
    .catch(err => {
      res.status(200).json({response: err})
    })
  })
})

export const liveChatChatEndedWebhook = functions.https.onRequest((req, res) => {  // Chat-Ended webhook
  cors(req, res, () => {
    livechatRef.update({event: 2})
    .then(response => {
      res.status(200).json({response: 'Livechat: chat ended'})
    })
    .catch(err => {
      res.status(200).json({response: err})
    })
  })
})

export const liveChatVisitorQueuedWebhook = functions.https.onRequest((req, res) => { // New visitor webhook
  cors(req, res, () => {
    livechatRef.update({event: 3})
    .then(response => {
      res.status(200).json({response: 'Livechat: New visitor in the queue'})
    })
    .catch(err => {
      res.status(200).json({response: err})
    })
  })
})

// --------- !LiveChat REST API ---------------



// --------- Zendesk REST API ---------------

export const zendeskNewCallbackWebhook = functions.https.onRequest((req, res) => { // New callback webhook
  // This end point listens to new callbacks sent by Zendesk
  // The HTTP request from Zendesk will contain the Zendesk ticket's url, id, description and title
  const params = req.query.params;
  const ticket: CallbackTicket = {
    url: req.query.ticket_url,
    id: req.query.ticket_id,
    description: req.query.description,
    title: req.query.title
  }

  const sliceFromString = (myString: string, startsWith: string, endsWith: string): string => {
    // This function will return the content in-between two specified strings in a text
    // Will be used afterwards for getting the different data sections of the ticket's discription
    const start =  myString.indexOf(startsWith) + startsWith.length;
    let end: number;
    if(myString.indexOf(endsWith) !== -1) { // Checks that the end string does exist, otherwise, will add + 1 to the end length. 
      end = myString.indexOf(endsWith)
    } else {
      end = myString.indexOf(endsWith) + 1
    }

    if(myString.slice(start, end).trim().length === 0) {
      return 'empty'
    } else {
      return myString.slice(start, end).trim();
    }
  }

  let callback: Callback;
  
  // Check if the received ticket is indeed a callback ticket
  if(ticket.description.search('HasOffers Technical Support callback') !== -1) {
    // Create the callback object
    callback = {
      username: sliceFromString(ticket.description, 'Invitee:**', '**Invitee Email:'),
      networkId: sliceFromString(ticket.description, 'Network ID**', 'Sent from Calendly'),
      description: ticket.title,
      dateTime: sliceFromString(ticket.description, 'Event Date/Time:**', '(Pacific'),
      dateTimeUnixTimestamp: moment(sliceFromString(ticket.description, 'Event Date/Time:**', '(Pacific')).format('X'),
      assignee: 'Not Assigned',
      ticketId: ticket.id,
      zendeskLink: ticket.url,
      status: 'Open',
      statusMessage: 'The client is waiting for a call. No other info is needed or requested by us',
      email: sliceFromString(ticket.description, 'Invitee Email:**', '**Event Date/Time:'),
      contactInfo: sliceFromString(ticket.description, 'Contact method (phone number, Skype id, etc.)**', '**Issue Summary'),
      issueSummary: sliceFromString(ticket.description, 'Issue Summary**', '**Network ID'),
      emailBody: ticket.description
    }
  
    // checks if the hour is am or pm and setting the hour variable acordingly
    if(callback.dateTime.indexOf('pm') === -1) {
      callback.hour = callback.dateTime.slice(0, callback.dateTime.indexOf('am'))
    } else {
      callback.hour = callback.dateTime.slice(0, callback.dateTime.indexOf('pm'))
      callback.hour = `${parseInt(callback.hour.slice(0,2)) + 12}${callback.hour.slice(2,5)}`;         
      //console.log(callback.hour);
    }
    // Creating a unix timestamp of the scheduled callback date
    callback.dateTimeUnixTimestamp = moment(`${callback.dateTime.slice(callback.dateTime.indexOf(',') + 2 - callback.dateTime.length)}, ${callback.hour}`).format('X');
  } else {
    callback = {
      username: 'null',
      networkId: 'null',
      description: 'null',
      dateTime: 'null',
      dateTimeUnixTimestamp: 'null',
      assignee: 'Not Assigned',
      ticketId: ticket.id,
      zendeskLink: ticket.url,
      status: 'Open',
      statusMessage: 'The client is waiting for a call. No other info is needed or requested by us',
      email: 'null',
      contactInfo: 'null',
      issueSummary: 'null'
    }
  }

  cors(req, res, () => {
    // Add the new callback to the DB 'callbacks' callection
    callbacksRef.doc(ticket.id).set(callback)
    .then(snap => {
      // Create a message object and add to the DB messages collection in order to send push nitification for the new callback
      const message = {
        message: {
          title: `New callback request from ${callback.networkId} network`,
          body: `Scheduled to ${callback.dateTime} \nRequested by ${callback.username}`,
          icon: 'https://firebasestorage.googleapis.com/v0/b/hasoffers-support-dashboard.appspot.com/o/images%2FiconCallback.png?alt=media&token=7018b32c-0000-4cec-894c-0b6185b47b5c',
          topic: 'callbacks'
        }
      }
      // Send push notification
      admin.firestore().doc('messages/global').set(message);

      res.status(200).json({response: ticket})
    })
    .catch(err => {
      res.status(200).json({response: err})
    })
  })
})


export const zendeskNewTicketkWebhook = functions.https.onRequest((req, res) => { // New ticket webhook
  cors(req, res, () => {
    res.status(200).json({response: 'sucess'})
  })
})

export const zendeskAssignAgentToTicket = functions.https.onRequest((req, res) => { 
  // Update assignee on Zendesk when updated via the support interface 
  const assigneeEmail = req.query.assignee_email;
  const ticketId = req.query.ticketId;
  cors(req, res, () => {
    axios.put(`https://tune.zendesk.com/api/v2/tickets/${ticketId}.json`, 
    {
      "ticket": {
        "assignee_email": assigneeEmail, 
      }
    },
    { 
      headers: {
        "Authorization": 'Basic bWFub3JAdHVuZS5jb206RnJhbmtlbCo1MA=='
      },
    })
    .then((zendeskRes) => {
      res.status(200).json({response: `Ticket ID #${ticketId} was successfully assigned to ${assigneeEmail}`})
    })
    .catch((err) => {
      res.status(200).json({response: err})
    })
  })
})

export const zendeskAgentAssignedToTicket = functions.https.onRequest((req, res) => { 
  // Listens to when a ticket is assigned to an agent on Zendesk, and updates the same on the DB.
  cors(req, res, () => {
    const ticketId = req.query.ticketId;
    const assigneeEmail = req.query.assignee_email;
    admin.firestore().doc(`callbacks/${ticketId}`).update({assignee: assigneeEmail})
    .then((zendeskRes) => {
      res.status(200).json({response: `success`})
    })
    .catch((err) => {
      res.status(200).json({response: err})
    })
  })
})