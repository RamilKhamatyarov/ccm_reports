/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace the content of this view to suit the needs of your application.
 * 
 * Modern Main
 */
Ext.define('CCM_Reports.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.MessageBox',

        // 'CCM_Reports.view.main.MainController',
        'CCM_Reports.view.main.MainModel',
        'CCM_Reports.view.main.RepRefController'
    ],
    // mixins: {
	// 	observable: 'Ext.util.Observable'
	// } ,
    controller: 'ref',
    id: 'main-tabs',
    activeTab: 0,

    viewModel: 'main',

    defaults: {
        tab: {
            iconAlign: 'top'
        },
        styleHtmlContent: true,
       
    },
	
    tabBarPosition: 'top',

    items: [
        {
            // title: 'Home',
            iconCls: 'x-fa fa-table',
            layout: 'fit',
            activeTab: 0,
            activeItem: 1,
            title: 'Reports',
            id: 'repList',
            layout: 'fit',
            autoScroll: true
        },{
            title: 'Users',
            iconCls: 'x-fa fa-user',
            bind: {
                html: '{loremIpsum}'
            }
        },{
            title: 'Groups',
            iconCls: 'x-fa fa-users',
            bind: {
                html: '{loremIpsum}'
            }
        },{
            title: 'Settings',
            iconCls: 'x-fa fa-cog',
            bind: {
                html: '{loremIpsum}'
            }
        }
    ],
    listeners: {
        
        activeitemchange: 'onItemChange', 
        show: 'addRepToList',
    } 
      
});
Ext.Ajax.request({
    url: 'http://192.168.0.84:8080/jasperserver-pro/rest_v2/resources?j_username=jasperadmin%7Corganization_1&j_password=jasperadmin',
    useDefaultXhrHeader: false,
    method: 'GET',
    headers:{              
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    },
    params:{
        fields: [{
            name: 'Description',
            type: 'description',
            align: 'right'
        }, 
        'uri', 'resourceType', 
        {
            name: 'creationDate',
            type: 'date',
        }, {
            name: 'updateDate',
            type: 'date'
        }
        ]
    },
    success: function(response){
        text = response.responseText;
        var jsonData = Ext.util.JSON.decode(text);
        var store = Ext.create('CCM_Reports.store.ReportStore', {
                proxy: {
                    data: jsonData
                }
        });
        // console.log('sayHello');
        store.filter('resourceType', 'reportUnit')
        store.load();
        var repListPanel = Ext.create('CCM_Reports.view.main.ReportList', {
            store: store,
            id: 'repTable', 
            flex: 1
        });
        var repCmp = Ext.getCmp('repList');
        repCmp.add(repListPanel);
    },
	
	//failure: function(result) {Ext.MessageBox.alert('Error', 'Some problem occurred");}
    //failure: function(result) {Ext.Msg.alert('Error', 'Some problem occurred', Ext.emptyFn);}
	failure: function(result) {
		console.log('Error ---> Some problem occurred');
		console.log(stackTrace());
		function stackTrace() {
				var err = new Error();
				return err.stack;
		}
	}
    
});
