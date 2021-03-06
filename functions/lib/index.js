"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const moment = require("moment");
const admin = require("firebase-admin");
// The Firebase Admin SDK to access the Firebase Realtime Database.
admin.initializeApp();
const db = admin.firestore();
// DB Collections:
const livechatRef = db.collection('webhooks').doc('livechat');
const zendeskRef = db.collection('webhooks').doc('zendesk');
const callbacksRef = db.collection('callbacks');
const cors = require('cors')({ origin: true });
const LiveChatApi = require('livechatapi').LiveChatApi;
const liveChatApi = new LiveChatApi('manor@tune.com', '4a96a80f4cb036ec84c4585ab7a5139d');
const yyyymmdd = (date) => {
    const yyyy = moment(date).format('YYYY');
    const mm = moment(date).format('MM');
    const dd = moment(date).format('DD');
    return `${yyyy}-${mm}-${dd}`;
};
// -------  Live Chat REST API ------------
exports.liveChatQueuedVisitorsReport = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        liveChatApi.reports.getQueuedVisitorsReport({ date_from: yyyymmdd(new Date()) }, (data) => {
            res.status(200).json({ response: data });
        });
    });
});
exports.liveChatTodayTotalChats = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        liveChatApi.reports.getChatsReport({ date_from: yyyymmdd(new Date()), group_by: 'day' }, (data) => {
            res.status(200).json({ response: data });
        });
    });
});
exports.liveChatTodayRatings = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        liveChatApi.reports.getRatingsReport({ date_from: yyyymmdd(new Date()), group_by: 'day' }, (data) => {
            res.status(200).json({ response: data });
        });
    });
});
exports.liveChatChattingVisitors = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        liveChatApi.visitors.list({ state: 'chatting', group: [2, 12] }, (data) => {
            res.status(200).json({ response: data });
        });
    });
});
exports.liveChatQueuedVisitors = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        liveChatApi.visitors.list({ state: 'queued' }, (data) => {
            res.status(200).json({ response: data });
        });
    });
});
exports.liveChatAgentsStatus = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        liveChatApi.agents.list({}, (data) => {
            console.log(data);
            res.status(200).json({ response: data });
        });
    });
});
exports.liveChatAgentStatus = functions.https.onRequest((req, res) => {
    let login = req.query.login;
    console.log('====================================');
    console.log(login);
    console.log('====================================');
    cors(req, res, () => {
        liveChatApi.agents.get(login, (data) => {
            console.log(data);
            res.status(200).json({ response: data });
        });
    });
});
exports.liveChatChatStartedWebhook = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        livechatRef.update({ event: 1 })
            .then(response => {
            res.status(200).json({ response: 'Livechat: New chat started' });
        })
            .catch(err => {
            res.status(200).json({ response: err });
        });
    });
});
exports.liveChatChatEndedWebhook = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        livechatRef.update({ event: 2 })
            .then(response => {
            res.status(200).json({ response: 'Livechat: chat ended' });
        })
            .catch(err => {
            res.status(200).json({ response: err });
        });
    });
});
exports.liveChatVisitorQueuedWebhook = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        livechatRef.update({ event: 3 })
            .then(response => {
            res.status(200).json({ response: 'Livechat: New visitor in the queue' });
        })
            .catch(err => {
            res.status(200).json({ response: err });
        });
    });
});
// --------- !LiveChat REST API ---------------
// --------- Zendesk REST API ---------------
exports.zendeskNewCallbackWebhook = functions.https.onRequest((req, res) => {
    const params = req.query.params;
    const ticket = {
        url: req.query.ticket_url,
        id: req.query.ticket_id,
        description: req.query.description,
        title: req.query.title
    };
    const sliceFromString = (myString, startsWith, endsWith) => {
        const start = myString.indexOf(startsWith) + startsWith.length;
        let end;
        if (myString.indexOf(endsWith) !== -1) { // Checks that the end string does exist, otherwise, will add + 1 to the end length. 
            end = myString.indexOf(endsWith);
        }
        else {
            end = myString.indexOf(endsWith) + 1;
        }
        if (myString.slice(start, end).trim().length === 0) {
            return 'empty';
        }
        else {
            return myString.slice(start, end).trim();
        }
    };
    let callback;
    if (ticket.description.search('HasOffers Technical Support callback') !== -1) {
        callback = {
            username: sliceFromString(ticket.description, 'Invitee:', 'Invitee Email:'),
            networkId: sliceFromString(ticket.description, 'Network ID', 'Sent from Calendly'),
            description: ticket.title,
            dateTime: sliceFromString(ticket.description, 'Event Date/Time:', '(Pacific'),
            dateTimeUnixTimestamp: moment(sliceFromString(ticket.description, 'Event Date/Time:', '(Pacific')).format('X'),
            assignee: 'Not Assigned',
            ticketId: ticket.id,
            zendeskLink: ticket.url,
            status: 'Open',
            statusMessage: 'The client is waiting for a call. No other info is needed or requested by us',
            email: sliceFromString(ticket.description, 'Invitee Email:', 'Event Date/Time:'),
            contactInfo: sliceFromString(ticket.description, 'Contact method (phone number, Skype id, etc.)', 'Issue Summary'),
            issueSummary: sliceFromString(ticket.description, 'Issue Summary', 'Network ID')
        };
        // checks if the hour is am or pm and setting the hour variable acordingly
        if (callback.dateTime.indexOf('pm') === -1) {
            callback.hour = callback.dateTime.slice(0, callback.dateTime.indexOf('am'));
        }
        else {
            callback.hour = callback.dateTime.slice(0, callback.dateTime.indexOf('pm'));
            callback.hour = `${parseInt(callback.hour.slice(0, 2)) + 12}${callback.hour.slice(2, 5)}`;
            //console.log(callback.hour);
        }
        // Creating a unix timestamp of the scheduled callback date
        callback.dateTimeUnixTimestamp = moment(`${callback.dateTime.slice(callback.dateTime.indexOf(',') + 2 - callback.dateTime.length)}, ${callback.hour}`).format('X');
    }
    else {
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
        };
    }
    cors(req, res, () => {
        callbacksRef.doc(ticket.id).set(callback)
            .then(snap => {
            res.status(200).json({ response: ticket });
        })
            .catch(err => {
            res.status(200).json({ response: err });
        });
    });
});
exports.zendeskNewTicketkWebhook = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        res.status(200).json({ response: 'sucess' });
    });
});
//# sourceMappingURL=index.js.map