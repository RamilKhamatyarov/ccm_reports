
// // See example of Ext.History in docs

// Ext.require([
//     'Ext.util.History'
// ]);

// Ext.util.History.init();

// // var tokenDelimiter = ':';

// Ext.define('CCM_Reports.view.main.HomeController', {
//     extend: 'Ext.app.ViewController',

//     alias: 'controller.home',

//     clickTabBut: function (tab) {
//         if (tab.title == 'Home'){
//             // Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
//         }  

//     },

//     onConfirm: function (choice) {
//         if (choice === 'yes') {
//             // Ext.create('CCM_Reports.view.main.Main');
//         }
//     },

//     onTabChange: function(tabPanel, tab) {
//         var tabs = [],
//             ownerCt = tabPanel.ownerCt,
//             oldToken, newToken;

//         var tokenDelimiter = ':';

//         tabs.push(tab.id);
//         tabs.push(tabPanel.id);

//         while (ownerCt && ownerCt.is('app-main')) {
//             tabs.push(ownerCt.id);
//             ownerCt = ownerCt.ownerCt;
//         }
//         newToken = tabs.reverse().join(tokenDelimiter);
//         oldToken = Ext.History.getToken();

//         if (oldToken === null || oldToken.search(newToken) === -1) {
//             Ext.History.add(newToken);
//         }
//     },
//     onAfterRender: function() {
//         Ext.History.on('change', function(token) {
//             var parts, length, i;

            

//             if (token) {
//                 // var tokenDelimiter = ':';
//                 parts = token.split(':');
//                 length = parts.length;

//                 // setActiveTab in all nested tabs
//                 for (i = 0; i < length - 1; i++) {
//                     Ext.getCmp(parts[i]).setActiveTab(Ext.getCmp(parts[i + 1]));
//                 }
//             }
//         });
//         // This is the initial default state.  Necessary if you navigate starting from the
//         // page without any existing history token params and go back to the start state.
//         var activeTab1 = Ext.getCmp('main-tabs').getActiveTab(),
//             activeTab2 = activeTab1.getActiveTab();

//         this.onTabChange(activeTab1, activeTab2);
//     }
// });
