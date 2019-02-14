/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        $(function() {
            console.log('function start');
            /* chage page to home */
            $.mobile.changePage( "#home", {
                changeHash: false
              });
        });
        $( document ).on( "pagecontainerchange", function( e ) {
            var page = $( ".ui-page-active" ).attr('id');
            console.log('app.js-pagecontainerchange-' + page);
        });
        $( document ).on( "pagecontainerhide", function( e, ui ) {
            var page = e.target.id;
            console.log('pagecontainerhide: ' + page);
        });
        $( document ).on( "pagecreate", function( e ) {
            var page = e.target.id;
            console.log('pagecreate: ' + page);
        });
        $( document ).on( "pagecontainershow", function( event ) {
            console.log('pagecontainershow');
        });
    }
};
