"use strict";angular.module("angularLodashModularized",[]).factory("lodash",function(){return window._}),angular.module("turtleCommandApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngPatternRestrict","angularLodashModularized"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"})}]),angular.module("turtleCommandApp").controller("MainCtrl",["$scope","Grid","Turtle","Compass",function(a,b,c,d){a.inputStr="",a.inputPattern="^[flrFLR\\s]{0,}$",a.Grid=b,a.Turtle=c,b.reset(),a.movementHistory=[],a.resetGrid=function(){b.reset(),c.reset(),d.reset(),a.inputStr="",a.movementHistory=[]},a.resetTurtle=function(){c.reset(),d.reset(),a.inputStr="",a.movementHistory=[]},a.commandTurtle=function(b){try{c.reset(),d.reset(),a.movementHistory=[];for(var e=0;e<b.length;e++){c.move(b[e].toUpperCase());var f={command:b[e],coordinates:c.getCoordinate(),direction:c.getDirection()};a.movementHistory.push(f)}}catch(g){console.log(g.message)}},a.move=function(b){a.inputStr+=b,a.commandTurtle(a.inputStr)}}]),angular.module("turtleCommandApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("turtleCommandApp").factory("Compass",function(){var a=["N","E","S","W"],b=0;return{goRight:function(){return b===a.length-1?b=0:b+=1,a[b]},goLeft:function(){return 0===b?b=a.length-1:b-=1,a[b]},getCurrentDirection:function(){return a[b]},setPointer:function(a){return b=a,this},setDirection:function(c){b=a.indexOf(c)},reset:function(){return b=0,a[b]}}}),angular.module("turtleCommandApp").factory("Turtle",["Compass","Grid",function(a,b){function c(a,c){a.incrementY(c),b.isBlock(a.getCoordinate())&&a.decrementY(c)}function d(a,c){a.incrementX(c),b.isBlock(a.getCoordinate())&&a.decrementX(c)}function e(a,c){a.decrementY(c),b.isBlock(a.getCoordinate())&&a.incrementY(c)}function f(a,c){a.decrementX(c),b.isBlock(a.getCoordinate())&&a.incrementX(c)}var g=1,h=1,i="N",j={N:c,E:d,S:e,W:f};return{reset:function(){g=1,h=1,this.changeDirection("N")},setX:function(a){g=a},setY:function(a){h=a},getX:function(){return g},getY:function(){return h},incrementX:function(a){return g<b.getGridSize()&&(g+=1),this},decrementX:function(a){return g>1&&(g-=1),this},incrementY:function(a){return h<b.getGridSize()&&(h+=1),this},decrementY:function(a){return h>1&&(h-=1),this},getCoordinate:function(){return{x:this.getX(),y:this.getY()}},changeDirection:function(a){return i=a,this},getDirection:function(){return i},whereAmI:function(){return this.getX()+","+this.getY()+" "+this.getDirection()},move:function(b){var c=this.getDirection();switch(b){case"F":j[this.getDirection()](this,c);break;case"R":this.changeDirection(a.goRight());break;case"L":this.changeDirection(a.goLeft());break;default:throw new Error("Invalid Direction")}return this}}}]),angular.module("turtleCommandApp").factory("Grid",["lodash",function(a){function b(a,b){this.x=a,this.y=b}var c=5,d=30,e=a.random(c,d),f={collection:[],getBlocks:function(){return this.collection},isBlock:function(b){return a.filter(this.collection,b).length>0},push:function(a){this.collection.push(a)},reset:function(){this.collection=[]}};return{generateGridSize:function(){return e=a.random(c,d),this},generateBlocks:function(){f.reset();for(var c=a.random(1,Math.ceil(e/2)),d=0;c>d;d++)f.push(new b(a.random(2,e),a.random(2,e)))},getBlocks:function(){return f.getBlocks()},setBlock:function(a){f.push(a)},isBlock:function(a){return f.isBlock(a)},setGridSize:function(a){return e=a,this},getGridSize:function(){return e},getMin:function(){return c},getMax:function(){return d},reset:function(){this.generateGridSize(),this.generateBlocks()}}}]),angular.module("turtleCommandApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="alert alert-warning"> <strong>Input command string (eg. fFlRRf) (OR) use \'L\' \'F\' \'R\' buttons respectively.</strong> </div> <div class="jumbotron"> <div class="form-group"> <label for="usr">Input Command:</label> <input type="text" class="form-control" id="command" ng-model="inputStr" ng-pattern-restrict="{{ inputPattern }}" ng-change="commandTurtle(inputStr)"><br> <button ng-click="resetTurtle(inputStr)">Reset Turtle</button> <button ng-click="resetGrid()">Reset Grid</button><br><br> <button ng-click="move(\'L\')">L</button> <button ng-click="move(\'F\')">F</button> <button ng-click="move(\'R\')">R</button> </div> Auto generated Grid Size -> {{Grid.getGridSize()}} x {{Grid.getGridSize()}} <br> Blocks -> {{Grid.getBlocks()}} <br> <strong>Current Turtle Position -> {{Turtle.whereAmI()}} <br><br></strong> <div ng-if="movementHistory.length > 0" class="pre-scrollable"> Movement History: <br> <div ng-repeat="history in movementHistory track by $index"> {{history.command}} -> {{history.coordinates.x}}, {{history.coordinates.y}} {{history.direction}} <br> </div> </div> </div>')}]);