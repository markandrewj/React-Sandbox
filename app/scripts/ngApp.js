/**
 * Created by mwoods0 on 2/11/14.
 */
"use strict";
angular.module("reactSandbox", ["ngRoute", "ngReact"])
	.config(function($routeProvider){
		$routeProvider
			.when("/",{
				templateUrl :"tpl/home.tpl.html"
			});
	});