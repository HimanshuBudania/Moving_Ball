
angular.module("ballApp", [])
.controller("canvasController", function($scope, $interval){

	$scope.form = {
	};

	$scope.canvas = document.getElementById("ballCanvas");
	$scope.ctx = $scope.canvas.getContext("2d");


	$scope.init = function (){
		$scope.ballRadius = $scope.form.radius;
		$scope.x = $scope.form.width/2;
		$scope.y = $scope.form.height/2;
		$scope.angle = -$scope.form.angle;
		$scope.updatePos();
	};

	$scope.flag = {
		pause : true,
		start : false,
		stop : true,
		hide : true
	};

	$scope.Math = window.Math;

	var stop;

	$scope.start = function () {
		if(!$scope.flag.start){
			$scope.init();
			$scope.flag.start = true;
		}
		$scope.flag.hide = false;
		$interval.cancel(stop);
		if($scope.flag.pause){
			stop = $interval($scope.draw, 33);
			$scope.flag.pause = false;
			$scope.flag.stop = false;
		}
	};

	$scope.pause = function () {
		if(!$scope.flag.pause){
			$interval.cancel(stop);
			stop = undefined;
			$scope.flag.pause = true;
			//console.log($scope.x,$scope.y);
		}
	};

	$scope.stop = function () {
		if($scope.flag.pause || stop ){
			$scope.init();
			$scope.dx = 0;
			$scope.dy = 0;
			$scope.draw();
			$interval.cancel(stop);
			stop = undefined;
			$scope.flag.start = false;
			$scope.flag.pause = true;
			$scope.flag.stop = true;
			//$scope.init();
		}
		
	};

	$scope.clear = function (){
		$scope.flag.hide = true;
		$interval.cancel(stop);
		stop = undefined;
		$scope.reset();
	};


	$scope.drawBall = function () {
	    $scope.ctx.beginPath();

	    $scope.ctx.arc($scope.x, $scope.y, $scope.ballRadius, 0, Math.PI*2);
	    $scope.ctx.fillStyle = "#0095DD";
	    $scope.ctx.fill();
	    $scope.ctx.closePath();
	}

	$scope.draw = function() {
	    $scope.ctx.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);
	    $scope.x += $scope.dx;
	    $scope.y += $scope.dy;

	   if ($scope.x > $scope.form.width - $scope.ballRadius || $scope.x < 0 + $scope.ballRadius ) {
	       $scope.angle = -(180 - $scope.angle);
	       $scope.updatePos();
	    }
	    else if ($scope.y > $scope.form.height - $scope.ballRadius || $scope.y < 0 + $scope.ballRadius) {
	       $scope.angle = -(180 - $scope.angle);
	       $scope.updatePos();
	    }
	    $scope.drawBall();
	};

	$scope.updatePos = function() {
		$scope.radians = $scope.angle * Math.PI/ 180;
		$scope.dx = Math.cos($scope.radians) * $scope.form.speed;
		$scope.dy = Math.sin($scope.radians) * $scope.form.speed;
	};


	$scope.reset = function() {
		$scope.form = {};
		$scope.flag = {
			pause : true,
			start : false,
			stop : true,
			hide : true
		};
	};

	$scope.changeRadius = function(){
		$scope.ballRadius = $scope.form.radius;
	};

});