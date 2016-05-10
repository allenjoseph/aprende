(function(){
	'use strict';

	angular
		.module('app')
		.directive('videoUser', videoUser);

	videoUser.$inject = ['$timeout'];

	function videoUser($timeout){

		var directive = {
			link: link,
			templateUrl: 'widgets/video-user.html'
		};

		return directive;

		function link(scope, element, attrs){

			var video = element.find('video')[0];
			var remoteVideo = element.find('video')[1];
			var pcLocal, pcRemote, localStream;

			var RTCPeerConnection = window.RTCPeerConnection || 
				window.mozRTCPeerConnection || 
				window.webkitRTCPeerConnection;

			navigator.getUserMedia  = navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia;

			if(navigator.getUserMedia){

				var constraints = {
					video: {
						width: 320,
						height: 180,
						mandatory: {
							maxWidth: 320,
							maxHeight: 180
						}
					}
				};

				navigator.getUserMedia(constraints, successStream, failStream);
			}

			scope.call = function(){

				var servers = null;
				var offerOptions = {
					offerToReceiveAudio: 1,
					offerToReceiveVideo: 1
				};

				pcRemote = new RTCPeerConnection(servers);
				pcRemote.onicecandidate = function(e) {
					onIceCandidate(pcRemote, e);
				};
				pcRemote.oniceconnectionstatechange = function(e) {
					onIceStateChange(pcRemote, e);
				};
				pcRemote.onaddstream = gotRemoteStream;

				pcLocal = new RTCPeerConnection(servers);
				pcLocal.onicecandidate = function(e) {
					onIceCandidate(pcLocal, e);
				};
				pcLocal.oniceconnectionstatechange = function(e) {
					onIceStateChange(pcLocal, e);
				};
				pcLocal.addStream(localStream);
				pcLocal.createOffer(onCreateOfferSuccess, onCreateSessionDescriptionError, offerOptions);
			};

			function successStream(stream){
				localStream = stream;
				video.src = window.URL.createObjectURL(stream);
			}

			function failStream(){
			}

			function onIceCandidate(pc, event) {
				if (event.candidate) {

					var candidate = new window.RTCIceCandidate(event.candidate);

					getOtherPc(pc).addIceCandidate(candidate, addCandidateSuccess, addCandidateFail);
				}
				
				function addCandidateSuccess(){
					console.log(pc, 'Added candidate success');
				}

				function addCandidateFail(err){
					console.log(pc, 'Error:', err.toString());
				}
			}

			function getOtherPc(pc) {
				return (pc === pcLocal) ? pcRemote : pcLocal;
			}

			function onIceStateChange(pc, event) {
				if (pc) {
					console.log(pc, 'ICE state change event: ', event);
				}
			}

			function gotRemoteStream(e) {
				remoteVideo.src = window.URL.createObjectURL(e.stream);

				$timeout(function(){
					scope.showRemoteVideo = true;
				});
			}

			function onCreateOfferSuccess(desc) {

				pcLocal.setLocalDescription(desc, function() {
					onSetLocalSuccess(pcLocal);
				}, onSetSessionDescriptionError);

				pcRemote.setRemoteDescription(desc, function() {
					onSetRemoteSuccess(pcRemote);
				}, onSetSessionDescriptionError);

				pcRemote.createAnswer(onCreateAnswerSuccess, onCreateSessionDescriptionError);
			}

			function onCreateSessionDescriptionError(err) {
				console.log('Failed to create session description: ' + err.toString());
			}

			function onSetLocalSuccess(pc) {
				console.log(pc, ' setLocalDescription complete');
			}

			function onSetRemoteSuccess(pc) {
				console.log(pc, ' setRemoteDescription complete');
			}

			function onSetSessionDescriptionError(error) {
				console.log('Failed to set session description: ' + error.toString());
			}

			function onCreateAnswerSuccess(desc) {

				pcRemote.setLocalDescription(desc, function() {
					onSetLocalSuccess(pcRemote);
				}, onSetSessionDescriptionError);

				pcLocal.setRemoteDescription(desc, function() {
					onSetRemoteSuccess(pcLocal);
				}, onSetSessionDescriptionError);
			}

			function hangup() {
				pcLocal.close();
				pcRemote.close();
				pcLocal = null;
				pcRemote = null;
			}
		}
	}
})();