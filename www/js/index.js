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
    defaults: {
        version: '0.1.0a',
        sport: 'BB',
        speedDisplay: 'MPH',
        country: 'US',
        pitchSettings: {
            'BB':{
                'columns':['Speed %','Spin %','LH side','LH 3/4','LH Over','Vertical','RH Over','RH 3/4','RH Side'],
                '2SFB':[100,100,210,180,150,90,30,0,330]
            }
        }
    },
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
            $('#main-menu').dropdown();
            console.log('function start');
            /* calibrate default */
            var pipsSlider = document.getElementById('distToPlateSlider');
            var updateSliderValue = document.getElementById('distToPlateValue');
            noUiSlider.create(pipsSlider, {
                step:.6,
                range: {
                    min: 10,
                    max: 70
                },
                start: [60.6],
                pips: {mode: 'count', values: 5}
            });
            pipsSlider.noUiSlider.on('update', function (values, handle) {
                distToPlatValue.innerHTML = values[handle];
            });
            $('#calibrate-message').on('click', function() {
                $(this).closest('.message').transition('fade');
            });
            /* end of calibrate */

            /* diagnostics default */
            $("#bottom-wheel").knob({
                change : function (value) {
                    console.log("speed-change : " + value);
                    var color = 'green';
                    if (value>1100) {color = 'orange';}
                    if (value>2200) {color = 'red';}
                    $("#bottom-wheel").trigger(
                        'configure',
                        {"fgColor":color}
                    );
                    $("#bottom-wheel").css({"color":color});
                },
                release : function (value) {
                    console.log("speed-release : " + value);
                },
                cancel : function () {
                    console.log("speed-cancel : ", this);
                },
                format : function (value) {
                    var dsp = $('#speed-display').is(":checked") ? $('#speed-display').attr('data-on-text') : $("#speed-display").attr('data-off-text');
                    if (value == 0) {
                        value = "--";
                        $("#top-wheel").css({"color":'black'});
                    }
                    var led = value;
                    if (led == "--") {led = "   ";}
                    if (value != 3500 && value != "--"){led = " "+led;}
                    //app.led.setValue(led+dsp)
                    return value;
                },
                draw : function () {
                }
            });
            $("#left-wheel").knob({
                change : function (value) {
                    console.log("speed-change : " + value);
                    var color = 'green';
                    if (value>1100) {color = 'orange';}
                    if (value>2200) {color = 'red';}
                    $("#left-wheel").trigger(
                        'configure',
                        {"fgColor":color}
                    );
                    $("#left-wheel").css({"color":color});
                },
                release : function (value) {
                    console.log("left speed-release : " + value);
                },
                cancel : function () {
                    console.log("left speed-cancel : ", this);
                },
                format : function (value) {
                    var dsp = $('#speed-display').is(":checked") ? $('#speed-display').attr('data-on-text') : $("#speed-display").attr('data-off-text');
                    if (value == 0) {
                        value = "--";
                        $("#left-wheel").css({"color":'black'});
                    }
                    var led = value;
                    if (led == "--") {led = "   ";}
                    if (value != 3500 && value != "--"){led = " "+led;}
                    //app.led.setValue(led+dsp)
                    return value;
                },
                draw : function () {
                }
            });
            $("#right-wheel").knob({
                change : function (value) {
                    console.log("speed-change : " + value);
                    var color = 'green';
                    if (value>1100) {color = 'orange';}
                    if (value>2200) {color = 'red';}
                    $("#right-wheel").trigger(
                        'configure',
                        {"fgColor":color}
                    );
                    $("#right-wheel").css({"color":color});
                },
                release : function (value) {
                    console.log("left speed-release : " + value);
                },
                cancel : function () {
                    console.log("left speed-cancel : ", this);
                },
                format : function (value) {
                    var dsp = $('#speed-display').is(":checked") ? $('#speed-display').attr('data-on-text') : $("#speed-display").attr('data-off-text');
                    if (value == 0) {
                        value = "--";
                        $("#right-wheel").css({"color":'black'});
                    }
                    var led = value;
                    if (led == "--") {led = "   ";}
                    if (value != 3500 && value != "--"){led = " "+led;}
                    //app.led.setValue(led+dsp)
                    return value;
                },
                draw : function () {
                }
            });

            var horControl = document.getElementById('horControl');
            var updateHorControl = document.getElementById('horControl');
            noUiSlider.create(horControl, {
                zstep:5,
                range: {
                    min: -45,
                    max: 45
                },
                start: 0,
                pips: {mode: 'values', values: [-45,-35,-25,-15,0,15,25,35,45],density:5}
            });

            horControl.noUiSlider.on('update', function (values, handle) {
                verControlValue.innerHTML = values[handle];
            });
            var verControl = document.getElementById('verControl');
            var updateVerControl = document.getElementById('horControl');
            noUiSlider.create(verControl, {
                zstep:5,
                range: {
                    min: -45,
                    max: 45
                },
                start: 0,
                pips: {mode: 'values', values: [-45,-35,-25,-15,0,15,25,35,45],density:5}
            });
            verControl.noUiSlider.on('update', function (values, handle) {
                verControlValue.innerHTML = values[handle];
            });


            $("#diagnostics-message").on('click', function() {
                $(this).closest('.message').transition('fade');
            });
            /* end of diagnostics */

            /* ipitcher defaults */
            $("#top-speed").knob({
                change : function (value) {
                    console.log("speed-change : " + value);
                    var color = 'green';
                    if (value>60) {color = 'orange';}
                    if (value>85) {color = 'red';}
                    $("#top-speed").trigger(
                        'configure',
                        {"fgColor":color}
                    );
                    $("#top-speed").css({"color":color});
                },
                release : function (value) {
                    console.log("left speed-release : " + value);
                },
                cancel : function () {
                    console.log("left speed-cancel : ", this);
                },
                format : function (value) {
                    var dsp = $('#speed-display').is(":checked") ? $('#speed-display').attr('data-on-text') : $("#speed-display").attr('data-off-text');
                    if (value == 0) {
                        value = "--";
                        $("#top-speed").css({"color":'black'});
                    }
                    var led = value;
                    if (led == "--") {led = "   ";}
                    if (value != 100 && value != "--"){led = " "+led;}
                    //app.led.setValue(led+dsp)
                    return value;
                },
                draw : function () {
                }
            });
            $("#top-spin").knob({
                change : function (value) {
                    console.log("speed-change : " + value);
                    var color = 'green';
                    if (value>1000) {color = 'orange';}
                    if (value>2000) {color = 'red';}
                    $("#top-spin").trigger(
                        'configure',
                        {"fgColor":color}
                    );
                    $("#top-spin").css({"color":color});
                },
                release : function (value) {
                    console.log("left speed-release : " + value);
                },
                cancel : function () {
                    console.log("left speed-cancel : ", this);
                },
                format : function (value) {
                    var dsp = $('#speed-display').is(":checked") ? $('#speed-display').attr('data-on-text') : $("#speed-display").attr('data-off-text');
                    if (value == 0) {
                        value = "--";
                        $("#top-spin").css({"color":'black'});
                    }
                    var led = value;
                    if (led == "--") {led = "   ";}
                    if (value != 3000 && value != "--"){led = " "+led;}
                    //app.led.setValue(led+dsp)
                    return value;
                },
                draw : function () {
                }
            });
            $("#throw-left").roundSlider({
                handleShape: "round",
                editableTooltip: false,
                showTooltip: false,
                radius: 60,
                value: 3,
                circleShape: "half-left",
                width: 10,
                handleSize: "30,10",
                max: 4,
                drag: function (args) {
                        var val = args.value, desc;
                  if (val == 4)  desc = "Overhand";
                  else if (val == 3) desc = "3/4";
                  else if (val == 2) desc = "Sidearm";
                  else desc = "Submarine";
                  $("#desc").text(desc);
                },
                change: function (args) {
                  var val = args.value, desc;
                  if (val == 4)  desc = "Overhand";
                  else if (val == 3) desc = "3/4";
                  else if (val == 2) desc = "Sidearm";
                  else desc = "Submarine";
                  $("#desc").text(desc);
                }
            });
            /* end of ipitcher */
        
            /* chage page to home */
            $.mobile.changePage( "#home", {
                changeHash: false
              });
        });
        $( document ).on( "pagecontainerchange", function( e ) {
            var page = $( ".ui-page-active" ).attr('id');
            console.log('app.js-pagecontainerchange-' + page);
            if (page == 'calibrate') {

            }
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
