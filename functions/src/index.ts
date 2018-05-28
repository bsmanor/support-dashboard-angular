import * as functions from 'firebase-functions';
import { Callback } from './../../src/app/models/callback';
import * as http from "http";
import fetch from "node-fetch";
import * as moment from "moment";
import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// DB Collections:
const livechatRef = db.collection('webhooks').doc('livechat');
const zendeskRef = db.collection('webhooks').doc('zendesk');
const callbacksRef = db.collection('callbacks');

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
  let login = req.query.login;
  console.log('====================================');
  console.log(login);
  console.log('====================================');
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


export const zendeskNewCallbackWebhook = functions.https.onRequest((req, res) => { // New visitor webhook
  const params = req.query.params;
  const ticket = {
    url: req.query.ticket_url,
    id: req.query.ticket_id,
    title: req.query.description
  }
  const callback: Callback = {
    username: null,
    networkId: null,
    date: null,
    time: null,
    assignee: null,
    ticketId: ticket.id,
    zendeskLink: ticket.url,
    status: null,
    statusMessage: null,
  }
  cors(req, res, () => {
    callbacksRef.add(callback)
    .then(snap => {
      res.status(200).json({response: ticket})
    })
    .catch(err => {
      res.status(200).json({response: err})
    })
  })
})
