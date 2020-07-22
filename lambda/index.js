{
    "interactionModel": {
        "languageModel": {
            "invocationName": "radio",
            "intents": [
                {
                    "name": "AMAZON.CancelIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.HelpIntent",
                    "samples": [
                        "help"
                    ]
                },
                {
                    "name": "AMAZON.StopIntent",
                    "samples": [
                        "stop"
                    ]
                },
                {
                    "name": "AMAZON.RepeatIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.YesIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.NoIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.FallbackIntent",
                    "samples": [
                        "test"
                    ]
                },
                {
                    "name": "AMAZON.ResumeIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.PauseIntent",
                    "samples": []
                },
                {
                    "name": "PlayRadioIntent",
                    "slots": [
                        {
                            "name": "station",
                            "type": "SEARCH_TERM"
                        }
                    ],
                    "samples": [
                        "{station}",
                        "for {station}",
                        "play {station} music",
                        "play some {station}",
                        "play {station}",
                        "{station} music"
                    ]
                },
                {
                    "name": "AMAZON.NextIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.NavigateHomeIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.ShuffleOffIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.ShuffleOnIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.MoreIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.NavigateSettingsIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.PageUpIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.PageDownIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.PreviousIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.ScrollRightIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.ScrollDownIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.ScrollLeftIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.ScrollUpIntent",
                    "samples": []
                },
                {
                    "name": "ControlRadioIntent",
                    "slots": [
                        {
                            "name": "control",
                            "type": "CONTROL_TYPE"
                        },
                        {
                            "name": "duration",
                            "type": "AMAZON.DURATION"
                        }
                    ],
                    "samples": [
                        "{control} ",
                        "{control} {duration}"
                    ]
                }
            ],
            "types": [
                {
                    "name": "SEARCH_TERM",
                    "values": [
                        {
                            "name": {
                                "value": "fountain"
                            }
                        },
                        {
                            "name": {
                                "value": "suspended fed strongly room"
                            }
                        },
                        {
                            "name": {
                                "value": "great area briefly force"
                            }
                        },
                        {
                            "name": {
                                "value": "frequent treat little ban"
                            }
                        },
                        {
                            "name": {
                                "value": "size finishing"
                            }
                        },
                        {
                            "name": {
                                "value": "previous black"
                            }
                        },
                        {
                            "name": {
                                "value": "optional march"
                            }
                        },
                        {
                            "name": {
                                "value": "revealed emphasis"
                            }
                        },
                        {
                            "name": {
                                "value": "away chain"
                            }
                        },
                        {
                            "name": {
                                "value": "standing twelve"
                            }
                        },
                        {
                            "name": {
                                "value": "head independent"
                            }
                        },
                        {
                            "name": {
                                "value": "commercial defining"
                            }
                        },
                        {
                            "name": {
                                "value": "upset horse"
                            }
                        },
                        {
                            "name": {
                                "value": "entitled stay"
                            }
                        },
                        {
                            "name": {
                                "value": "typed ease"
                            }
                        },
                        {
                            "name": {
                                "value": "taking comment advice"
                            }
                        },
                        {
                            "name": {
                                "value": "implemented small hour"
                            }
                        },
                        {
                            "name": {
                                "value": "excess background favor"
                            }
                        },
                        {
                            "name": {
                                "value": "leading extract square"
                            }
                        },
                        {
                            "name": {
                                "value": "removed white summary"
                            }
                        },
                        {
                            "name": {
                                "value": "state old post"
                            }
                        },
                        {
                            "name": {
                                "value": "diverse international parity"
                            }
                        },
                        {
                            "name": {
                                "value": "thorough reserve forecast"
                            }
                        },
                        {
                            "name": {
                                "value": "bla bla bla"
                            }
                        }
                    ]
                },
                {
                    "name": "CONTROL_TYPE",
                    "values": [
                        {
                            "name": {
                                "value": "rewind",
                                "synonyms": [
                                    "skip back",
                                    "go back",
                                    "back"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "forward",
                                "synonyms": [
                                    "go forward",
                                    "skip ahead",
                                    "fast forward"
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
}