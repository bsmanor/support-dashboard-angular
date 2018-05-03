"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const node_fetch_1 = require("node-fetch");
const moment = require("moment");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
// DB Collections:
const livechatRef = db.collection('webhooks').doc('livechat');
const cors = require('cors')({ origin: true });
const LiveChatApi = require('livechatapi').LiveChatApi;
const liveChatApi = new LiveChatApi('manor@tune.com', '4a96a80f4cb036ec84c4585ab7a5139d');
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
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
        liveChatApi.visitors.list({ state: 'chatting' }, (data) => {
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
        node_fetch_1.default("https://api.livechatinc.com/agents", {
            headers: {
                Authorization: "Basic manor@tune.com:4a96a80f4cb036ec84c4585ab7a5139d",
                "X-Api-Version": "2"
            }
        })
            .then(response => {
            res.status(200).json({ response: response });
        })
            .catch(err => {
            res.status(500).json({ response: err });
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
exports.offerStatusChanged = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        console.log(req);
        res.status(200).send(req.body);
    });
});
//# sourceMappingURL=index.js.map