registerPlugin({
    name: 'Talk',
    version: '1.0',
    description: 'Small script to use SinusBot\'s TTS with a few extra options.',
    author: 'POQDavid',
    vars: [
        {
            name: 'talkCommand',
            title: 'Talk Command',
            type: 'string',
            placeholder: 'Default: !talk',
            default: "!talk"
        },
        {
            name: 'autoTalkNames',
            title: 'Auto Talk Names',
            type: 'string',
            placeholder: 'Default: David',
            default: "David,POQDavid"
        },
        {
            name: 'autoTalkGroup',
            title: 'Auto Talk Group',
            type: 'string',
            placeholder: 'Default: AutoTalk',
            default: "AutoTalk"
        }
    ]
}, function (sinusbot, config) {
    var event = require('event');
    var audio = require('audio');
    var backend = require('backend');

    var talkcmd = config.talkCommand;

    var autotalknames = config.autoTalkNames;
    var autotalkgroup = config.autoTalkGroup;

    const nameArray = autotalknames.split(",");

    function sayit(text) {

        audio.say(text.replace(talkcmd + " ", ""));
    }

    event.on('chat', function (ev) {
        const chatArray = ev.text.split(talkcmd + " ");
        var client = backend.getClientByName(ev.client.name());
        const groups = client.getServerGroups();


        if (nameArray.includes(ev.client.name()) || groups.find(e => e.name() === autotalkgroup)) {
            sayit(ev.text);
        }
        else {
            switch (ev.text.replace(" " + chatArray[1], "")) {
                case talkcmd:

                    if (typeof chatArray[1] == 'undefined' || chatArray[1] === '') {

                        ev.client.chat(talkcmd + ' <text>');

                    } else {

                        if (ev.text != talkcmd + ' <text>') {
                            sayit(chatArray[1]);
                        }

                    }

                    break;
            }
        }
    });

});