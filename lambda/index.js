/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */

//  This is an extra comment that will be soon removed
const audio = require("AudioController.js")
const radio = require("RadioController.js")
const Alexa = require("ask-sdk-core")
const Util = require("util.js")

const SONG_URL = "https://www.rmfon.pl/stacje/ajax_playing_main.txt"
const STATION_URL = "http://rmfon.pl/stacje/flash_aac_5.xml.txt"
const STATION_NAME = "RMF FM"
const STATION_CHANNEL = "Poland"
const HERE_IS = "Here is,"

let STATION = {
	name: STATION_NAME,
	channel: STATION_CHANNEL,
	url: "",
	progress: 0,
	token: `${STATION_NAME}:${STATION_CHANNEL}`
}

let SONG = {
	artist: "",
	name: "",
	disc: "",
	year: ""
}

const NEW_STREAM_MESSAGE = `${HERE_IS} ${STATION.name}`
const RESUMING_MESSAGE = `Resuming ${STATION_NAME}`
const STOP_MESSAGE = "Stopping!"


const LaunchRequestHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
	},
	async handle(handlerInput) {

		STATION = await radio.getLatestRadioLink(STATION_URL, STATION)
		console.log(`Launch intent handler triggered: ${JSON.stringify(handlerInput)}`)

		return audio.playMusicWithMessage(STATION, NEW_STREAM_MESSAGE)
	}
}

const PlayRadioIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === "PlayRadioIntent"
	},
	async handle(handlerInput) {

		STATION = await radio.getLatestRadioLink(STATION_URL, STATION)
		console.log(`PlayRadio intent handler triggered: ${JSON.stringify(handlerInput)}`)

		return audio.playMusicWithMessage(STATION, NEW_STREAM_MESSAGE)

	}
}

const GetSongIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === "GetSongIntent"
	},
	async handle(handlerInput) {

		SONG = await radio.getPlayingSong(SONG_URL, SONG)
		console.log(`GetSong intent handler triggered: ${JSON.stringify(handlerInput)}`)

		return handlerInput.responseBuilder
			.speak(radio.constructCurrentSongResponse(SONG))
			.getResponse()

	}
}

const PlayAnthemIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === "PlayAnthemIntent"
	},
	async handle(handlerInput) {

		let station_copy = STATION
		const audioUrl = Util.getS3PreSignedUrl("Media/anthem.mp3").replace(/&/g, "&amp;")

		station_copy.url = audioUrl
		console.log(`Anthem intent handler triggered: ${JSON.stringify(handlerInput)}`)
		
		let response = audio.playMusicWithMessage(station_copy, "Playing")
		console.log(`Anthem: ${JSON.stringify(response)}`)
		
		return response

	}
}

const HelpIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
	},
	handle(handlerInput) {

		const speakOutput = `To listen to, radio ${STATION_NAME}, simply say, open radio ${STATION_NAME}`
		console.log(`Help intent handler triggered: ${JSON.stringify(handlerInput)}`)

		return handlerInput.responseBuilder
			.speak(speakOutput)
			.getResponse()
	}
}

const ResumeIntentHandler = {

	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === "PlaybackController.PlayCommandIssued" ||
			Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.ResumeIntent"
	},
	async handle(handlerInput) {

		STATION = await radio.getLatestRadioLink(STATION_URL, STATION)
		console.log(`Resuming intent handler triggered: ${JSON.stringify(handlerInput)}`)

		if (handlerInput.requestEnvelope.request.type === "PlaybackController.PlayCommandIssued") {
			return audio.playMusicWithoutMessage(STATION)
		} else {
			return audio.playMusicWithMessage(STATION, RESUMING_MESSAGE)
		}
		
	}
}

const CancelAndStopIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
			&& (Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.CancelIntent"
				|| Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.StopIntent")
	},
	handle(handlerInput) {

		console.log(`Cancel stop intent handler triggered: ${JSON.stringify(handlerInput)}`)
		return audio.stopPlayingWithMessage(STOP_MESSAGE)
	}
}


const PauseIntentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === "PlaybackController.PauseCommandIssued" ||
			Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.PauseIntent"
	},
	handle(handlerInput) {

		console.log(`Pause intent handler triggered: ${JSON.stringify(handlerInput)}`)

		if (handlerInput.requestEnvelope.request.type === "PlaybackController.PauseCommandIssued") {
			return audio.stopPlayingWithoutMessage()
		} else {
			return audio.stopPlayingWithMessage(STOP_MESSAGE)
		}

	}
}


const UnsupportedIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
			&& (
				Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.LoopOffIntent" ||
				Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.LoopOnIntent" ||
				Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.PreviousIntent" ||
				Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.NextIntent" ||
				Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.RepeatIntent" ||
				Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.ShuffleOffIntent" ||
				Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.ShuffleOnIntent" ||
				Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.StartOverIntent"
			)
	},
	handle(handlerInput) {

		const speakOutput = "Sorry, this is not supported for radio playback"
		console.log(`Unsupported intent rejected: ${JSON.stringify(handlerInput)}`)

		return handlerInput.responseBuilder
			.speak(speakOutput)
			.getResponse()
	}
}

