import * as functions from 'firebase-functions';
import * as http from "http";
import fetch from "node-fetch";
import * as moment from "moment";
import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// DB Collections:
const livechatRef = db.collection('webhooks').doc('livechat');

const cors = require('cors')({origin: true});

const LiveChatApi = require('livechatapi').LiveChatApi;
const liveChatApi = new LiveChatApi('manor@tune.com', '4a96a80f4cb036ec84c4585ab7a5139d');


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript


const yyyymmdd = (date) => {
  const yyyy = moment(date).format('YYYY');
  const mm = moment(date).format('MM');
  const dd = moment(date).format('DD');
  return `${yyyy}-${mm}-${dd}`;
}

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
    liveChatApi.visitors.list({state: 'chatting'}, (data) => {
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
    fetch("https://api.livechatinc.com/agents", {
      headers: {
        method: 'POST',
        Authorization: "Basic manor@tune.com:4a96a80f4cb036ec84c4585ab7a5139d",
        "X-Api-Version": "2"
      }
    })
    .then(response => {
      res.status(200).json({response: response})
    })
    .catch(err => {
      res.status(500).json({response: err})
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


export const offerStatusChanged = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    console.log(req);
    res.status(200).send(req.body);
  })
})