const AudioPlayerIntent = {
	canHandle(handlerInput) {
		return (
			handlerInput.requestEnvelope.request.type === "AudioPlayer.PlaybackStarted" ||
			handlerInput.requestEnvelope.request.type === "AudioPlayer.PlaybackFinished" ||
			handlerInput.requestEnvelope.request.type === "AudioPlayer.PlaybackStopped"
		)
	},
	handle(handlerInput) {

		console.log(`AudioPlayerIntent called: ${JSON.stringify(handlerInput)}`)
		console.log(`AudioPlayerIntent was: ${JSON.stringify(handlerInput.requestEnvelope.request.type)}`)

		return handlerInput.responseBuilder.getResponse()
	}
}

const AudioPlayerPlaybackFailedPlaybackNearlyFinishedIntent = {
	canHandle(handlerInput) {
		return (
			handlerInput.requestEnvelope.request.type === "AudioPlayer.PlaybackFailed" ||
			handlerInput.requestEnvelope.request.type === "AudioPlayer.PlaybackNearlyFinished"
		)
	},
	async handle(handlerInput) {

		if (handlerInput.requestEnvelope.request.type === "AudioPlayer.PlaybackNearlyFinished") {
			console.log(`AudioPlayer.PlaybackNearlyFinished called: ${JSON.stringify(handlerInput)}`)
		} else {
			console.log(`AudioPlayer.PlaybackFailed called: ${JSON.stringify(handlerInput)}`)
		}

		STATION = await radio.getLatestRadioLink(STATION_URL, STATION)

		let response = audio.playMusicWithoutMessage(STATION)

		return response
	}
}

const PlaybackControllerHandler = {
	canHandle(handlerInput) {
		return (
			handlerInput.requestEnvelope.request.type === "PlaybackController.PreviousCommandIssued" ||
			handlerInput.requestEnvelope.request.type === "PlaybackController.NextCommandIssued"
		)
	},
	async handle(handlerInput) {

		if (handlerInput.requestEnvelope.request.type === "PlaybackController.PreviousCommandIssued") {
			console.log(`PlaybackController.PreviousCommandIssued called: ${JSON.stringify(handlerInput)}`)
		} else {
			console.log(`PlaybackController.NextCommandIssued called: ${JSON.stringify(handlerInput)}`)
		}

		STATION = await radio.getLatestRadioLink(STATION_URL, STATION)

		let response = audio.playMusicWithoutMessage(STATION)

		return response
	}
}

/* *
* FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
* It must also be defined in the language model (if the locale supports it)
* This handler can be safely added but will be ingnored in locales that do not support it yet 
* */
const FallbackIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.FallbackIntent"
	},
	handle(handlerInput) {

		const speakOutput = "Sorry, I don't know about that. Please try again."
		console.log(`Fallback intent handler triggered: ${JSON.stringify(handlerInput)}`)

		return handlerInput.responseBuilder
			.speak(speakOutput)
			.reprompt(speakOutput)
			.getResponse()
	}
}

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === "SessionEndedRequest"
	},
	handle(handlerInput) {
		console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`)
		// Any cleanup logic goes here.
		return audio.stopPlayingWithoutMessage()
	}
}

/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
// const IntentReflectorHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
//     },
//     handle(handlerInput) {
//         const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
//         const speakOutput = `You just triggered ${intentName}`;

//         return handlerInput.responseBuilder
//             .speak(speakOutput)
//             .withShouldEndSession(true)
//             //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
//             .getResponse();
//     }
// };

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
	canHandle() {
		return true
	},
	handle(handlerInput, error) {
		const speakOutput = "Sorry, I had trouble doing what you asked. Please try again."
		console.log(`~~~~ Error handled: ${error}`)
		console.log(`~~~~ Error handled JSON: ${JSON.stringify(error)}`)
		console.log(`~~~~ Handler Input: ${JSON.stringify(handlerInput)}`)

		return handlerInput.responseBuilder
			.speak(speakOutput)
			.withShouldEndSession(true)
			.getResponse()
	}
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
		LaunchRequestHandler,
		PlayRadioIntentHandler,
		PlayAnthemIntentHandler,
		PlaybackControllerHandler,
		AudioPlayerPlaybackFailedPlaybackNearlyFinishedIntent,
		AudioPlayerIntent,
		HelpIntentHandler,
		ResumeIntentHandler,
		PauseIntentHandler,
		CancelAndStopIntentHandler,
		UnsupportedIntentHandler,
		FallbackIntentHandler,
		SessionEndedRequestHandler)
	.addErrorHandlers(
		ErrorHandler)
	.lambda()